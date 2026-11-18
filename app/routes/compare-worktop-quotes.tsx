import { useState } from "react";
import { GuideMetadata } from "../components/guide-metadata";
import { GuideNavigation } from "../components/guide-navigation";
import { Page } from "../components/site-shell";

const canonical = "https://stonematch.co.uk/guides/compare-worktop-quotes/";
const title = "Compare a Worktop Quote Before You Pay the Deposit | StoneMatch";
const description = "A plain guide for UK homeowners comparing quartz and porcelain worktop quotes. Check the specification, deposit, templating, warranty and timing before you commit.";
const headline = "How to compare a worktop quote before you pay the deposit";

const jumps: [string, string][] = [
 ["Like-for-like", "#like-for-like"],
 ["What to check", "#what-to-check"],
 ["Deposits", "#deposits"],
 ["After templating", "#template-changes"],
 ["Warranties", "#warranties"],
 ["Timescales", "#timescales"],
 ["Red flags", "#red-flags"],
 ["Checklist", "#checklist"],
 ["Questions", "#questions"],
];

const steps: [string, string, string][] = [
 ["01", "Write down what each quote includes", "Put the quotes side by side. Note the material, the work listed, and anything described as extra or left out."],
 ["02", "Match the specification", "Brand and colour, thickness, edge, cut-outs, upstands and splashbacks. If an item is on one quote and missing from the other, ask for it in writing."],
 ["03", "Read the terms that change the commitment", "The deposit, what happens after templating, who holds the warranty, and the template-to-fit time."],
 ["04", "Compare the totals once the jobs match", "When both quotes describe the same work, the numbers are worth comparing. Until then, you are looking at two different jobs."],
];

const checks: [string, string][] = [
 ["Material brand and colour", "The brand and the exact colour name should be written down, along with the finish: polished, matt or textured. “White quartz” or “marble-effect porcelain” is not a specification. Colours that look alike on a small sample can be different products, with different slab sizes and different warranties."],
 ["Thickness: 20mm or 30mm", "Quartz is commonly quoted at 20mm or 30mm. They are different jobs. A slimmer top changes the proportions of the kitchen; a thicker one looks more substantial and can change how the edge is made. Porcelain is often thinner, and the edge is sometimes built up so it looks deeper. Confirm the thickness of the slab itself, and whether any deeper edge is a solid piece or a built-up detail. A quote that does not state the thickness is not ready to compare."],
 ["Edge profile", "A square or lightly eased edge and a shaped profile, such as bullnose or ogee, are different amounts of work. Ask which profile is included, and whether it applies to every visible edge or only the front. If one quote includes a shaped edge and the other a plain one, they are not the same job."],
 ["Cut-outs", "List every opening: sink, hob, drainer grooves, tap holes, and any socket or pop-up waste cut-out. Note how the sink sits — undermount, inset or top-mount — because that changes the finishing around the hole. “Cut-outs included”, with no list, is not enough. An extra hob cut-out or a set of drainer grooves added later is a change to the job."],
 ["Upstands and splashbacks", "An upstand is a low strip of stone at the back of the worktop. A splashback is a taller piece, sometimes full height behind the hob or along a run. They use more material and more fixing. Check the height, the length, and whether they are included at all. A quote with no splashback is not like-for-like with one that includes a full stone splashback."],
 ["Templating", "Templating is the site measure, taken once the cabinets are in their final place. The worktops are cut from that measure, not from the plan. Ask who comes to measure, whether the visit is included, and whether you can confirm the drawing before the stone is cut. A price based only on a plan, with templating still to arrange, is not the same as a quote that includes the measure."],
 ["Delivery and fitting", "Confirm that both delivery and fitting are in the price, and who does the fitting. Supply only means you still need someone to carry the stone in and fit it. Stone is heavy and easy to damage on stairs and tight turns, so ask what access the quote assumes."],
 ["Removal of the old worktops", "Taking the old tops out is often its own line, and sometimes it is not mentioned. Ask whether removal is included, what happens to the old tops, and whether the quote assumes the units are already clear. A top that is tiled in or stuck down is a different job from lifting a loose laminate top. Say which you have."],
 ["Making good", "Making good is the tidying after the old top comes off and the new one goes on: filling, touching up plinths, adjusting doors, and leaving the units ready for the sink and hob to be reconnected. Many worktop quotes stop at the stone. Ask what the fitter will and will not do, and who reconnects the sink, the taps and the hob."],
];

