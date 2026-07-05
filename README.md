# bestaietsy.com — Complete Design Specification

> **Status**: Design v1 (2026-07-04)
> **Owner**: [user]
> **Designer**: Mavis (AI agent)
> **Next milestone**: Day 1 development kickoff

## 📂 What's in this repo

```
bestaietsy/
├── design/                              ← YOU ARE HERE (review first)
│   ├── design-overview.html             ⭐ Open this in a browser
│   ├── brand/
│   │   ├── tokens.ts                    Brand colors, fonts, spacing
│   │   ├── logo-wordmark.svg/.png       Full logo with tagline
│   │   └── favicon.svg/.png             App icon (64×64)
│   ├── wireframes/                      (placeholder — wireframes inline in HTML)
│   └── emails/                          (placeholder — email templates inline in HTML)
│
├── .github/workflows/
│   └── notify-subscribers.yml           Auto-send on MDX publish
│
├── content/                             (will hold MDX files)
│   ├── articles/
│   └── tools/
│
├── public/images/                       (image assets)
├── src/                                 (Next.js code — not yet built)
│
├── README.md                            (this file)
└── requirements  →  ../daily-content-agent/需求/  (research docs)
```

## ⭐ Start here

**Open `design/design-overview.html` in any browser.** It contains:

1. **Hero** — Brand statement + homepage email widget mockup
2. **§ 1 Brand kit** — Logo, favicon, color palette, typography
3. **§ 2 Information Architecture** — Sitemap tree + Pillar-Cluster diagram
4. **§ 3 Wireframes** — 4 key pages (Homepage, Article T1, Tool Review T2, Email popup)
5. **§ 4 Email templates** — 3 emails (Welcome, Auto-broadcast, Monthly recap) + auto-send pipeline
6. **§ 5 Tech stack** — Stack summary + operating cost
7. **§ 6 Launch plan** — Day 1 → Day 7 deliverable

## 🎨 Brand summary

