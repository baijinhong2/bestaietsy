-- =============================================================================
-- bestaietsy.com — Supabase schema
-- =============================================================================
-- Shared Supabase project with drawspark (and possibly other projects).
-- All tables/views prefixed with `bestaietsy_` to avoid collisions.
--
-- Run this in Supabase Dashboard → SQL Editor → "New query" → paste → Run.
-- Idempotent: safe to re-run (uses `if not exists`).
-- =============================================================================

-- === Main subscribers table ===
create table if not exists public.bestaietsy_subscribers (
  -- identity
  id uuid primary key default gen_random_uuid(),
  email text unique not null check (email = lower(email) and email like '%@%'),

  -- per-list preferences
  weekly_enabled boolean not null default true,
  breaking_enabled boolean not null default false,

  -- profile
  first_name text,
  source text, -- e.g. "homepage", "blog-post", "feedback-page"

  -- audit (no raw IP — hash only for GDPR compliance)
  ip_hash text,
  user_agent text,

  -- per-subscriber unsubscribe token (UUID, signed in URL)
  unsubscribe_token uuid unique not null default gen_random_uuid(),

  -- unsubscribe state (set when user opts out)
  unsubscribed_at timestamptz,
  unsubscribed_reason text,

  -- timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- === Indexes ===
-- Lookups by email (subscribe, unsubscribe)
create index if not exists bestaietsy_subscribers_email_idx
  on public.bestaietsy_subscribers (email);

-- Weekly broadcast target list (partial index — only enabled subs)
create index if not exists bestaietsy_subscribers_weekly_idx
  on public.bestaietsy_subscribers (email)
  where weekly_enabled = true and unsubscribed_at is null;

-- Breaking-news broadcast target list (partial index)
create index if not exists bestaietsy_subscribers_breaking_idx
  on public.bestaietsy_subscribers (email)
  where breaking_enabled = true and unsubscribed_at is null;

-- Unsubscribe token lookup (GET /api/unsubscribe?token=...)
create index if not exists bestaietsy_subscribers_unsubscribe_token_idx
  on public.bestaietsy_subscribers (unsubscribe_token);

-- === updated_at trigger ===
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bestaietsy_subscribers_set_updated_at on public.bestaietsy_subscribers;
create trigger bestaietsy_subscribers_set_updated_at
  before update on public.bestaietsy_subscribers
  for each row execute function public.set_updated_at();

-- === Row-Level Security ===
-- Service-role key bypasses RLS — that's what the API uses (server-side only).
-- Anonymous client key has no policy, so anon users cannot read/write.
-- This protects subscriber PII from accidental client exposure.
alter table public.bestaietsy_subscribers enable row level security;

-- No policies = no anon access. Service-role bypasses RLS for API use.
-- If you later add an admin dashboard, add a policy like:
--   create policy "admin read" on public.bestaietsy_subscribers for select
--     using (auth.jwt() ->> 'role' = 'service_role');

-- =============================================================================
-- Backfill (optional — only if migrating from Resend / Brevo)
-- =============================================================================
-- Example: import a CSV from Resend Audience export.
--   1. Resend Dashboard → Audiences → bestaietsy-weekly → Export CSV
--   2. Resend Dashboard → Audiences → bestaietsy-breaking → Export CSV
--   3. Save CSVs in supabase/backfill/, then run:
--      psql ... -c "\copy public.bestaietsy_subscribers(email, weekly_enabled, source) from 'weekly.csv' csv header;"
--      psql ... -c "update public.bestaietsy_subscribers set breaking_enabled = true where email in (select email from breaking.csv);"
-- =============================================================================

-- === Convenience view: active weekly subscribers ===
create or replace view public.bestaietsy_active_weekly_subscribers as
  select id, email, first_name, unsubscribe_token, created_at
  from public.bestaietsy_subscribers
  where weekly_enabled = true
    and unsubscribed_at is null;

-- === Convenience view: active breaking subscribers ===
create or replace view public.bestaietsy_active_breaking_subscribers as
  select id, email, first_name, unsubscribe_token, created_at
  from public.bestaietsy_subscribers
  where breaking_enabled = true
    and unsubscribed_at is null;