const flags: [string, string][] = [
 ["A vague specification", "“Quartz worktop, fitted”, with no brand, no colour, no thickness and no edge. Ask for those four things in writing before you compare it with anything else."],
 ["No written inclusions", "The price is a single line, and templating, delivery, fitting, removal and making good are not mentioned either way. Silence is not the same as included."],
 ["Pressure to pay quickly", "A deposit asked for on the spot, or a warning that the price disappears today, before you have had time to read what it covers."],
 ["No answer after templating", "If nobody can say whether the price can change once the kitchen is measured, you do not yet know what you are agreeing to."],
 ["A warranty that is only a word", "“Fully guaranteed”, with no split between the material and the fitting, and no one named to call."],
 ["Dates that are only a feeling", "“Soon”, or “a few weeks”, with nothing written about the template-to-fit time or what happens if the kitchen is not ready."],
];

const checklist = [
 "Brand, colour and finish are written down",
 "Thickness is stated, including any built-up edge",
 "Edge profile is named, and which edges it applies to",
 "Sink, hob, drainer grooves and tap holes are listed",
 "Upstands and splashbacks: height, length, and whether they are included",
 "Templating is included, and you can confirm the drawing before cutting",
 "Delivery and fitting are included, and you know who fits",
 "Removal of the old worktops is included, or clearly excluded",
 "Making good is described: what the fitter will and will not do",
 "Deposit: the amount, when it is paid, whether it is refundable, and what it reserves",
 "Whether the price can change after templating, and when you will see a revised figure",
 "Material warranty and fitting warranty, separately, and who you call",
 "Template-to-fit time, and what happens if a date slips",
];

const faqs: [string, string][] = [
 ["Can I compare a kitchen retailer quote with a factory-direct fabricator quote?", "Yes, once you can see the worktop specification and what labour is included in each. A single line inside a kitchen price and a fabricator's worktop schedule are comparable only after the same items are listed on both."],
 ["Should I pay a deposit before the kitchen is templated?", "Only if the written quote tells you the amount, when it is paid, whether it is refundable, and what it reserves. If the cabinets are not in their final place, ask whether the measure — and the price — will be confirmed later."],
 ["Can the price change after templating?", "It can. Templating is when the real sizes and details are taken. Ask beforehand what would change the price, and make sure you see any revised figure before the stone is cut."],
 ["Who do I call if something goes wrong?", "Ask this before you pay. The stone manufacturer and the firm that templated and fitted the worktop cover different things. Get both warranties in writing, and the name of the firm you contact first."],
 ["What if the quote does not name the brand or the thickness?", "Treat it as unfinished. Similar-looking quartz and porcelain colours are not the same product, and 20mm and 30mm are different jobs. Ask for the brand, colour, finish and thickness in writing before you compare it with another quote."],
];

const schema = {
 "@context": "https://schema.org",
 "@graph": [
  {
   "@type": "HowTo",
   name: headline,
   description: "How a UK homeowner can compare quartz or porcelain worktop quotes, including a kitchen retailer quote and a factory-direct fabricator quote, before paying a deposit.",
   inLanguage: "en-GB",
   step: steps.map(([, name, text], index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name,
    text,
   })),
  },
  {
   "@type": "FAQPage",
   mainEntity: faqs.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
   })),
  },
 ],
};

function QuoteChecklist() {
 const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");
 const text = ["Worktop quote checklist", "Tick these off on both quotes before you compare the totals.", ...checklist.map((item, index) => `${index + 1}. ${item}`)].join("\n");

 async function copy() {
  try {
   await navigator.clipboard.writeText(text);
   setStatus("copied");
  } catch {
   setStatus("manual");
  }
 }

 return <div className="quote-checklist" id="checklist">
  <h3>Worktop quote checklist</h3>
  <p>Tick these off on both quotes before you compare the totals.</p>
  <ol>{checklist.map((item) => <li key={item}>{item}</li>)}</ol>
  <div className="quote-checklist-actions no-print">
   <button type="button" className="button gold" onClick={copy}>{status === "copied" ? "Copied" : "Copy checklist"}</button>
   <button type="button" className="button quiet" onClick={() => window.print()}>Print checklist</button>
   <span aria-live="polite">{status === "copied" ? "Checklist copied." : status === "manual" ? "Select the list and copy it." : ""}</span>
  </div>
 </div>;
}

export function meta() {
 return [
  { tagName: "link", rel: "canonical", href: canonical },
  { title },
  { name: "description", content: description },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:url", content: canonical },
 ];
}

