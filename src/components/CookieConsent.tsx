"use client";

import { useEffect, useState } from "react";
import { Cookie, X, Settings } from "lucide-react";

/**
 * Cookie consent banner with Google Consent Mode v2.
 *
 * UX:
 * - Bottom-fixed banner on first visit (no choice yet).
 * - Three buttons: Accept all / Reject all / Customize
 * - Customize opens a panel with per-category toggles:
 *   - Necessary (always on)
 *   - Analytics (Google Analytics 4)
 *   - Marketing (Google AdSense personalization)
 * - Choice stored in both cookie (server-readable) + localStorage.
 *
 * Effect on scripts:
 * - GA4 and AdSense scripts always render (loaded via layout.tsx)
 * - Both use gtag('consent', 'default', { ... denied ... }) as the default
 * - When user grants, this component fires gtag('consent', 'update', { ... granted ... })
 * - Google's Consent Mode v2 handles blocking — no need to conditionally render scripts.
 *
 * Compliance:
 * - GDPR (EU/UK users): shows banner before any consent signal, blocks analytics+marketing until granted.
 * - CCPA (California): "Reject all" honored — links "Do Not Sell or Share" available in privacy policy.
 * - ePrivacy Directive: necessary-only is the default until user opts in.
 */

type ConsentChoice = "all" | "none" | "custom";
interface ConsentState {
  choice: ConsentChoice;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: number;
}

const STORAGE_KEY = "bestaietsy_consent";
const COOKIE_NAME = "be_consent";
const POLICY_VERSION = 1;

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== POLICY_VERSION) return null; // re-prompt on policy version bump
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Cookie (server-readable, used by Vercel middleware if needed)
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(state))}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } catch {
    /* localStorage may be disabled — banner will keep showing on next load */
  }
}

function applyConsentMode(state: ConsentState) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || ((...args: unknown[]) => w.dataLayer.push(args));
  w.gtag("consent", "update", {
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
    analytics_storage: state.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: state.marketing ? "granted" : "denied",
    security_storage: "granted",
  });
}

export function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      // Apply on every page load (gtag may have re-init'd)
      applyConsentMode(existing);
    }
  }, []);

  function commit(state: ConsentState) {
    writeConsent(state);
    applyConsentMode(state);
    setVisible(false);
    setCustomizeOpen(false);
  }

  function handleAcceptAll() {
    commit({
      choice: "all",
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: POLICY_VERSION,
    });
  }

  function handleRejectAll() {
    commit({
      choice: "none",
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: POLICY_VERSION,
    });
  }

  function handleSaveCustom() {
    commit({
      choice: "custom",
      analytics,
      marketing,
      timestamp: Date.now(),
      version: POLICY_VERSION,
    });
  }

  if (!hydrated || !visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="mx-auto max-w-3xl bg-cream-50 border-2 border-brown-900 rounded-2xl shadow-warm-lg pointer-events-auto">
        <div className="p-5 sm:p-6">
          {!customizeOpen ? (
            <>
              <div className="flex items-start gap-3 mb-3">
                <Cookie className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-display text-base font-bold text-brown-900 mb-1">
                    We use cookies
                  </p>
                  <p className="text-sm text-brown-700 leading-relaxed">
                    bestaietsy uses cookies for analytics (Google Analytics) and — if you accept — personalized advertising (Google AdSense).{" "}
                    <a
                      href="/cookie-policy"
                      className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:decoration-primary-600"
                    >
                      Cookie Policy
                    </a>{" · "}
                    <a
                      href="/privacy-policy"
                      className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 hover:decoration-primary-600"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:flex-wrap sm:items-center">
                {/* Mobile: Accept all on top (primary CTA, full-width), Reject + Customize below as full-width.
                    Desktop (sm+): single row, Reject left → Customize middle → Accept right. */}
                <button
                  onClick={handleRejectAll}
                  className="order-3 sm:order-1 inline-flex items-center justify-center font-semibold rounded-xl px-5 py-2.5 text-sm border-2 border-brown-300 text-brown-900 hover:bg-cream-100 transition w-full sm:w-auto"
                >
                  Reject non-essential
                </button>
                <button
                  onClick={() => setCustomizeOpen(true)}
                  className="order-2 sm:order-2 inline-flex items-center justify-center font-semibold rounded-xl px-5 py-2.5 text-sm border-2 border-brown-300 text-brown-900 hover:bg-cream-100 transition w-full sm:w-auto"
                >
                  <Settings className="w-4 h-4 mr-1.5" />
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="order-1 sm:order-3 sm:ml-auto inline-flex items-center justify-center font-bold rounded-xl px-5 py-2.5 text-sm bg-primary-500 hover:bg-primary-600 text-cream-50 transition shadow-warm w-full sm:w-auto"
                >
                  Accept all
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-base font-bold text-brown-900">
                      Cookie preferences
                    </p>
                    <p className="text-xs text-brown-600 mt-1">
                      Choose which categories you allow. You can change your mind anytime from the footer.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCustomizeOpen(false)}
                  className="text-brown-500 hover:text-brown-900"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <ConsentRow
                  title="Necessary"
                  desc="Required for the site to function — security, network, accessibility. Always on."
                  checked
                  disabled
                  onChange={() => undefined}
                />
                <ConsentRow
                  title="Analytics"
                  desc="Google Analytics — counts visits and measures which articles are read. No personally-identifying data shared with Google."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentRow
                  title="Marketing"
                  desc="Google AdSense — serves ads on this site. AdSense uses these cookies to show ads relevant to your interests."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="flex flex-col gap-2 mt-5 sm:flex-row sm:flex-wrap sm:items-center">
                {/* Mobile: Cancel on top (secondary), Save preferences full-width below (primary).
                    Desktop (sm+): Cancel left, Save preferences right via ml-auto. */}
                <button
                  onClick={() => setCustomizeOpen(false)}
                  className="order-2 sm:order-1 inline-flex items-center justify-center font-semibold rounded-xl px-5 py-2.5 text-sm border-2 border-brown-300 text-brown-900 hover:bg-cream-100 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="order-1 sm:order-2 sm:ml-auto inline-flex items-center justify-center font-bold rounded-xl px-5 py-2.5 text-sm bg-primary-500 hover:bg-primary-600 text-cream-50 transition shadow-warm w-full sm:w-auto"
                >
                  Save preferences
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-t border-cream-300 first:border-t-0">
      <div className="flex-1">
        <p className="font-bold text-brown-900 text-sm">{title}</p>
        <p className="text-xs text-brown-600 mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          aria-label={`${title} consent toggle`}
        />
        <div
          className={`w-10 h-6 rounded-full transition ${
            checked ? "bg-primary-500" : "bg-brown-300"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        />
        <div
          className={`absolute left-0.5 top-0.5 bg-cream-50 w-5 h-5 rounded-full transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </label>
    </div>
  );
}
