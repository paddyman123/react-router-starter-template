import { Page } from "../components/site-shell";

export function meta() {
 return [
  { title: "Check my quote | StoneMatch" },
  { name: "description", content: "Send StoneMatch the worktop quote you already hold. This address now continues to the quote check." },
  { name: "robots", content: "noindex" },
  { tagName: "link", rel: "canonical", href: "https://stonematch.co.uk/check-my-quote/" },
  { httpEquiv: "refresh", content: "0;url=/check-my-quote/" },
 ];
}

export default function PaidQuoteCheck() {
 return <Page>
  <section className="page-hero">
   <div className="shell narrow">
    <p className="eyebrow">Quote check</p>
    <h1>Continue to the<br/><em>quote check.</em></h1>
    <p className="lead">This address now opens the quote check. It asks for your name, email and project postcode.</p>
    <a className="button gold" href="/check-my-quote/">Check my quote →</a>
   </div>
  </section>
 </Page>;
}
