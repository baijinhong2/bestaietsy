/**
 * SEO Content Type System
 *
 * Implements the user's standard SEO content schema (8-block structure):
 *   tdk → head1 → Whatis → howToUse → doWith → Whois → youNeed → realVoices → faq
 *
 * Each block has strictly typed fields per spec. Reusable across pages.
 */

export interface SeoTdk {
  type: "tdk";
  /** ~25 words. MUST end with "| bestaietsy". Includes 2 core keywords + 1 modifier. */
  title_i18n: string;
  /** ~40 words. 3-5 keywords. One soft CTA. */
  description_i18n: string;
  /** ~15 words. 3-5 keywords. Mix core + long-tail. */
  keywords_i18n: string;
}

export interface SeoHead1 {
  head: "head1";
  /** H1 visible on page. Slightly different from SEO title. */
  title_i18n: string;
  /** Subtitle / supporting text. 3-5 keywords. */
  description_i18n: string;
  /** 2-5 words, action verb, core keywords only. */
  buttonText_i18n: string;
  buttonRoute: string;
  photo: string;
  photoThumbnail: string;
}

export interface SeoWhatisItem {
  description_i18n: string;
  buttonText_i18n: string;
  buttonRoute: string;
  photo: string;
  photoThumbnail: string;
}

export interface SeoWhatis {
  head: "head2";
  type: "Whatis";
  /** Format: "What is bestaietsy's {{core_keywords}}?" */
  title_i18n: string;
  content: SeoWhatisItem[];
}

export interface SeoHowToUseStep {
  title_i18n: string; // "Step N: ..."
  description_i18n: string;
}

export interface SeoHowToUse {
  head: "head2";
  type: "howToUse";
  title_i18n: string; // "How does bestaietsy's {{core_keywords}} work?"
  buttonText_i18n: string;
  buttonRoute: string;
  photo: string;
  photoThumbnail: string;
  content: SeoHowToUseStep[]; // exactly 3
}

export interface SeoDoWithItem {
  title_i18n: string;
  description_i18n: string;
  buttonText_i18n: string;
  buttonRoute: string;
  photo: string;
  photoThumbnail: string;
}

export interface SeoDoWith {
  head: "head2";
  type: "doWith";
  title_i18n: string;
  description_i18n: string;
  content: SeoDoWithItem[]; // exactly 4
}

export interface SeoWhoisItem {
  title_i18n: string;
  description_i18n: string;
  photo: string;
  photoThumbnail: string;
}

export interface SeoWhois {
  head: "head2";
  type: "Whois";
  title_i18n: string; // "Who is bestaietsy's {{core_keywords}} for?"
  buttonText_i18n: string;
  buttonRoute: string;
  content: SeoWhoisItem[]; // exactly 3
}

export interface SeoYouNeedItem {
  title_i18n: string;
  description_i18n: string;
  photo: string;
  photoThumbnail: string;
}

export interface SeoYouNeed {
  head: "head2";
  type: "youNeed";
  title_i18n: string; // "Why choose bestaietsy's {{core_keywords}}?"
  buttonText_i18n: string;
  buttonRoute: string;
  content: SeoYouNeedItem[]; // exactly 3
}

export interface SeoReview {
  title_i18n: string; // ~8 words
  description_i18n: string; // ~60 words
  ext1: string; // per-review rating, "5" or "4.9"
  ext2_i18n: string; // reviewer name
  ext3_i18n: string; // profession
  photo: string;
  photoThumbnail: string;
}

export interface SeoRealVoices {
  head: "head2";
  type: "realVoices";
  title_i18n: string;
  buttonText_i18n: string;
  buttonRoute: string;
  photo: string;
  photoThumbnail: string;
  /** Overall rating, e.g. "4.9" */
  ext1: string;
  /** MUST be exactly "From {{review_count}} Reviews" */
  ext2_i18n: string;
  content: SeoReview[]; // exactly 6
}

export interface SeoFaqItem {
  title_i18n: string;
  description_i18n: string;
}

export interface SeoFaq {
  head: "head2";
  type: "faq";
  title_i18n: string;
  buttonText_i18n: string;
  buttonRoute: string;
  content: SeoFaqItem[]; // exactly 10
}

/** Full ordered SEO content array for one page. */
export type SeoContentBlock =
  | SeoTdk
  | SeoHead1
  | SeoWhatis
  | SeoHowToUse
  | SeoDoWith
  | SeoWhois
  | SeoYouNeed
  | SeoRealVoices
  | SeoFaq;

export type SeoContent = SeoContentBlock[];

/** Convenience: extract the TDK block from a SeoContent array. */
export function getTdk(content: SeoContent): SeoTdk | null {
  return (
    content.find((b): b is SeoTdk => "type" in b && b.type === "tdk") ?? null
  );
}

/** Convenience: extract the FAQ block for JSON-LD structured data. */
export function getFaq(content: SeoContent): SeoFaq | null {
  return (
    content.find((b): b is SeoFaq => "type" in b && b.type === "faq") ?? null
  );
}