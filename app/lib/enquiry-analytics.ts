declare global {
 interface Window { gtag?: (...args: unknown[]) => void; }
}

type EnquiryEvent = {
 form: "match_wizard" | "quick_quote_check";
 hasUpload: boolean;
};

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
