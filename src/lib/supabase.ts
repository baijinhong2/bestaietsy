import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase clients for bestaietsy.com
 *
 * Two clients:
 * - `getSupabaseAdmin()` — service-role key, server-only. Bypasses RLS. Use in
 *   all API routes (subscribe, unsubscribe, weekly-digest, broadcast).
 * - `getSupabaseAnon()` — anon key, safe for client use, but RLS prevents
 *   subscribers-table access. Kept for future use (e.g. article reads if we
 *   move articles to Supabase).
 *
 * Storage strategy:
 * - Source of truth for newsletter subscribers
 * - Replaces Resend Audiences (which we removed)
 * - Schema: see supabase/schema.sql
 * - Tables/views prefixed with `bestaietsy_` to namespace on a shared
 *   Supabase project (drawspark also uses this project).
 *
 * Env vars required:
 * - SUPABASE_URL                       (https://xxxxx.supabase.co, same as drawspark)
 * - SUPABASE_SERVICE_ROLE_KEY          (server-only, full access)
 * - SUPABASE_ANON_KEY                  (safe for client if ever needed)
 */

let _admin: SupabaseClient | null = null;
let _anon: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_admin) return _admin;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase admin client not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }
  _admin = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return _admin;
}

export function getSupabaseAnon(): SupabaseClient {
  if (_anon) return _anon;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase anon client not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in .env.local",
    );
  }
  _anon = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return _anon;
}

// === Subscriber types ===

export type SubscriptionType = "weekly" | "breaking";

export const ALL_SUBSCRIPTION_TYPES: SubscriptionType[] = ["weekly", "breaking"];

export interface SubscriberRow {
  id: string;
  email: string;
  weekly_enabled: boolean;
  breaking_enabled: boolean;
  first_name: string | null;
  source: string | null;
  unsubscribe_token: string;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
}

// === Subscriber ops ===

/**
 * Upsert a subscriber row. Idempotent: if email exists, merges preferences.
 * - If user already subscribed to "weekly", opting into "breaking" adds it.
 * - If user previously unsubscribed (unsubscribed_at set), we clear the
 *   timestamp and re-enable the requested lists (resubscribe flow).
 *
 * Returns the resulting row + which lists are now active.
 */
export async function upsertSubscriber(
  email: string,
  types: SubscriptionType[],
  meta: { firstName?: string; source?: string; ipHash?: string; userAgent?: string } = {},
): Promise<{ row: SubscriberRow; activeTypes: SubscriptionType[] }> {
  const admin = getSupabaseAdmin();
  const normalized = email.trim().toLowerCase();

  // Look up existing row
  const { data: existing } = await admin
    .from("bestaietsy_subscribers")
    .select("*")
    .eq("email", normalized)
    .maybeSingle();

  const nowIso = new Date().toISOString();
  const patch: Partial<SubscriberRow> & Record<string, unknown> = {
    unsubscribed_at: null,
    updated_at: nowIso,
  };

  // Per-list enable: turn ON if user opted in, keep existing state if not.
  if (types.includes("weekly")) patch.weekly_enabled = true;
  if (types.includes("breaking")) patch.breaking_enabled = true;

  if (meta.firstName) patch.first_name = meta.firstName;
  if (meta.source) patch.source = meta.source;
  if (meta.ipHash) patch.ip_hash = meta.ipHash;
  if (meta.userAgent) patch.user_agent = meta.userAgent;

  let row: SubscriberRow;
  if (existing) {
    const { data, error } = await admin
      .from("bestaietsy_subscribers")
      .update(patch)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw new Error(`Supabase update failed: ${error.message}`);
    row = data as SubscriberRow;
  } else {
    const insertPayload = {
      email: normalized,
      weekly_enabled: types.includes("weekly"),
      breaking_enabled: types.includes("breaking"),
      ...(meta.firstName ? { first_name: meta.firstName } : {}),
      ...(meta.source ? { source: meta.source } : {}),
      ...(meta.ipHash ? { ip_hash: meta.ipHash } : {}),
      ...(meta.userAgent ? { user_agent: meta.userAgent } : {}),
    };
    const { data, error } = await admin
      .from("bestaietsy_subscribers")
      .insert(insertPayload)
      .select()
      .single();
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
    row = data as SubscriberRow;
  }

  const activeTypes: SubscriptionType[] = [];
  if (row.weekly_enabled) activeTypes.push("weekly");
  if (row.breaking_enabled) activeTypes.push("breaking");

  return { row, activeTypes };
}

