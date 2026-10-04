export type EnquiryAttribution = Record<string, string>;
const key = "stonematch-entry-attribution";
export function getEnquiryAttribution(): EnquiryAttribution {
 if (typeof window === "undefined") return {};
 try {
  const saved = JSON.parse(sessionStorage.getItem(key) || "null");
  if (saved && typeof saved.source === "string" && typeof saved.landingPage === "string") return saved;
 } catch { /* Storage may be unavailable; the enquiry must still work. */ }
 const params = new URLSearchParams(window.location.search);
 const get = (name: string) => params.get(name) || "";
 let referrer = document.referrer;
 try { if (referrer && new URL(referrer).origin === window.location.origin) referrer = ""; } catch { referrer = ""; }
 const attribution = {
  source: get("utm_source") || get("source") || referrer || "Direct / unknown",
  medium: get("utm_medium"), campaign: get("utm_campaign"), content: get("utm_content"), term: get("utm_term"),
  landingPage: window.location.pathname + window.location.search, referrer,
 };
 try { sessionStorage.setItem(key, JSON.stringify(attribution)); } catch { /* Keep the current-page fallback. */ }
 return attribution;
}
