import { trackAcceptedEnquiry, trackGoogleAdsLeadConversion } from "../lib/enquiry-analytics";
import { getEnquiryAttribution } from "../lib/enquiry-attribution";
import { useEffect, useState } from "react";

declare global {
 interface Window { fbq?: (...args: unknown[]) => void; }
}

const LEAD_API = "https://stonematch.patrick-deakin.workers.dev/api/lead";
// Same checks the existing lead endpoint uses, so a bad postcode or number fails here first.
const UK_POSTCODE = /^(GIR ?0AA|(?:[A-Z]{1,2}\d[A-Z\d]?|[A-Z]{1,2}\d{1,2}) ?\d[A-Z]{2})$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteCheckForm() {
 const [step, setStep] = useState(0);
 const [attribution, setAttribution] = useState<Record<string, string>>({});
 const [postcode, setPostcode] = useState("");
 const [quotedBy, setQuotedBy] = useState("");
 const [price, setPrice] = useState("");
 const [notes, setNotes] = useState("");
 const [files, setFiles] = useState<File[]>([]);
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [phone, setPhone] = useState("");
 const [consent, setConsent] = useState(false);
 const [error, setError] = useState("");
 const [submitting, setSubmitting] = useState(false);
 const [submitted, setSubmitted] = useState(false);

 useEffect(() => { setAttribution(getEnquiryAttribution()); }, []);

 function continueToContact() {
  if (!UK_POSTCODE.test(postcode.trim())) {
   setError("Please add a valid UK postcode so we know where the kitchen is.");
   return;
  }
  if (!quotedBy.trim() || !price.trim()) {
   setError("Please tell us who quoted you, and the price on the quote.");
   return;
  }
  setError("");
  setStep(1);
 }

 async function submit() {
  if (submitting) return;
  if (!name.trim() || !EMAIL.test(email.trim())) {
   setError("Please add your name and a valid email address.");
   return;
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
   setError("Please add a contact number. The quote check is sent through our existing enquiry service, which needs one so we can talk it through.");
   return;
  }
  if (!consent) {
   setError("Please confirm that StoneMatch may use these details to deal with your enquiry.");
   return;
  }
  setError("");
  setSubmitting(true);
  const payload = {
   attribution,
   postcode: postcode.trim(),
   projectType: "Kitchen worktops",
   material: "Not sure yet",
   style: "",
   budget: "",
   timescale: "",
   measurements: "",
   existingQuote: `Quoted by ${quotedBy.trim()}. Quoted price: ${price.trim()}.`,
   name: name.trim(),
   email: email.trim(),
   phone: phone.trim(),
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
   setError("We couldn't send your quote just now. Please try again, or email enquiries@stonematch.co.uk.");
  } finally {
   setSubmitting(false);
  }
 }

 if (submitted) {
  return <div className="wizard-success"><span className="eyebrow dark">Quote check received</span><h3>Thanks, {name.trim().split(" ")[0]}.</h3><p>Your quote is with StoneMatch. We'll compare it like for like and come back with a straight answer.</p><div className="success-next"><strong>What happens next?</strong><span><b>1</b> We read who quoted you, the price, and any file you attached.</span><span><b>2</b> We compare the material, specification, fabrication and fitting.</span><span><b>3</b> We tell you whether the quote holds up, before you pay a deposit.</span></div><p>Free. No deposit to us. No obligation. If your deal is already fair, we'll say so.</p></div>;
 }

 return <div className="wizard" id="quote-check-form">
  <div className="wizard-top"><div><span>Step {step + 1} of 2</span><strong>{step === 0 ? "The quote" : "How we reach you"}</strong></div><div className="wizard-progress"><i style={{ width: step === 0 ? "50%" : "100%" }} /></div></div>
  {step === 0 && <section className="wizard-step">
   <p className="eyebrow dark">For a quote you already hold</p>
   <h3>Send the number before it becomes a deposit.</h3>
   <p className="wizard-copy">Who quoted you, what they asked, and where the kitchen is. A photo or PDF of the quote is even better, if you have it to hand.</p>
   <label>Project postcode<input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="e.g. B68 8AB" autoComplete="postal-code" /></label>
   <div className="form-row">
    <label>Who quoted you<input value={quotedBy} onChange={(e) => setQuotedBy(e.target.value)} placeholder="Kitchen studio, retailer or fabricator" /></label>
    <label>Quoted price<input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. £4,850, fitting included" /></label>
   </div>
   <label>Notes <small>(optional)</small><textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Thickness, edges, splashbacks, or anything that felt unclear." /></label>
   <label className="upload-field"><span>Upload the quote <small>(optional)</small></span><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={(e) => {
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
  </section>}
  {step === 1 && <section className="wizard-step">
   <p className="eyebrow dark">Last step</p>
   <h3>Where should we send the answer?</h3>
   <p className="wizard-copy">We'll use these details only to reply about this quote. Your number stays off the website.</p>
   <div className="form-row">
    <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" autoComplete="name" /></label>
    <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" /></label>
   </div>
   <label>Your number<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="So we can talk the comparison through" autoComplete="tel" /></label>
   <div className="review-box"><strong>The quote we'll check</strong><span>{postcode.trim().toUpperCase()}</span><span>{quotedBy.trim()} · {price.trim()}</span></div>
   <label className="consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>I agree that StoneMatch can use my details to respond to this enquiry and, where needed, share relevant project information with suitable suppliers to obtain options. See the <a href="/privacy/">Privacy Notice</a>.</span></label>
  </section>}
  {error && <p className="wizard-error">{error}</p>}
  <div className="wizard-actions">
   {step === 1 ? <button type="button" className="wizard-back" onClick={() => { setError(""); setStep(0); }}>← Back</button> : <span />}
   {step === 0
    ? <button type="button" className="button gold" onClick={continueToContact}>Continue →</button>
    : <button type="button" className="button gold" onClick={submit} disabled={submitting}>{submitting ? "Sending…" : "Check my quote →"}</button>}
  </div>
  <p className="wizard-note">Free for homeowners. No deposit. No obligation. If the quote is already fair, we'll tell you.</p>
 </div>;
}
