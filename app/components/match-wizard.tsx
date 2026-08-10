import { useMemo, useState } from "react";

type MatchData = {
	postcode: string;
	projectType: string;
	material: string;
	style: string;
	budget: string;
	timescale: string;
	measurements: string;
	existingQuote: string;
	name: string;
	email: string;
	phone: string;
	bestTime: string;
	notes: string;
};

const initialData: MatchData = {
	postcode: "",
	projectType: "Kitchen worktops",
	material: "Not sure yet",
	style: "",
	budget: "",
	timescale: "",
	measurements: "",
	existingQuote: "",
	name: "",
	email: "",
	phone: "",
	bestTime: "",
	notes: "",
};

const steps = ["Project", "Stone", "Budget", "Details", "Contact"];

export function MatchWizard() {
	const [step, setStep] = useState(0);
	const [data, setData] = useState<MatchData>(initialData);
	const [submitted, setSubmitted] = useState(false);

	const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);
	const update = (field: keyof MatchData, value: string) => setData((current) => ({ ...current, [field]: value }));

	function next() {
		setStep((current) => Math.min(current + 1, steps.length - 1));
		window.requestAnimationFrame(() => document.getElementById("match-wizard")?.scrollIntoView({ behavior: "smooth", block: "start" }));
	}

	function back() {
		setStep((current) => Math.max(current - 1, 0));
	}

	function submit() {
		const subject = encodeURIComponent(`New StoneMatch enquiry - ${data.postcode || "postcode pending"}`);
		const body = encodeURIComponent([
			`Name: ${data.name}`,
			`Email: ${data.email}`,
			`Phone: ${data.phone}`,
			`Best time to call: ${data.bestTime}`,
			`Postcode: ${data.postcode}`,
			`Project: ${data.projectType}`,
			`Material: ${data.material}`,
			`Style / colour: ${data.style}`,
			`Budget: ${data.budget}`,
			`Timescale: ${data.timescale}`,
			`Measurements / plans: ${data.measurements}`,
			`Existing quote: ${data.existingQuote}`,
			`Other notes: ${data.notes}`,
		].join("\n"));
		setSubmitted(true);
		window.location.href = `mailto:enquiries@stonematch.co.uk?subject=${subject}&body=${body}`;
	}

	if (submitted) {
		return <div className="wizard-success"><span className="eyebrow dark">You're matched in</span><h3>Thanks, {data.name || "we've got it"}.</h3><p>Your email app should now open with your project details ready to send. Once received, StoneMatch can review the brief and contact you to fill in any gaps before approaching suitable suppliers.</p><button className="text-link" onClick={() => { setSubmitted(false); setStep(0); }}>Start another enquiry →</button></div>;
	}

	return <div id="match-wizard" className="wizard">
		<div className="wizard-top"><div><span>Step {step + 1} of {steps.length}</span><strong>{steps[step]}</strong></div><div className="wizard-progress"><i style={{ width: `${progress}%` }} /></div></div>

		{step === 0 && <section className="wizard-step"><p className="eyebrow dark">Let's start with the basics</p><h3>Where is the project, and what are you working on?</h3><p className="wizard-copy">Once I know the location and type of project, I can start narrowing down the right suppliers rather than sending your details everywhere.</p><div className="form-row"><label>Project postcode<input value={data.postcode} onChange={(e) => update("postcode", e.target.value)} placeholder="e.g. B68 8AB" /></label><label>Project type<select value={data.projectType} onChange={(e) => update("projectType", e.target.value)}><option>Kitchen worktops</option><option>Utility room</option><option>Bathroom / vanity</option><option>Outdoor kitchen</option><option>Commercial project</option><option>Other</option></select></label></div></section>}

		{step === 1 && <section className="wizard-step"><p className="eyebrow dark">Now the stone</p><h3>Do you already know what you want?</h3><p className="wizard-copy">If you do, great. If not, choose “Not sure yet” and we can work from the look you want and the budget you have.</p><label>Preferred material<select value={data.material} onChange={(e) => update("material", e.target.value)}><option>Not sure yet</option><option>Quartz</option><option>Porcelain</option><option>Granite</option><option>Sintered stone</option><option>Natural stone</option></select></label><label>Colour, style or inspiration<textarea rows={4} value={data.style} onChange={(e) => update("style", e.target.value)} placeholder="For example: warm white with gold veining, Taj Mahal look, dark dramatic stone, concrete effect..." /></label></section>}

		{step === 2 && <section className="wizard-step"><p className="eyebrow dark">Let's make the search relevant</p><h3>What matters most: budget, timescale, or both?</h3><p className="wizard-copy">There is no advantage in matching you with products or suppliers that don't fit the real brief.</p><div className="form-row"><label>Approximate budget<select value={data.budget} onChange={(e) => update("budget", e.target.value)}><option value="">Choose a range</option><option>Under £1,500</option><option>£1,500 – £2,500</option><option>£2,500 – £4,000</option><option>£4,000 – £6,000</option><option>£6,000+</option><option>Not sure</option></select></label><label>When do you need it?<select value={data.timescale} onChange={(e) => update("timescale", e.target.value)}><option value="">Choose timescale</option><option>ASAP</option><option>Within 2 weeks</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option><option>Just researching</option></select></label></div></section>}

		{step === 3 && <section className="wizard-step"><p className="eyebrow dark">Anything that gives us an advantage</p><h3>What should I know before I start matching?</h3><p className="wizard-copy">Plans, approximate sizes and existing quotations can all help me compare like-for-like and spot where a better option may exist.</p><label>Measurements or plan details<textarea rows={3} value={data.measurements} onChange={(e) => update("measurements", e.target.value)} placeholder="Paste approximate dimensions or tell us what plans you have available." /></label><label>Have you already received a quotation?<textarea rows={3} value={data.existingQuote} onChange={(e) => update("existingQuote", e.target.value)} placeholder="Supplier, material and approximate price if you know it." /></label><label>Anything else I should know?<textarea rows={3} value={data.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Special edges, waterfall ends, splashbacks, access restrictions, preferred brands, etc." /></label></section>}

		{step === 4 && <section className="wizard-step"><p className="eyebrow dark">Last step</p><h3>What's the best way to speak about your project?</h3><p className="wizard-copy">A quick conversation normally saves a lot of back-and-forth and gives me a better chance of matching the right supplier first time.</p><div className="form-row"><label>Your name<input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="First and last name" /></label><label>Email<input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" /></label></div><div className="form-row"><label>Phone<input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Best contact number" /></label><label>Good time to call<input value={data.bestTime} onChange={(e) => update("bestTime", e.target.value)} placeholder="e.g. Tomorrow after 4pm" /></label></div><div className="review-box"><strong>Your StoneMatch brief</strong><span>{data.postcode || "Postcode pending"} · {data.projectType}</span><span>{data.material} · {data.budget || "Budget to discuss"} · {data.timescale || "Timescale to discuss"}</span></div></section>}

		<div className="wizard-actions">{step > 0 ? <button type="button" className="wizard-back" onClick={back}>← Back</button> : <span />}{step < steps.length - 1 ? <button type="button" className="button gold" onClick={next}>Continue →</button> : <button type="button" className="button gold" onClick={submit}>Send my project →</button>}</div>
		<p className="wizard-note">No obligation. Your project details are used to understand the brief and identify suitable StoneMatch options.</p>
	</div>;
}