/**
 * Fetch all subscribers with the given list enabled.
 * Used by weekly-digest / broadcast endpoints to build recipient lists.
 */
export async function getActiveSubscribers(
  type: SubscriptionType,
): Promise<SubscriberRow[]> {
  const admin = getSupabaseAdmin();
  const col = type === "weekly" ? "weekly_enabled" : "breaking_enabled";
  const { data, error } = await admin
    .from("bestaietsy_subscribers")
    .select("*")
    .eq(col, true)
    .is("unsubscribed_at", null)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Supabase fetch failed: ${error.message}`);
  return (data ?? []) as SubscriberRow[];
}

/**
 * Look up a subscriber by unsubscribe token (UUID).
 * Used by GET /api/unsubscribe?token=...
 */
export async function getSubscriberByToken(token: string): Promise<SubscriberRow | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("bestaietsy_subscribers")
    .select("*")
    .eq("unsubscribe_token", token)
    .maybeSingle();
  if (error) throw new Error(`Supabase token lookup failed: ${error.message}`);
  return (data as SubscriberRow | null) ?? null;
}

/**
 * Disable one or both lists for a subscriber and stamp unsubscribed_at.
 * If both lists are disabled, also sets unsubscribed_at (full opt-out).
 */
export async function unsubscribe(
  email: string,
  types: SubscriptionType[] = ALL_SUBSCRIPTION_TYPES,
): Promise<SubscriberRow> {
  const admin = getSupabaseAdmin();
  const normalized = email.trim().toLowerCase();

  const { data: existing } = await admin
    .from("bestaietsy_subscribers")
    .select("*")
    .eq("email", normalized)
    .maybeSingle();
  if (!existing) {
    throw new Error("Subscriber not found");
  }

  const patch: Partial<SubscriberRow> & Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (types.includes("weekly")) patch.weekly_enabled = false;
  if (types.includes("breaking")) patch.breaking_enabled = false;

  const willBeFullyOut =
    (!patch.weekly_enabled || !types.includes("weekly") ? (existing as SubscriberRow).weekly_enabled : false) &&
    (!patch.breaking_enabled || !types.includes("breaking") ? (existing as SubscriberRow).breaking_enabled : false);

  // After update, check what's left
  const newWeekly = types.includes("weekly") ? false : (existing as SubscriberRow).weekly_enabled;
  const newBreaking = types.includes("breaking") ? false : (existing as SubscriberRow).breaking_enabled;
  if (!newWeekly && !newBreaking) {
    patch.unsubscribed_at = new Date().toISOString();
  }

  const { data, error } = await admin
    .from("bestaietsy_subscribers")
    .update(patch)
    .eq("id", existing.id)
    .select()
    .single();
  if (error) throw new Error(`Supabase unsubscribe failed: ${error.message}`);
  return data as SubscriberRow;
}

/**
 * Count active subscribers per list — for admin/debug views.
 */
export async function getSubscriberStats(): Promise<{
  weekly: number;
  breaking: number;
  totalActive: number;
}> {
  const admin = getSupabaseAdmin();
  const [weekly, breaking] = await Promise.all([
    admin
      .from("bestaietsy_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("weekly_enabled", true)
      .is("unsubscribed_at", null),
    admin
      .from("bestaietsy_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("breaking_enabled", true)
      .is("unsubscribed_at", null),
  ]);
  return {
    weekly: weekly.count ?? 0,
    breaking: breaking.count ?? 0,
    totalActive: (weekly.count ?? 0) + (breaking.count ?? 0),
  };
}