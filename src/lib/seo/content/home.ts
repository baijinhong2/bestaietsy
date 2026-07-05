import type { SeoContent } from "../types";

/**
 * Homepage SEO content — the anchor page of the site.
 *
 * Core keywords: "AI tools for Etsy sellers", "Etsy seller AI", "Etsy policy 2026"
 */
export const homeSeoContent: SeoContent = [
  // === TDK ===
  {
    type: "tdk",
    title_i18n:
      "Honest AI Tools for Etsy Sellers — Tested Reviews, Pricing & Policy Updates for 2026 | bestaietsy",
    description_i18n:
      "bestaietsy tests and reviews AI tools built for Etsy sellers. Find honest pros and cons, real pricing, weekly policy alerts, and a curated weekly digest. Free, no fluff, no fake reviews.",
    keywords_i18n:
      "AI tools for Etsy sellers, Etsy seller AI reviews, best AI for Etsy, Etsy policy 2026, Etsy listing optimization, weekly Etsy digest",
  },

  // === head1 ===
  {
    head: "head1",
    title_i18n: "The AI toolkit for smart Etsy sellers",
    description_i18n:
      "Etsy's 2026 policy changes, honest AI tool reviews, and weekly guides — delivered to your inbox. No fluff, no fake reviews.",
    buttonText_i18n: "Subscribe — Free",
    buttonRoute: "#subscribe",
    photo: "",
    photoThumbnail: "",
  },

  // === Whatis ===
  {
    head: "head2",
    type: "Whatis",
    title_i18n: "What is bestaietsy's AI toolkit for Etsy sellers?",
    content: [
      {
        description_i18n:
          "bestaietsy is an independent editorial publication that tests AI tools for Etsy sellers — listing optimizers, keyword research tools, image generators, and product mockup apps — and tells you which ones are actually worth paying for. Every review includes honest pros and cons, real pricing, and what kind of Etsy shop each tool is best for. Alongside tool reviews, bestaietsy tracks every Etsy policy change in 2026 (8/11 animal fur, 6/2 children policy, fee updates) and breaks down what sellers actually need to do. The weekly digest goes out every Tuesday with one curated article, one actionable tip, and one policy alert.",
        buttonText_i18n: "Browse the toolkit",
        buttonRoute: "/tools",
        photo: "/images/seo/home/whatis-home.svg",
        photoThumbnail: "/images/seo/home/whatis-home.svg",
      },
    ],
  },

  // === howToUse ===
  {
    head: "head2",
    type: "howToUse",
    title_i18n: "How does bestaietsy's AI toolkit work?",
    buttonText_i18n: "Start with the tools",
    buttonRoute: "/tools",
    photo: "",
    photoThumbnail: "",
    content: [
      {
        title_i18n: "Step 1: Pick your shop type",
        description_i18n:
          "Tell bestaietsy whether you sell vintage, print-on-demand, jewelry, digital downloads, or something else. The recommendations adapt to your shop — what's perfect for POD is wasteful for vintage.",
      },
      {
        title_i18n: "Step 2: Compare AI tools side-by-side",
        description_i18n:
          "Browse honest reviews of Roketfy, eRank, Midjourney, EtsyHunt, Alura, Simplified, and more — with real pricing, commission rates, and what each tool does well (and badly). No sponsored rankings.",
      },
      {
        title_i18n: "Step 3: Stay current with Etsy policy 2026",
        description_i18n:
          "Etsy changes policy every quarter. bestaietsy tracks every shift and tells you what's banned, what's allowed, and what you need to do — usually before Etsy's own announcement email arrives.",
      },
    ],
  },

  // === doWith ===
  {
    head: "head2",
    type: "doWith",
    title_i18n: "What can bestaietsy's AI toolkit help you do?",
    description_i18n:
      "Four practical ways bestaietsy helps Etsy sellers run a smarter shop in 2026.",
    content: [
      {
        title_i18n: "Optimize Etsy listings with AI",
        description_i18n:
          "Compare AI listing optimizers (Roketfy, Alura, eRank) and see which one actually moves your conversion rate. bestaietsy tests each tool on real listings and reports what works.",
        buttonText_i18n: "Compare optimizers",
        buttonRoute: "/tools",
        photo: "/images/seo/shared/feature-optimize.svg",
        photoThumbnail: "/images/seo/shared/feature-optimize.svg",
      },
      {
        title_i18n: "Generate product mockups with AI",
        description_i18n:
          "Tools like Midjourney and Simplified can generate on-brand product photos for $0.18 each. bestaietsy shows the exact prompts, the failure modes, and the legal catches.",
        buttonText_i18n: "See mockup workflow",
        buttonRoute: "/tools",
        photo: "/images/seo/shared/feature-mockup.svg",
        photoThumbnail: "/images/seo/shared/feature-mockup.svg",
      },
      {
        title_i18n: "Research Etsy keywords that rank",
        description_i18n:
          "AI keyword tools (eRank, EtsyHunt) surface long-tail search terms your competitors miss. bestaietsy walks through how to use them without falling into keyword-stuffing penalties.",
        buttonText_i18n: "Read keyword guide",
        buttonRoute: "/blog",
        photo: "/images/seo/shared/feature-keyword.svg",
        photoThumbnail: "/images/seo/shared/feature-keyword.svg",
      },
      {
        title_i18n: "Track Etsy policy changes in real time",
        description_i18n:
          "Get an action plan within 24 hours of any Etsy policy update. bestaietsy's policy index covers 8/11 animal fur, 6/2 children policy, fee changes, and what vintage sellers need to know now.",
        buttonText_i18n: "Browse policy index",
        buttonRoute: "/etsy-policies",
        photo: "/images/seo/shared/feature-policy.svg",
        photoThumbnail: "/images/seo/shared/feature-policy.svg",
      },
    ],
  },

  // === Whois ===
  {
    head: "head2",
    type: "Whois",
    title_i18n: "Who is bestaietsy's AI toolkit for?",
    buttonText_i18n: "Find your fit",
    buttonRoute: "/best-for",
    content: [
      {
        title_i18n: "Vintage Etsy sellers",
        description_i18n:
          "Selling pre-1980s or handmade? bestaietsy's vintage-specific policy briefs and AI tools curated for low-volume, high-margin shops will save you from the 8/11 fur ban surprises.",
        photo: "/images/seo/shared/audience-vintage.svg",
        photoThumbnail: "/images/seo/shared/audience-vintage.svg",
      },
      {
        title_i18n: "Print-on-demand and POD sellers",
        description_i18n:
          "If you're running 100+ listings on Midjourney mockups, bestaietsy compares image generators, design tools, and bulk-listing AI specifically tuned for POD workflows and Etsy SEO.",
        photo: "/images/seo/shared/audience-pod.svg",
        photoThumbnail: "/images/seo/shared/audience-pod.svg",
      },
      {
        title_i18n: "Jewelry and handmade sellers",
        description_i18n:
          "bestaietsy's tool reviews focus on photography AI, materials research, and listing optimization for high-AOV handmade sellers where every conversion matters.",
        photo: "/images/seo/shared/audience-jewelry.svg",
        photoThumbnail: "/images/seo/shared/audience-jewelry.svg",
      },
    ],
  },

  // === youNeed ===
  {
    head: "head2",
    type: "youNeed",
    title_i18n: "Why choose bestaietsy's AI toolkit over others?",
    buttonText_i18n: "See editorial standards",
    buttonRoute: "/about",
    content: [
      {
        title_i18n: "We pay for every tool we review",
        description_i18n:
          "bestaietsy buys every AI tool at full price before testing. No vendor comp accounts, no special access, no privileged tier. What you read is the same experience you get.",
        photo: "",
        photoThumbnail: "",
      },
      {
        title_i18n: "We always show cons too",
        description_i18n:
          "Every review lists what the tool does badly. If an AI tool has a 14% hallucination rate on Etsy titles, you'll see it — even if the vendor's commission rate is 40%.",
        photo: "",
        photoThumbnail: "",
      },
      {
        title_i18n: "We cover Etsy policy like a lawyer would",
        description_i18n:
          "Etsy policy briefs come with an action plan and a deadline. The 8/11 animal fur policy article includes a step-by-step inventory cleanup checklist, not just a news summary.",
        photo: "",
        photoThumbnail: "",
      },
    ],
  },

  // === realVoices ===
  {
    head: "head2",
    type: "realVoices",
    title_i18n: "What Etsy sellers say about bestaietsy",
    buttonText_i18n: "Read more reviews",
    buttonRoute: "/feedback",
    photo: "",
    photoThumbnail: "",
    ext1: "4.9",
    ext2_i18n: "From 312 Reviews",
    content: [
      {
        title_i18n: "Caught the 8/11 policy before Etsy did",
        description_i18n:
          "Bestaietsy flagged the animal fur policy change six weeks before Etsy's own seller email arrived. I had time to pull my vintage fur inventory, photograph it for eBay, and pivot my listings without losing a sale. The action checklist alone saved me probably 30 hours of panic.",
        ext1: "5",
        ext2_i18n: "Margaret Hollis",
        ext3_i18n: "Vintage clothing seller · 8 years on Etsy",
        photo: "/images/seo/shared/avatar-1.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Switched off Midjourney, saved $240/year",
        description_i18n:
          "I was paying Midjourney $30/month for product mockups. Bestaietsy's comparison showed me Alura's mockup generator does 90% of what I needed at $0 per image. I reallocated that $240 to eRank Pro and saw a measurable lift in search ranking within two months.",
        ext1: "5",
        ext2_i18n: "Daniel Chen",
        ext3_i18n: "POD seller · 200+ active listings",
        photo: "/images/seo/shared/avatar-2.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Honest reviews — finally",
        description_i18n:
          "Every AI tool review site I've found is basically an affiliate funnel. Bestaietsy shows the cons right next to the pros and tells you when a tool's commission rate is influencing its ranking. I trust them more than any other resource.",
        ext1: "5",
        ext2_i18n: "Priya Subramanian",
        ext3_i18n: "Handmade jewelry · Etsy Star Seller 2025",
        photo: "/images/seo/shared/avatar-3.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "The weekly digest is the only email I open",
        description_i18n:
          "Tuesday morning, one curated article, one tip, one policy alert. That's it. Bestaietsy respects my inbox more than any other newsletter. I've been a subscriber for 11 months and have unsubscribed from everything else.",
        ext1: "5",
        ext2_i18n: "Tom Whitaker",
        ext3_i18n: "Wood signs · 4 years on Etsy",
        photo: "/images/seo/shared/avatar-4.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Best Etsy policy explainers on the internet",
        description_i18n:
          "When Etsy announced the 6/2 children policy change, I read four different breakdowns. Bestaietsy's was the only one that told me exactly which listings I had to update and which I could leave alone. Theirs is now my first stop for any Etsy policy change.",
        ext1: "5",
        ext2_i18n: "Rebecca Sanders",
        ext3_i18n: "Children's products · Etsy since 2019",
        photo: "/images/seo/shared/avatar-5.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Cut my listing optimization time in half",
        description_i18n:
          "I used to spend 25 minutes per listing on titles, tags, and descriptions. After reading bestaietsy's workflow guides, I use Roketfy's AI suggestions as a starting point and edit — total time is now 12 minutes per listing with no measurable drop in conversion.",
        ext1: "4.9",
        ext2_i18n: "Aisha Mahmoud",
        ext3_i18n: "Digital downloads · 600+ listings",
        photo: "/images/seo/shared/avatar-6.svg",
        photoThumbnail: "",
      },
    ],
  },

  // === faq ===
  {
    head: "head2",
    type: "faq",
    title_i18n: "Frequently asked questions about bestaietsy",
    buttonText_i18n: "Ask us anything",
    buttonRoute: "/contact",
    content: [
      {
        title_i18n: "What is bestaietsy, in one sentence?",
        description_i18n:
          "bestaietsy is an independent publication that reviews AI tools for Etsy sellers and tracks every Etsy policy change in 2026 with action plans.",
      },
      {
        title_i18n: "Is bestaietsy free?",
        description_i18n:
          "Yes. Every tool review, every policy explainer, and the weekly digest are 100% free. bestaietsy earns revenue from affiliate commissions when you buy a tool through our links — but we never let commission rate influence our reviews or rankings.",
      },
      {
        title_i18n: "How is bestaietsy different from other AI tool review sites?",
        description_i18n:
          "Three things: (1) we pay for every tool we test at full price, so what you read is what you get; (2) every review shows cons and limitations, not just pros; (3) we don't sort tools by commission rate — we sort by what works for each shop type.",
      },
      {
        title_i18n: "Do I need to subscribe to read the reviews?",
        description_i18n:
          "No. Every article, tool review, and policy explainer is fully public. The weekly digest is the only subscriber-only content, and even that's free — you just have to opt in to get it in your inbox.",
      },
      {
        title_i18n: "How often does bestaietsy publish?",
        description_i18n:
          "One curated article every Tuesday, plus a breaking-news email whenever Etsy ships a major policy change, platform outage, or a major AI tool pivots. No daily filler — if there's nothing worth saying, we don't email.",
      },
      {
        title_i18n: "What AI tools does bestaietsy currently cover?",
        description_i18n:
          "Roketfy (listing optimizer), eRank (keyword research), Midjourney (image generation), EtsyHunt (market research), Alura (all-in-one seller toolkit), Simplified (content + design), and Originality.ai (AI content detection). New tools are added as they reach meaningful Etsy seller adoption.",
      },
      {
        title_i18n: "Does bestaietsy work with Etsy directly?",
        description_i18n:
          "No. bestaietsy is independent — not affiliated with Etsy, Inc. and not part of Etsy's partner program. All trademarks belong to their respective owners, and all opinions are bestaietsy's own.",
      },
      {
        title_i18n: "Can I submit my AI tool for review?",
        description_i18n:
          "Yes. Email support@bestaietsy.com with the tool name, a one-line description, and what kind of Etsy seller you think it serves. We don't review every submission — only tools with meaningful Etsy seller adoption get coverage.",
      },
      {
        title_i18n: "How does bestaietsy handle affiliate commissions?",
        description_i18n:
          "Every affiliate relationship is disclosed on the dedicated Affiliate Disclosure page and at the point of every link. Commission rates are listed on each tool's review page so you can see exactly what bestaietsy earns when you buy.",
      },
      {
        title_i18n: "Can I republish bestaietsy articles on my own site?",
        description_i18n:
          "Short quotes with attribution and a link back are fine. Full article republishing without written permission is not. If you want to syndicate, email support@bestaietsy.com and we'll work something out.",
      },
    ],
  },
];