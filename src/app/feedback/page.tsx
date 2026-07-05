import type { Metadata } from "next";
import { Mail, Heart, Lightbulb, AlertCircle, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Tell us what's working, what's not, and what you want us to cover next. Every message is read.",
  keywords: [
    "bestaietsy feedback",
    "AI tool review feedback",
    "Etsy seller suggestions",
    "bestaietsy topic ideas",
    "bestaietsy feature request",
  ],
  alternates: { canonical: "https://bestaietsy.com/feedback" },
  robots: { index: true, follow: true },
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-5xl font-black text-brown-900 mb-6">
            Tell us what you think
          </h1>
          <p className="text-lg text-brown-700 mb-10">
            bestaietsy is built for Etsy sellers like you. The fastest way to
            make it better is to hear what&apos;s actually helping (or not).
            We read every message.
          </p>

          {/* Primary contact card */}
          <div className="bg-gradient-to-br from-primary-50 to-cream-100 border-2 border-primary-200 rounded-2xl p-8 mb-10 shadow-warm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500 text-cream-50 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-primary-700 uppercase tracking-wider mb-1">
                  Send to
                </p>
                <a
                  href="mailto:support@bestaietsy.com?subject=Feedback"
                  className="font-display text-3xl font-bold text-brown-900 hover:text-primary-700 transition break-all"
                >
                  support@bestaietsy.com
                </a>
                <p className="text-sm text-brown-700 mt-2">
                  Subject line:{" "}
                  <code className="bg-cream-200 px-1.5 py-0.5 rounded text-xs">
                    Feedback: [your topic]
                  </code>{" "}
                  helps us route it.
                </p>
              </div>
            </div>
          </div>

          {/* 4 feedback categories */}
          <h2 className="font-display text-2xl font-bold text-brown-900 mb-4">
            Pick the category that fits
          </h2>
          <p className="text-sm text-brown-600 mb-6">
            Tell us which one in your subject line. Each goes to a slightly
            different reviewer.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <FeedbackCard
              icon={<Heart className="w-5 h-5" />}
              title="Love letter"
              subject="Feedback: Love"
              color="coral"
              desc="Something worked great? Saved you time or money? We feature real reader wins (with permission) in future posts."
              prompts={[
                "Which article or tool review helped you?",
                "What was the outcome (saved hours / made sales / avoided a mistake)?",
                "May we quote you in a future post?",
              ]}
            />

            <FeedbackCard
              icon={<AlertCircle className="w-5 h-5" />}
              title="Something's broken"
              subject="Feedback: Bug"
              color="coral"
              desc="Wrong info, broken link, outdated policy date, code that doesn't render? Tell us the URL and we'll fix it fast."
              prompts={[
                "What's the page URL?",
                "What did you expect to happen vs what actually happened?",
                "Browser + device (helps with rendering bugs)?",
              ]}
            />

            <FeedbackCard
              icon={<Lightbulb className="w-5 h-5" />}
              title="Content suggestion"
              subject="Feedback: Topic idea"
              color="mustard"
              desc="A topic you wish we'd cover? An Etsy policy or AI tool that's confusing to you? Our editorial calendar is driven by these."
              prompts={[
                "What topic should we cover?",
                "Who is it for (new seller / established / specific niche)?",
                "Why now — is something changing in the space?",
              ]}
            />

            <FeedbackCard
              icon={<Sparkles className="w-5 h-5" />}
              title="Feature request"
              subject="Feedback: Feature"
              color="primary"
              desc="Wish the site did something it doesn't? We track every request and ship the most-requested ones."
              prompts={[
                "What should we add or change?",
                "How often would you use it?",
                "Anything that already does it well (a reference)?",
              ]}
            />
          </div>

          {/* What we promise */}
          <h2 className="font-display text-2xl font-bold text-brown-900 mb-4">
            What we promise
          </h2>
          <ul className="space-y-2 text-brown-700 mb-10">
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>
                <strong>We read every message.</strong> No bot triage on
                feedback.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>
                <strong>We reply within 1&ndash;2 business days</strong> for
                anything that asks a question.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>
                <strong>Corrections get fixed fast</strong> — usually within
                24 hours, with a note on the article if it&apos;s a policy
                thing.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>
                <strong>We don&apos;t add you to any list</strong> from
                feedback. Your email is only used to reply.
              </span>
            </li>
          </ul>

          {/* Footer CTA */}
          <div className="bg-cream-100 border border-brown-200 rounded-xl p-6">
            <p className="text-sm text-brown-700">
              <strong className="text-brown-900">Prefer a form?</strong> We
              don&apos;t have one yet — feedback is email-only for now so
              nothing gets trapped in a queue. When you&apos;ve sent a few
              patterns we&apos;ll see if a form helps.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function FeedbackCard({
  icon,
  title,
  subject,
  color,
  desc,
  prompts,
}: {
  icon: React.ReactNode;
  title: string;
  subject: string;
  color: "coral" | "mustard" | "primary";
  desc: string;
  prompts: string[];
}) {
  const colorMap = {
    coral: "bg-coral-50 border-coral-300 text-coral-700",
    mustard: "bg-mustard-50 border-mustard-300 text-mustard-700",
    primary: "bg-primary-50 border-primary-300 text-primary-700",
  };
  const mailto = `mailto:support@bestaietsy.com?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="border-2 border-brown-200 rounded-2xl p-5 hover:border-primary-400 transition">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        <h3 className="font-display text-lg font-bold text-brown-900">
          {title}
        </h3>
      </div>
      <p className="text-sm text-brown-700 mb-3">{desc}</p>
      <p className="font-mono text-[11px] text-brown-500 uppercase tracking-wider mb-1">
        Prompt questions
      </p>
      <ul className="text-xs text-brown-700 space-y-1 mb-4">
        {prompts.map((p, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-primary-600 shrink-0">→</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <a
        href={mailto}
        className="text-xs font-semibold text-primary-700 hover:text-primary-800 underline"
      >
        Send a {title.toLowerCase()} →
      </a>
    </div>
  );
}