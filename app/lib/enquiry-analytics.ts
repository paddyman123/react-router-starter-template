declare global {
 interface Window { gtag?: (...args: unknown[]) => void; }
}

type EnquiryEvent = {
 form: "match_wizard" | "quick_quote_check" | "check_my_quote";
 hasUpload: boolean;
};

// TODO: Google Ads conversion tag.
// No AW- ID exists yet. Leave this empty until the Ads account is created.
// Then set it to "AW-XXXXXXXXX/CONVERSION_LABEL" and the hook below will fire.
// Do not invent an AW- ID.
export const GOOGLE_ADS_SEND_TO = "";

export function trackGoogleAdsLeadConversion(): void {
 if (typeof window === "undefined" || !GOOGLE_ADS_SEND_TO) return;
 try {
  window.gtag?.("event", "conversion", { send_to: GOOGLE_ADS_SEND_TO });
 } catch { /* A blocked or unconfigured tag must not affect the success screen. */ }
}

// Call only after the lead API confirms receipt. Analytics must not interrupt enquiries.
export function trackAcceptedEnquiry({ form, hasUpload }: EnquiryEvent): void {
 if (typeof window === "undefined") return;
 try {
  window.gtag?.("event", "generate_lead", {
   send_to: "G-044RPZF5DC",
   form_id: form,
   has_upload: hasUpload,
  });
 } catch { /* A blocked or unavailable tag must not affect the success screen. */ }
}
