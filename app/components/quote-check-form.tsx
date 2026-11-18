import { trackAcceptedEnquiry, trackGoogleAdsLeadConversion } from "../lib/enquiry-analytics";
import { getEnquiryAttribution } from "../lib/enquiry-attribution";
import { useEffect, useState, type FormEvent } from "react";

declare global {
 interface Window { fbq?: (...args: unknown[]) => void; }
}

const LEAD_API = "https://stonematch.patrick-deakin.workers.dev/api/lead";
// Same checks the existing lead endpoint uses, so a bad postcode fails here first.
const UK_POSTCODE = /^(GIR ?0AA|(?:[A-Z]{1,2}\d[A-Z\d]?|[A-Z]{1,2}\d{1,2}) ?\d[A-Z]{2})$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteCheckForm() {
 const [attribution, setAttribution] = useState<Record<string, string>>({});
 const [postcode, setPostcode] = useState("");
 const [quotedBy, setQuotedBy] = useState("");
 const [price, setPrice] = useState("");
 const [notes, setNotes] = useState("");
 const [files, setFiles] = useState<File[]>([]);
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [consent, setConsent] = useState(false);
 const [error, setError] = useState("");
 const [submitting, setSubmitting] = useState(false);
 const [submitted, setSubmitted] = useState(false);

 useEffect(() => { setAttribution(getEnquiryAttribution()); }, []);

 async function submit(event: FormEvent) {
  event.preventDefault();
  if (submitting) return;
  if (!name.trim() || !EMAIL.test(email.trim())) {
   setError("Please add your name and a valid email address.");
   return;
  }
  if (!UK_POSTCODE.test(postcode.trim())) {
   setError("Please add a valid UK postcode so we know where the kitchen is.");
   return;
  }
  if (!consent) {
   setError("Please confirm that StoneMatch may use these details to deal with your enquiry.");
   return;
  }
  setError("");
  setSubmitting(true);
  const quoteParts = [
   quotedBy.trim() ? `Quoted by ${quotedBy.trim()}.` : "",
   price.trim() ? `Quoted price: ${price.trim()}.` : "",
  ].filter(Boolean);
  const payload = {
   attribution,
   page: "check-my-quote",
   postcode: postcode.trim(),
   projectType: "Kitchen worktops",
   material: "Not sure yet",
   style: "",
   budget: "",
   timescale: "",
   measurements: "",
   existingQuote: quoteParts.join(" "),
   name: name.trim(),
   email: email.trim(),
   bestTime: "",
   notes: `Quote check from /check-my-quote/. ${notes.trim()}`.trim(),
  };
  try {
   const body = new FormData();
   body.append("data", JSON.stringify(payload));
   files.forEach((file) => body.append("files", file));
   const response = await fetch(LEAD_API, { method: "POST", body });
   const result = await response.json().catch(() => ({}));
   if (!response.ok || !result.ok) throw new Error(result.error || "Submission failed");
   window.fbq?.("track", "Lead", {
    content_name: "StoneMatch quote check",
    content_category: "Existing worktop quote",
    has_upload: files.length > 0,
    has_existing_quote: true,
   });
   trackAcceptedEnquiry({ form: "check_my_quote", hasUpload: files.length > 0 });
   trackGoogleAdsLeadConversion();
   setSubmitted(true);
  } catch {
   setError("We couldn't send your quote just now. Please try again, or email it to enquiries@stonematch.co.uk.");
  } finally {
   setSubmitting(false);
  }
 }

 if (submitted) {
  return <div className="wizard-success" role="status"><span className="eyebrow dark">Quote check received</span><h3>Thanks, {name.trim().split(" ")[0]}.</h3><p>Your quote is with StoneMatch. We'll compare it like for like and come back by email with a straight answer.</p><div className="success-next"><strong>What happens next?</strong><span><b>1</b> We read who quoted you, any price you shared, and any file you attached.</span><span><b>2</b> We compare the material, specification, fabrication and fitting.</span><span><b>3</b> We email you whether the quote holds up, before you pay a deposit.</span></div><p>Free. No obligation. If your current quote is already the best deal, we'll tell you.</p></div>;
 }

 return <form className="wizard" id="quote-check-form" onSubmit={submit} noValidate>
  <div className="wizard-top"><div><span>Quote check</span><strong>Your details</strong></div></div>
  <section className="wizard-step">
   <p className="eyebrow dark">For a quote you already hold</p>
   <h3>Send it before it becomes a deposit.</h3>
   <p className="wizard-copy">A photo or PDF of the quote is the most useful thing you can attach. If you don't have the file to hand, paste the key details, or email the quote to enquiries@stonematch.co.uk.</p>
   <div className="form-row">
    <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" autoComplete="name" required /></label>
    <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" required /></label>
   </div>
   <label>Project postcode<input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. B68 8AB" autoComplete="postal-code" required /></label>
   <div className="form-row">
    <label><span>Who the quote is from <small>(optional)</small></span><input value={quotedBy} onChange={(e) => setQuotedBy(e.target.value)} placeholder="Kitchen retailer or factory-direct fabricator" /></label>
    <label><span>Quoted price <small>(optional)</small></span><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="The total written on the quote" autoComplete="off" /></label>
   </div>
   <label><span>Details <small>(optional)</small></span><textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Material, thickness, edges, cut-outs, and anything that wasn't clear." /></label>
   <label className="upload-field"><span>Upload your quote <small>(optional)</small></span><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={(e) => {
    const next = Array.from(e.target.files || []).slice(0, 5);
    if (next.some((file) => file.size > 10 * 1024 * 1024)) {
     setError("Each upload must be under 10MB.");
     e.target.value = "";
     setFiles([]);
     return;
    }
    setError("");
    setFiles(next);
   }} /><small>PDF, JPG, PNG or WEBP · up to 5 files · 10MB each</small>{files.length > 0 && <strong>{files.length} {files.length === 1 ? "file" : "files"} ready to send</strong>}</label>
   <label className="consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>I agree that StoneMatch can use my details to respond to this enquiry and, where needed, share relevant project information with suitable suppliers to obtain options. See the <a href="/privacy/">Privacy Notice</a>.</span></label>
  </section>
  {error && <p className="wizard-error" role="alert">{error}</p>}
  <div className="wizard-actions">
   <span />
   <button type="submit" className="button gold" disabled={submitting}>{submitting ? "Sending…" : "Check my quote"}</button>
  </div>
  <p className="wizard-note">Free for homeowners. No obligation. If the quote is already the best deal, we'll tell you.</p>
 </form>;
}