- **Logo**: `bestaietsy` wordmark, Playfair Display serif, Etsy Orange (#F1641E) accent on "ai", sparkle ✨ above
- **Favicon**: 64×64 rounded square, white italic "b" + sparkles
- **Primary**: Etsy Orange `#F1641E` (warm, handmade aesthetic)
- **Secondary**: Warm Brown `#A37545` (craft, leather vibes)
- **Tertiary**: Cream `#FFF8EC` (background)
- **Accent**: Red `#D32F2F` (alerts, CTAs)
- **Fonts**: Playfair Display (display) + Inter (body) + JetBrains Mono (code)

## 📧 Email pipeline (current)

Two modes, two triggers — **importance is decided at content-planning time, not auto-detected**.

### Sender addresses

| List | From | Reply-To |
|------|------|----------|
| Weekly digest | `newsletter@bestaietsy.com` | `support@bestaietsy.com` |
| Breaking news | `important@bestaietsy.com` | `support@bestaietsy.com` |

Each sender address must be **separately verified** in Alibaba Cloud DirectMail console (发信地址 → 新建发信地址 → 验证回信 mailto).

### Delivery: Alibaba Cloud DirectMail (ap-southeast-1)

- Provider: 阿里云邮件推送 (DirectMail), Singapore region
- API client: `@alicloud/dm20151123` (official SDK)
- Wrapper: `src/lib/aliyun-dm.ts` — exposes `sendEmail()`, `sendEmailBatch()`, `buildListUnsubscribeHeader()`
- Each recipient gets a personalized unsubscribe URL with their own UUID token
- Batch sends are concurrency-limited to 8 parallel calls (avoids API throttling)

### Subscriber storage: Supabase Postgres

- Source of truth (replaced Resend Audiences)
- Schema: `supabase/schema.sql` (run once in Supabase SQL Editor)
- Wrapper: `src/lib/supabase.ts` — exposes `upsertSubscriber()`, `getActiveSubscribers()`, `unsubscribe()`, `getSubscriberByToken()`
- RLS enabled, anon key blocked — service-role key used by API only

### Mode 1: Weekly digest (cron-scheduled)

- **When**: Every Tuesday at 13:00 UTC = 9am EDT / 6am PDT
- **Trigger**: `.github/workflows/weekly-digest.yml` (cron schedule)
- **Endpoint**: `POST /api/weekly-digest`
- **What**: Queries articles published in past 7 days → fetches active weekly subscribers from Supabase → sends per-recipient via DirectMail (sender: `newsletter@`)
- **Empty week**: returns `{ skipped: true }`, no email sent
- **Template**: `src/emails/weekly-digest.ts`

### Mode 2: Breaking news (event-driven, judged important)

- **When**: MDX pushed to `main` with `important: true` frontmatter
- **Trigger**: `.github/workflows/notify-subscribers.yml` (push event)
- **Endpoint**: `POST /api/broadcast`
- **What**: Fetches active breaking subscribers → sends per-recipient (sender: `important@`)
- **Default**: `important: false`. Most articles are NOT important — they go in the next weekly digest instead.
- **Template**: `src/emails/broadcast.ts`

### Frontmatter contract

```yaml
---
title: "..."
slug: "..."
type: T1  # T1-T7 article types
category: policy  # policy | tool | tutorial | best-for | faq | guide
date: 2026-07-04
important: true   # ← only set true for genuinely urgent articles (Etsy policy changes, major platform news, etc.)
---
```

### Auth

Both endpoints require `Authorization: Bearer ${BROADCAST_API_SECRET}` header. Set the secret in:
- Vercel → Project Settings → Environment Variables (`BROADCAST_API_SECRET`)
- GitHub repo → Settings → Secrets and variables → Actions (`BROADCAST_API_URL`, `BROADCAST_API_SECRET`)

### Subscriber storage

Postgres via Supabase — see `src/lib/supabase.ts`. Schema in `supabase/schema.sql`.

Migrated away from Resend Audiences in 2026-07. The migration was triggered by the user's requirement to use Alibaba Cloud for email delivery (regulatory + cost). All previous subscriber data would need to be re-imported via CSV if any existed.

### Welcome emails (sent on subscribe)

- `src/emails/welcome.ts` — sent when user subscribes to **weekly** (sender: `newsletter@`)
- `src/emails/welcome-breaking.ts` — sent when user opts into **breaking news** (sender: `important@`)
- Both use the **same flame logo** (no color variation between templates).
- The unsubscribe link in each email is per-recipient with the subscriber's own UUID token — clicking it hits `/api/unsubscribe?email=...&list=weekly|breaking` which sets `weekly_enabled = false` / `breaking_enabled = false` in Supabase.

## 🏗 Tech stack (final)

- **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind + shadcn/ui
- **Content**: MDX files in repo (git push = publish)
- **Search**: Fuse.js client-side
- **Deploy**: Vercel (auto-deploy from GitHub)
- **Email delivery**: Alibaba Cloud DirectMail (`ap-southeast-1` / Singapore region) — SDK `@alicloud/dm20151123`
- **Subscriber storage**: Supabase Postgres — `@supabase/supabase-js`
- **Email templates**: Plain HTML strings rendered server-side (no React Email deps)
- **DNS**: Cloudflare
- **Analytics**: GA4 + Google Search Console
- **Comments (optional)**: Giscus (GitHub Discussions)

## 💰 Operating cost

| Item | Cost |
|---|---|
| Domain | $12/year |
| Vercel | $0 (free tier) |
| Alibaba Cloud DirectMail | Pay-as-you-go (~$0.0001/email — free tier ~500 emails/day) |
| Supabase | $0 (free tier — 500MB DB, plenty for subscriber rows) |
| Cloudflare DNS | $0 |
| **Total** | **~$1/month + email volume** |

## 📅 Launch plan (Week 1)

| Day | Deliverable |
|---|---|
| 1 | Vercel + Next.js init, Tailwind config, brand tokens, favicon, logo |
| 2-3 | MDX loader, 7 content type templates, article layout, T1 sample deployed |
| 4-5 | Homepage, Tools index/detail, Policies index, Newsletter widget |
| 6-7 | sitemap.xml, robots.txt, Article + FAQPage schema, Buttondown integration, GitHub Action |

**End of week 1**: Live bestaietsy.com with 2 articles, 5 tool reviews, working email subscription, auto-send pipeline, SEO ready.

## 🚀 How to develop

```bash
cd /Users/Zhuanz/Documents/project/bestaietsy
npx create-next-app@latest . --typescript --tailwind --app
# Then wire in: tokens.ts, MDX, brand SVGs
```

## 📐 Next steps

1. **Review the design** — Open `design/design-overview.html`
2. **Provide feedback** — Any adjustments to brand colors, layout, sitemap, email templates?
3. **Approve Day 1 plan** — Once design is locked, start development
4. **Get Buttondown account** — Free tier, get API key
5. **Buy domain** — bestaietsy.com on Cloudflare Registrar

## 📞 Questions?

Any questions about the design → ask before kicking off development.