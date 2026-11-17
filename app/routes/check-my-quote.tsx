import { QuoteCheckForm } from "../components/quote-check-form";
import { Brand } from "../components/site-shell";
import { localBusinessSchema } from "../lib/local-business";

const title = "Check My Worktop Quote | Free, No Deposit | StoneMatch";
const description = "Already hold a quartz, porcelain or stone worktop quote? Send it to StoneMatch for an independent, free, no-deposit like-for-like check before you pay a deposit.";

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

const points = [
 ["Like for like", "We read the specification, not just the total. Thickness, edges, cut-outs, splashbacks and fitting all count."],
 ["Free, and no deposit", "The check costs nothing. You don't pay StoneMatch a deposit to hear whether the quote holds up."],
 ["A straight answer", "If a stronger route exists, we'll show the difference. If your quote is already fair, we'll tell you."],
];

export default function CheckMyQuote() {
 return <main className="landing">
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
  <header className="landing-header"><div className="shell landing-nav"><Brand /><a className="landing-home" href="/">Back to StoneMatch</a></div></header>
  <section className="landing-hero"><div className="shell landing-intro">
   <p className="eyebrow">Independent quote check</p>
   <h1>Check your quote<br/><em>before you pay a deposit.</em></h1>
   <p className="lead">You've already been given a price. Before it turns into a deposit, let an independent pair of eyes compare it like for like. Free. No deposit to us. No obligation.</p>
   <ul className="landing-points">{points.map(([heading, copy]) => <li key={heading}><strong>{heading}</strong><span>{copy}</span></li>)}</ul>
  </div></section>
  <section className="section enquiry" aria-labelledby="send-quote-heading">
   <div className="shell enquiry-head"><p className="eyebrow dark">Two short steps</p><h2 id="send-quote-heading">Send the quote <em>you already hold.</em></h2><p>This page is for people with a quote in hand. No brochure. No detour. Just the check.</p></div>
   <div className="shell"><QuoteCheckForm /></div>
  </section>
  <footer className="landing-footer"><div className="shell">
   <p>StoneMatch · enquiries@stonematch.co.uk</p>
   <p><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
   <p className="legal-note">StoneMatch is a trading name of Deakin Surfaces Limited. Registered in England and Wales. Company number 17413451.</p>
  </div></footer>
 </main>;
}
