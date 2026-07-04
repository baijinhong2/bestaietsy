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

## 📧 Email auto-send

**How it works**:
1. Author commits MDX file to `content/articles/`
2. GitHub Action detects new file in `.github/workflows/notify-subscribers.yml`
3. Action extracts title + slug from frontmatter
4. POSTs to Buttondown API → creates email broadcast draft
5. Author reviews draft in Buttondown dashboard → clicks "Send"
6. All subscribers receive the email in <60s

**Why draft, not auto-send**: Always let author do a 30-second final eye-check before broadcasting.

## 🏗 Tech stack (final)

- **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind + shadcn/ui
- **Content**: MDX files in repo (git push = publish)
- **Search**: Fuse.js client-side
- **Deploy**: Vercel (auto-deploy from GitHub)
- **Email**: Buttondown (free 100 subscribers, then $9/mo)
- **Email templates**: React Email
- **DNS**: Cloudflare (with Aliyun TXT verification for site ownership)
- **Analytics**: GA4 + Google Search Console
- **Comments (optional)**: Giscus (GitHub Discussions)

**No database, no auth, no subscription system.**

## 💰 Operating cost

| Item | Cost |
|---|---|
| Domain | $12/year |
| Vercel | $0 (free tier) |
| Buttondown | $0 (under 100 subs) |
| Cloudflare DNS | $0 |
| **Total** | **~$1/month** |

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