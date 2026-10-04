import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
	return [{tagName:"link",rel:"canonical",href:"https://stonematch.co.uk/"},
		{ title: "Stone Worktop Quote Comparison | Quartz & Natural Stone | StoneMatch" },
		{ name: "description", content: "Compare stone worktop quotes with StoneMatch. Explore Quartz, Porcelain, Granite and Marble, and compare suitable fabrication and installation options for your kitchen." },
	];
}

export default function Home() {
	return <Welcome message="" />;
}
