import type { Route } from "./+types/home";
import { localBusinessSchema } from "../lib/local-business";
import { Welcome } from "../welcome/welcome";

const title = "Check Your Worktop Quote Before You Pay a Deposit | StoneMatch";
const description = "An independent, free, no-deposit like-for-like check of your quartz, porcelain or stone worktop quote. StoneMatch looks at the specification before you pay a deposit.";

export function meta({}: Route.MetaArgs) {
	return [{tagName:"link",rel:"canonical",href:"https://stonematch.co.uk/"},
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: "https://stonematch.co.uk/" },
	];
}

export default function Home() {
	return <>
		<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
		<Welcome message="" />
	</>;
}