export default function CompareWorktopQuotes() {
 return <Page>
  <div className="quote-guide">
   <GuideMetadata title={headline} canonical={canonical} />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

   <section className="page-hero">
    <div className="shell narrow">
     <p className="eyebrow">StoneMatch buying guide</p>
     <h1>How to compare a worktop quote<br /><em>before you pay the deposit.</em></h1>
     <p className="lead">Two quotes can look far apart and still not be the same job. This is a practical way to line them up — quartz or porcelain, from a kitchen retailer or a factory-direct fabricator — before you hand any money over.</p>
     <div className="hero-actions">
      <a className="button gold" href="#checklist">Jump to the checklist</a>
      <a className="text-link" href="#what-to-check">See what to compare</a>
     </div>
    </div>
   </section>

   <section className="section light" id="like-for-like" aria-labelledby="like-for-like-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">Start here</p>
     <h2 id="like-for-like-heading">Why like-for-like<br /><em>matters.</em></h2>
     <div className="guide-prose">
      <p>A kitchen retailer quote and a factory-direct fabricator quote can both be fair. They are often written differently. The retailer price may be one line inside a whole kitchen. The fabricator price may be a worktop schedule, with templating and fitting listed on their own. Sometimes one of them is supply only. Sometimes removal of the old tops, or making good afterwards, sits with someone else.</p>
      <p>The gap between the two totals only means something once both quotes cover the same material, the same details and the same labour. Until then, you are comparing different jobs. Line them up item by item. Where one quote is silent, ask for that item in writing, then compare the totals again.</p>
      <p>The notes below are written for quartz and porcelain, which is what most of these quotes are for. The same questions apply to granite and marble, with the extra step of checking the exact slab.</p>
     </div>
     <nav className="guide-jumps" aria-label="On this page">
      {jumps.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
     </nav>
     <div className="guide-steps">
      {steps.map(([number, heading, copy]) => <article key={number}><span>{number}</span><h3>{heading}</h3><p>{copy}</p></article>)}
     </div>
    </div>
   </section>

   <section className="section cream-band" id="what-to-check" aria-labelledby="what-to-check-heading">
    <div className="shell">
     <p className="eyebrow dark">The specification</p>
     <h2 id="what-to-check-heading">What to check<br /><em>before the totals mean anything.</em></h2>
     <p className="section-intro">Read each quote for these items. If one of them is missing, the price is not finished yet.</p>
     <div className="guide-points">
      {checks.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}
     </div>
     <p className="guide-further">More detail, if you want it: <a href="/guides/20mm-vs-30mm-quartz-worktops/">20mm and 30mm quartz</a>, <a href="/guides/worktop-edge-profiles/">edge profiles</a>, <a href="/guides/sink-cut-outs-drainer-grooves/">sink cut-outs and drainer grooves</a>, <a href="/guides/worktop-upstands-vs-splashbacks/">upstands and splashbacks</a>, <a href="/guides/kitchen-worktop-templating/">templating</a>.</p>
    </div>
   </section>

   <section className="section light" id="deposits" aria-labelledby="deposits-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">Before any money moves</p>
     <h2 id="deposits-heading">The deposit.<br /><em>Read it before you pay it.</em></h2>
     <div className="guide-prose">
      <p>A deposit usually reserves a place in the workshop and, often, the slab in your colour. It is a commitment, so four things should be in writing before you pay it.</p>
      <p><strong>How much.</strong> The amount should be a figure on the quote, not a number offered in conversation on the day. If it is not written down, it is not agreed.</p>
      <p><strong>When it is paid.</strong> Some firms ask for it to book the template. Others ask once you accept the quote, and again before fitting. Write down each stage, and what has to have happened before the next payment is due.</p>
      <p><strong>Whether it is refundable.</strong> Ask what happens if you cancel before templating, after templating, and after the stone has been cut. A deposit you can have back before the slab is ordered is a different commitment from one you cannot. Get the answer on the quote or in an email.</p>
      <p><strong>What you get for it.</strong> It should buy something specific: a reserved slot, the slab ordered in your colour, or the template visit booked. If you cannot say what the payment is for, ask before you send it.</p>
      <p>Pay against a written quote that names the material, the work included, and these deposit terms. Keep a copy.</p>
     </div>
    </div>
   </section>

   <section className="section cream-band" id="template-changes" aria-labelledby="template-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">After the measure</p>
     <h2 id="template-heading">The price can change<br /><em>once the kitchen is templated.</em></h2>
     <div className="guide-prose">
      <p>A price taken from a plan is a working figure until the kitchen is measured. Templating often changes the sizes. A run is a little longer, an island is a little deeper, a wall is out of square, or a sink position moves.</p>
      <p>Ask, before you pay a deposit, whether the price can change after templating, and what would cause a change. Fair reasons include a longer run that needs more material, an extra cut-out that was not on the plan, a different edge, or a splashback added later. A small difference on a straight run does not always change the price. A change that needs another slab, or a detail that was never quoted, usually does.</p>
      <p>You should see any revised figure before the stone is cut, and you should be able to accept it or query it. A quote that says the price holds only if the template matches the plan is being straight with you. A quote that says nothing about this is the one to question.</p>
      <p>If the cabinets are not fitted, or the sink and hob are not chosen, say so. Measuring a kitchen that is still moving is how a price drifts.</p>
     </div>
    </div>
   </section>

   <section className="section light" id="warranties" aria-labelledby="warranty-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">If something goes wrong</p>
     <h2 id="warranty-heading">Two warranties.<br /><em>They cover different things.</em></h2>
     <div className="guide-prose">
      <p>The stone manufacturer covers the material, within the limits of that brand's warranty. The cover depends on the product and the finish, and it usually expects you to follow the care instructions supplied with it. It does not automatically cover a chip from fitting, a poor joint, or a cut-out in the wrong place.</p>
      <p>The fabricator or fitter covers the work: the template, the cutting, the joints, the edges they polished, and the fitting. If a joint opens, a cut-out is wrong, or a piece is damaged while it is being fitted, that is a conversation with the firm that made and fitted it.</p>
      <p>Ask for both in writing. How long each lasts, what is excluded, and who you call. Impact, heat and stains are the kinds of things many material warranties leave out, so read the wording for your brand rather than assuming. “Fully guaranteed” is not a warranty. A name, a period, and a description of what is covered is.</p>
      <p>If a kitchen retailer sold the job and a separate fabricator fitted it, ask who you contact first. You want one firm that will answer, and a written note of who is responsible for the material and who is responsible for the fitting.</p>
     </div>
    </div>
   </section>

   <section className="section cream-band" id="timescales" aria-labelledby="timescales-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">Dates</p>
     <h2 id="timescales-heading">Template to fit.<br /><em>And what happens if a date slips.</em></h2>
     <div className="guide-prose">
      <p>Ask for the template-to-fit time in working days, and what that time assumes. A clear sequence looks like this: the deposit is paid and the slab is reserved, the cabinets are finished and the appliances are chosen, someone templates, you confirm the drawing, the workshop cuts the stone, then it is delivered and fitted. The gap between template and fit is the part to pin down. That is when the kitchen is without a worktop.</p>
      <p>Ask what happens if a date slips. A colour can be delayed leaving the factory. A template can move because the units were not ready. Fitting can move because the workshop is full. None of that is unusual. What matters is whether you are told when the date moves, and whether the reason is explained rather than left until the day before.</p>
      <p>Get the sequence in writing: when they need the kitchen ready, how much notice they give for the template, how long after template they aim to fit, and how they will tell you if that changes. If a plumber or an electrician is booked around the fit, a slipped date is their problem too, so the notice matters.</p>
     </div>
    </div>
   </section>

   <section className="section light" id="red-flags" aria-labelledby="red-flags-heading">
    <div className="shell">
     <p className="eyebrow dark">Pause, and ask</p>
     <h2 id="red-flags-heading">Red flags,<br /><em>kept general.</em></h2>
     <p className="section-intro">None of these proves a firm is careless. They are reasons to slow down and ask for the missing detail in writing before you pay. A careful firm will put the specification, the inclusions, the deposit terms and the timing in writing without being chased.</p>
     <div className="check-grid">
      {flags.map(([heading, copy]) => <article key={heading}><h3>{heading}</h3><p>{copy}</p></article>)}
     </div>
    </div>
   </section>

   <section className="section cream-band" aria-labelledby="checklist-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">One page</p>
     <h2 id="checklist-heading">A checklist<br /><em>you can copy or print.</em></h2>
     <p className="section-intro">Use the same list on every quote. If a line is missing, ask for it in writing before you compare the totals.</p>
     <QuoteChecklist />
    </div>
   </section>

   <section className="section light" id="questions" aria-labelledby="faq-heading">
    <div className="shell narrow">
     <p className="eyebrow dark">Questions</p>
     <h2 id="faq-heading">Before you<br /><em>pay the deposit.</em></h2>
     <div className="quote-faq">
      {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
     </div>
    </div>
   </section>

   <GuideNavigation />

   <section className="section dark-section" aria-labelledby="second-look-heading">
    <div className="shell split">
     <div>
      <p className="eyebrow">Free quote check</p>
      <h2 id="second-look-heading">Want a second pair of eyes?</h2>
     </div>
     <div className="reason-copy">
      <p><a href="/check-my-quote/">We'll check your quote like-for-like for free.</a></p>
      <p>If your quote is already the best deal, we'll tell you.</p>
      <a className="button gold" href="/check-my-quote/">Check my quote</a>
     </div>
    </div>
   </section>
  </div>
 </Page>;
}
