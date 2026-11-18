import { QuoteCheckForm } from "../components/quote-check-form";
import { Reviews } from "../components/reviews";
import { Brand } from "../components/site-shell";
import { localBusinessSchema } from "../lib/local-business";

const title = "Check My Worktop Quote Before You Pay the Deposit | StoneMatch";
const description = "Got a quartz or porcelain worktop quote? StoneMatch will check it free, like for like, before you pay a deposit. No obligation.";

const checks: [string, string][] = [
 ["Material and colour", "Is the brand and colour named, or is it only described as quartz, porcelain or a marble look?"],
 ["Thickness", "20mm and 30mm are different jobs. We check which one the quote is actually for."],
 ["Edge profile", "A plain edge and a shaped edge are not the same piece of work. We read which profile is included."],
 ["Cut-outs", "Sink, hob, drainer grooves and tap holes. We check what is listed, and what is left off."],
 ["Upstands and splashbacks", "A low upstand and a full splashback change the job. We see which, if either, is on the quote."],
 ["Templating", "Who comes to measure the kitchen, and whether that visit is included."],
 ["Fitting and delivery", "Whether both are in the quote, or whether they turn up later as extras."],
 ["If the template changes the price", "What the quote says when the measured sizes differ from the plan, and whether that can change what you pay."],
 ["Deposit terms", "When a deposit is asked for, and what paying it actually commits you to."],
 ["Warranty", "Who covers what after fitting: the fabricator, the supplier, or both."],
];

const steps: [string, string, string][] = [
 ["01", "Send your quote", "Upload it, or paste the key details. It takes about two minutes."],
 ["02", "We check it like for like", "Material, thickness, edges, cut-outs and what is actually included. The total is only the starting point."],
 ["03", "You get a clear answer", "We tell you where the quote stands. If we can beat it, you also get an alternative quote."],
];

const faqs: [string, string][] = [
 ["Is it free?", "Yes. The check is free, and there is no obligation to go any further."],
 ["Do I have to switch?", "No. If the quote you already have is the right one, stay with it. We will tell you when that is the case."],
 ["What areas do you cover?", "We work with homeowners across England, with a focus on the West Midlands. If the kitchen is further afield, send the quote anyway and we will say straight away if we can help."],
 ["How quickly will I hear back?", "By email, once we have read the quote properly. Most people hear back within a couple of working days."],
];

const faqSchema = {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: faqs.map(([name, text]) => ({
  "@type": "Question",
  name,
  acceptedAnswer: { "@type": "Answer", text },
 })),
};

export function meta() {
 return [
  { tagName: "link", rel: "canonical", href: "https://stonematch.co.uk/check-my-quote/" },
  { title },
  { name: "description", content: description },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:url", content: "https://stonematch.co.uk/check-my-quote/" },
 ];
}

export default function CheckMyQuote() {
 return <main className="landing">
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  <header className="landing-header"><div className="shell landing-nav"><Brand /><a className="landing-home" href="/">Back to StoneMatch</a></div></header>

  <section className="landing-hero"><div className="shell landing-intro">
   <p className="eyebrow">Free quote check</p>
   <h1>Got a worktop quote?<br/><em>Check it before you pay the deposit.</em></h1>
   <p className="lead">A free, no-obligation like-for-like check, so you know you're getting a fair price and the right spec.</p>
   <div className="hero-actions"><a className="button gold" href="#quote-check">Check my quote</a></div>
   <div className="trust"><span>Free</span><span>No obligation</span><span>Like for like</span></div>
  </div></section>

  <section className="section cream-band" aria-labelledby="what-we-check-heading"><div className="shell">
   <p className="eyebrow dark">Like for like</p>
   <h2 id="what-we-check-heading">What we check<br/><em>on the quote you hold.</em></h2>
   <p className="section-intro">Two quotes can name a similar colour and still describe different jobs. We read the specification, not just the total.</p>
   <p className="guide-further">Prefer to go through it yourself first? <a href="/guides/compare-worktop-quotes/">How to compare a worktop quote before you pay the deposit</a>.</p>
   <div className="check-grid">{checks.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}</div>
  </div></section>

  <section id="how" className="section light" aria-labelledby="how-heading"><div className="shell">
   <p className="eyebrow dark">How it works</p>
   <h2 id="how-heading">Three steps.<br/><em>Then a straight answer.</em></h2>
   <div className="steps">{steps.map(([n, heading, copy]) => <article className="step" key={n}><span>{n}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div>
   <p className="honest-line">If your current quote is already the best deal, we'll tell you.</p>
  </div></section>

  <section id="quote-check" className="section enquiry" aria-labelledby="send-quote-heading">
   <div className="shell enquiry-head"><p className="eyebrow dark">About two minutes</p><h2 id="send-quote-heading">Send the quote <em>you already hold.</em></h2><p>Name, email and the kitchen postcode are enough to start. Who quoted you, and the price, help if you have them handy.</p></div>
   <div className="shell"><QuoteCheckForm /></div>
  </section>

  <Reviews />

  <section className="section cream-band" id="case-studies" aria-labelledby="case-studies-heading"><div className="shell">
   <p className="eyebrow dark">Case studies</p>
   <h2 id="case-studies-heading">Real quote checks.<br/><em>Added when they're ready.</em></h2>
   <div className="case-slot" role="note">
    <strong>Placeholder — case studies to be added</strong>
    <p>When a homeowner is happy for us to share a quote check, it will go here. Nothing is filled in until then.</p>
   </div>
  </div></section>

  <section className="section light" aria-labelledby="faq-heading"><div className="shell narrow">
   <p className="eyebrow dark">Questions</p>
   <h2 id="faq-heading">Before you <em>send it.</em></h2>
   <div className="quote-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </div></section>

  <footer className="landing-footer"><div className="shell">
   <p>StoneMatch · <a href="mailto:enquiries@stonematch.co.uk">enquiries@stonematch.co.uk</a></p>
   <p><a href="/guides/compare-worktop-quotes/">Compare a quote before you pay</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/">StoneMatch home</a></p>
   <p className="legal-note">StoneMatch is a trading name of Deakin Surfaces Limited. Registered in England and Wales. Company number 17413451.</p>
  </div></footer>
 </main>;
}
