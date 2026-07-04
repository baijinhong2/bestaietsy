# Affiliate Links Management

> How to add/configure affiliate links once you have them.

## Status: All links pending

We currently have **5 tools registered** in `src/lib/tools.ts` with commission rates configured, but **all affiliate URLs are `null`** (`affiliateActive: false`).

When a visitor lands on any tool card or page, they'll see a **"Link pending"** badge + a CTA that takes them to our internal review page (instead of an external affiliate redirect).

## How to add a new affiliate link

When you sign up for a tool's affiliate program and get your unique URL (e.g. `https://roketfy.com/?ref=bestaietsy`):

### 1. Edit `src/lib/tools.ts`

Find the tool entry and change:

```typescript
{
  slug: "roketfy",
  name: "Roketfy",
  // ... other fields ...
  affiliateUrl: null,         // ← change to your URL
  affiliateActive: false,     // ← change to true
  commission: "30% lifetime",
  hasOffer: true,
}
```

To:

```typescript
{
  slug: "roketfy",
  // ...
  affiliateUrl: "https://roketfy.com/?ref=bestaietsy",
  affiliateActive: true,
  // ...
}
```

### 2. Save + verify

The dev server hot-reloads automatically. Open `http://localhost:3000/tools/roketfy` and check:
- CTA button now links out (with `rel="sponsored noopener"`)
- "Link pending" badge disappears from tool cards
- Homepage `/tools/[slug]` cards no longer show pending badge

### 3. Commit

```bash
git add src/lib/tools.ts
git commit -m "feat(affiliate): add Roketfy affiliate link"
```

## How affiliate components work

| File | Purpose |
|---|---|
| `src/components/AffiliateCTA.tsx` | Unified CTA button — renders external link with `rel="sponsored"` if URL is set, else falls back to internal review link with "Link pending" notice |
| `src/components/AffiliateCTA.tsx` → `AffiliateMention` | Inline link inside article MDX (also handles pending state with a small dot marker) |
| `src/lib/tools.ts` | Tool data + helper `getLiveAffiliateTools()` for analytics/audits |

## Recommended affiliate signup order

| Tool | Commission | Application | Link |
|---|---|---|---|
| **Roketfy** | 30% lifetime | Direct | https://roketfy.com/affiliate |
| **eRank** | 25% recurring | Direct | https://erank.com/affiliate |
| **Midjourney** | 10-20% tiered | Direct | https://midjourney.com/affiliate |
| **EtsyHunt** | 30% recurring | Direct | https://etsyhunt.com/affiliate |
| **Alura** | 30% recurring | Direct | https://alura.com/affiliate |

Direct programs typically approve in 1-3 days. Awin (ShareASale) for Midjourney/Alura can take 5-7 days.

## When a link is added

After setting `affiliateUrl` + `affiliateActive: true` in `tools.ts`, the changes flow through automatically:

1. **Tool page CTA** → external link with `rel="sponsored noopener"` (FTC compliant)
2. **Tool card on `/tools` index** → "Link pending" badge removed
3. **Tool card on homepage** → "Link pending" badge removed
4. **Inline mentions in articles** → adds small "external link" icon next to tool name (the small dot marker disappears)
5. **Affiliate disclosure block in articles** → updates automatically (lists tool names + links to internal review)

No code changes required beyond editing `tools.ts`.

## Audit: where do we currently link out?

To see all live outbound affiliate links at any time, run:

```bash
grep -rE 'target="_blank"' src/ | grep 'rel="noopener noreferrer sponsored"'
```

Or check `src/lib/tools.ts → getLiveAffiliateTools()` to enumerate all tools with active affiliate links.

## FTC compliance

Every external affiliate link automatically gets:
- `target="_blank"` (opens in new tab)
- `rel="noopener"` (security)
- `rel="noreferrer"` (privacy)
- `rel="sponsored"` (FTC required for paid placements)

The `/affiliate-disclosure` page is auto-generated from `tools.ts` data.

## Adding a new tool

To add a 6th tool to the directory:

1. Append to `TOOLS` array in `src/lib/tools.ts`
2. Create `/public/images/tools/[slug]-logo.png` (optional — defaults to colored letter tile)
3. Create `src/app/tools/[slug]/page.tsx` is auto-routed if you add to `generateStaticParams()` — but Next.js 15 catches dynamic params automatically

No rebuild required — just save the file and reload.