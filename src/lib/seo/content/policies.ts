import type { SeoContent } from "../types";

/**
 * /etsy-policies SEO content — Etsy 2026 policy updates index page.
 *
 * Core keywords: "Etsy policy 2026", "Etsy seller policy updates", "Etsy policy changes"
 */
export const policiesSeoContent: SeoContent = [
  {
    type: "tdk",
    title_i18n:
      "Etsy 2026 Policy Updates Explained — Animal Fur, Children Policy, Fee Changes & Seller Action Plans | bestaietsy",
    description_i18n:
      "Every Etsy 2026 policy change explained for sellers with action plans. 8/11 animal fur ban, 6/2 children policy, fee updates. Updated within 24 hours of every Etsy announcement.",
    keywords_i18n:
      "Etsy policy 2026, Etsy seller policy updates, Etsy policy changes, 8/11 animal fur policy, Etsy 6/2 children policy, Etsy seller action plan",
  },
  {
    head: "head1",
    title_i18n: "Etsy 2026 policy updates — explained for sellers",
    description_i18n:
      "Every Etsy policy change in 2026 with an action plan and a deadline. Updated within 24 hours of every Etsy announcement.",
    buttonText_i18n: "Browse policy index",
    buttonRoute: "#policies",
    photo: "",
    photoThumbnail: "",
  },
  {
    head: "head2",
    type: "Whatis",
    title_i18n: "What is bestaietsy's Etsy 2026 policy index?",
    content: [
      {
        description_i18n:
          "bestaietsy tracks every Etsy policy change in 2026 and breaks down what sellers actually need to do. Each policy article includes: what changed, when it takes effect, which listings are affected, and a step-by-step action plan with a deadline. The index covers the 8/11 animal fur policy, the 6/2 children policy, fee structure changes, seller handbook updates, and any breaking announcements from Etsy.",
        buttonText_i18n: "See all policy briefs",
        buttonRoute: "#policies",
        photo: "/images/seo/policies/whatis-policies.svg",
        photoThumbnail: "/images/seo/policies/whatis-policies.svg",
      },
    ],
  },
  {
    head: "head2",
    type: "howToUse",
    title_i18n: "How does bestaietsy's Etsy policy tracking work?",
    buttonText_i18n: "Read methodology",
    buttonRoute: "/about",
    photo: "",
    photoThumbnail: "",
    content: [
      {
        title_i18n: "Step 1: Monitor Etsy announcements in real time",
        description_i18n:
          "bestaietsy monitors Etsy's seller handbook, the Etsy Community forums, the Seller Journal, and Etsy's official announcement emails. New policy mentions are flagged within hours of publication.",
      },
      {
        title_i18n: "Step 2: Verify impact on real seller listings",
        description_i18n:
          "bestaietsy cross-references each policy change against common Etsy listing patterns — vintage fur, handmade children's products, digital downloads, POD — to identify which sellers are actually affected.",
      },
      {
        title_i18n: "Step 3: Publish a deadline-driven action plan",
        description_i18n:
          "Within 24 hours of any major Etsy announcement, bestaietsy publishes a policy brief with the effective date, affected listing types, and a checklist sellers can work through before the deadline.",
      },
    ],
  },
  {
    head: "head2",
    type: "doWith",
    title_i18n: "What does bestaietsy's Etsy policy index cover?",
    description_i18n:
      "Four policy areas that affect Etsy sellers in 2026.",
    content: [
      {
        title_i18n: "Banned and restricted items",
        description_i18n:
          "Etsy's prohibited items list changes every quarter. bestaietsy covers the 8/11 animal fur ban (including vintage), the 6/2 children policy update, hazardous materials expansions, and which categories are most affected.",
        buttonText_i18n: "See banned items tracker",
        buttonRoute: "#policies",
        photo: "/images/seo/shared/feature-policy.svg",
        photoThumbnail: "/images/seo/shared/feature-policy.svg",
      },
      {
        title_i18n: "Fee and commission changes",
        description_i18n:
          "Etsy adjusts transaction fees, advertising fees, and Offsite Ads thresholds every year. bestaietsy publishes plain-English breakdowns of what each fee change means for different seller revenue tiers.",
        buttonText_i18n: "See fee tracker",
        buttonRoute: "#policies",
        photo: "/images/seo/shared/feature-fee.svg",
        photoThumbnail: "/images/seo/shared/feature-fee.svg",
      },
      {
        title_i18n: "Star Seller and quality program updates",
        description_i18n:
          "Etsy's Star Seller criteria, the Reviews program, and Etsy's quality scoring algorithms change periodically. bestaietsy covers what changed, who's affected, and what sellers can do to maintain status.",
        buttonText_i18n: "See Star Seller guide",
        buttonRoute: "#policies",
        photo: "/images/seo/shared/feature-starseller.svg",
        photoThumbnail: "/images/seo/shared/feature-starseller.svg",
      },
      {
        title_i18n: "Platform outages and seller protections",
        description_i18n:
          "When Etsy has an outage or a bug that affects seller revenue, bestaietsy publishes the timeline, the impact scope, and what sellers can do to recover (including how to file an appeal with Etsy support).",
        buttonText_i18n: "See outage tracker",
        buttonRoute: "#policies",
        photo: "/images/seo/shared/feature-policy.svg",
        photoThumbnail: "/images/seo/shared/feature-policy.svg",
      },
    ],
  },
  {
    head: "head2",
    type: "Whois",
    title_i18n: "Who needs to track bestaietsy's Etsy policy updates?",
    buttonText_i18n: "Find your fit",
    buttonRoute: "/best-for",
    content: [
      {
        title_i18n: "Vintage Etsy sellers (pre-1980 inventory)",
        description_i18n:
          "Vintage sellers face the highest exposure to policy changes — the 8/11 fur ban, the 6/2 children policy, and materials restrictions all disproportionately affect vintage inventory. bestaietsy's vintage-specific briefs include cleanup checklists.",
        photo: "/images/seo/shared/audience-vintage.svg",
        photoThumbnail: "/images/seo/shared/audience-vintage.svg",
      },
      {
        title_i18n: "Handmade children's product sellers",
        description_i18n:
          "If you sell anything in Etsy's baby, kids, or toys categories, the 6/2 children policy changes affect your listings. bestaietsy tracks every children-policy update with specific listing-action recommendations.",
        photo: "/images/seo/shared/audience-childrens.svg",
        photoThumbnail: "/images/seo/shared/audience-childrens.svg",
      },
      {
        title_i18n: "Volume sellers (200+ active listings)",
        description_i18n:
          "Volume sellers can't manually audit every listing against every policy change. bestaietsy briefs include search filters, downloadable CSV templates, and bulk-action guides so you can audit at scale.",
        photo: "/images/seo/shared/audience-volume.svg",
        photoThumbnail: "/images/seo/shared/audience-volume.svg",
      },
    ],
  },
  {
    head: "head2",
    type: "youNeed",
    title_i18n: "Why choose bestaietsy's Etsy policy tracking?",
    buttonText_i18n: "See editorial standards",
    buttonRoute: "/about",
    content: [
      {
        title_i18n: "24-hour turnaround on every Etsy announcement",
        description_i18n:
          "When Etsy makes a policy change, bestaietsy publishes a brief within 24 hours — usually before Etsy's own seller email arrives. Faster than Etsy's seller handbook updates, which can lag by weeks.",
        photo: "",
        photoThumbnail: "",
      },
      {
        title_i18n: "Action plans with deadlines — not just news",
        description_i18n:
          "Every policy brief includes a checklist with a real deadline. The 8/11 fur policy brief tells you exactly which listings to update, when to do it, and what to do with inventory you can't sell on Etsy.",
        photo: "",
        photoThumbnail: "",
      },
      {
        title_i18n: "Independent — not affiliated with Etsy",
        description_i18n:
          "bestaietsy is an independent publication. We have no inside access to Etsy and no special relationship with Etsy's policy team. Every brief is our best interpretation of what Etsy published — verify with Etsy's seller handbook before taking action.",
        photo: "",
        photoThumbnail: "",
      },
    ],
  },
  {
    head: "head2",
    type: "realVoices",
    title_i18n: "What Etsy sellers say about bestaietsy's policy tracking",
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
        ext3_i18n: "Vintage clothing · 8 years on Etsy",
        photo: "/images/seo/shared/avatar-3.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Best Etsy policy explainers on the internet",
        description_i18n:
          "When Etsy announced the 6/2 children policy change, I read four different breakdowns. Bestaietsy's was the only one that told me exactly which listings I had to update and which I could leave alone. Theirs is now my first stop for any Etsy policy change.",
        ext1: "5",
        ext2_i18n: "Rebecca Sanders",
        ext3_i18n: "Children's products · 2019",
        photo: "/images/seo/shared/avatar-4.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Saved from a Star Seller downgrade",
        description_i18n:
          "I was about to lose my Star Seller status because Etsy's quality score algorithm changed and I missed the announcement. Bestaietsy's brief caught me up in 15 minutes — what changed, what to fix, and how to verify. I kept my Star Seller status.",
        ext1: "5",
        ext2_i18n: "Daniel Chen",
        ext3_i18n: "POD seller · 200+ listings",
        photo: "/images/seo/shared/avatar-5.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Deadline-driven format is gold",
        description_i18n:
          "Other sites write 'Etsy changed a policy' articles with no urgency. Bestaietsy briefs always include the effective date and a checklist with deadlines. That format is what makes the difference between an article I read once and one I act on.",
        ext1: "5",
        ext2_i18n: "Tom Whitaker",
        ext3_i18n: "Wood signs · 4 years on Etsy",
        photo: "/images/seo/shared/avatar-6.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Bulk-audit templates save my weekends",
        description_i18n:
          "I have 600+ active listings. Manually checking each one against a policy change would take a full weekend. Bestaietsy's briefs include CSV templates I can drop into Etsy's bulk-edit tools and audit in an hour.",
        ext1: "5",
        ext2_i18n: "Aisha Mahmoud",
        ext3_i18n: "Digital downloads · 600+ listings",
        photo: "/images/seo/shared/avatar-1.svg",
        photoThumbnail: "",
      },
      {
        title_i18n: "Independent voice I can trust",
        description_i18n:
          "Bestaietsy is the only Etsy policy tracker I trust because they're independent. They have no relationship with Etsy and they say so. Every brief feels honest — not promotional, not watered down to avoid ruffling feathers.",
        ext1: "4.9",
        ext2_i18n: "Priya Subramanian",
        ext3_i18n: "Handmade jewelry · Star Seller 2025",
        photo: "",
        photoThumbnail: "",
      },
    ],
  },
  {
    head: "head2",
    type: "faq",
    title_i18n: "FAQ about bestaietsy's Etsy 2026 policy index",
    buttonText_i18n: "Ask us anything",
    buttonRoute: "/contact",
    content: [
      {
        title_i18n: "What is Etsy's 8/11 animal fur policy?",
        description_i18n:
          "Effective August 11, 2026, Etsy bans the listing of any animal fur product — including vintage, secondhand, and pre-owned fur. bestaietsy's dedicated brief covers what counts as 'fur' under the policy, which materials are excluded, and a step-by-step inventory cleanup plan with the deadline.",
      },
      {
        title_i18n: "What is Etsy's 6/2 children policy?",
        description_i18n:
          "Effective June 2, 2026, Etsy tightened its policy on children's products — including stricter requirements on materials disclosure, choking hazard warnings, and tracking labels. bestaietsy's brief includes which listing categories are affected and what each seller needs to update.",
      },
      {
        title_i18n: "Does Etsy have a policy tracker I can subscribe to?",
        description_i18n:
          "Etsy's official seller handbook updates lag weeks behind actual policy changes. bestaietsy's policy index is updated within 24 hours of every Etsy announcement and includes breaking-news email alerts for major changes.",
      },
      {
        title_i18n: "How do I know if a policy change affects my Etsy listings?",
        description_i18n:
          "bestaietsy publishes a 'what's affected' section in every policy brief — listing categories, materials, price tiers, and shop types. The 8/11 fur brief, for example, lists every category where fur listings might exist (vintage clothing, vintage accessories, vintage home goods).",
      },
      {
        title_i18n: "Are bestaietsy's policy briefs legal advice?",
        description_i18n:
          "No — bestaietsy is editorial, not legal. Our briefs are our best interpretation of what Etsy published and what sellers should consider doing. For binding legal interpretation, consult a lawyer familiar with platform liability and intellectual property.",
      },
      {
        title_i18n: "What happens if I miss an Etsy policy deadline?",
        description_i18n:
          "It depends on the policy. For banned-item deadlines (like 8/11 fur), Etsy will remove listings and may issue account strikes. For fee or quality score changes, the impact is slower — your revenue or ranking drops gradually. bestaietsy's briefs always include what the worst-case enforcement looks like.",
      },
      {
        title_i18n: "Does bestaietsy cover non-US Etsy policy changes?",
        description_i18n:
          "bestaietsy covers Etsy's global seller handbook, which applies to all Etsy markets. Region-specific policy updates (EU consumer law, UK VAPE rules, etc.) are flagged in the relevant briefs when they affect sellers in those jurisdictions.",
      },
      {
        title_i18n: "How does bestaietsy handle Etsy seller handbook revisions?",
        description_i18n:
          "bestaietsy monitors the seller handbook revision history. When Etsy silently updates a section, bestaietsy diffs the change against the previous version and publishes a brief if the change is material to sellers.",
      },
      {
        title_i18n: "Can I report an Etsy policy change to bestaietsy?",
        description_i18n:
          "Yes — email support@bestaietsy.com with a link to the Etsy announcement or seller handbook section. If bestaietsy hasn't covered it yet, we'll publish a brief within 24 hours. If we have, we'll update the existing brief with your context.",
      },
      {
        title_i18n: "What about Etsy fees — does bestaietsy cover those?",
        description_i18n:
          "Yes. bestaietsy tracks every Etsy fee change — transaction fees, advertising fees, Offsite Ads thresholds, and listing fees. Each fee change brief includes the effective date, the revenue tiers affected, and a calculator sellers can use to model the impact.",
      },
    ],
  },
];