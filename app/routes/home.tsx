import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "StoneMatch | Check Your Worktop Quote Before You Buy" },
		{ name: "description", content: "Already have a kitchen worktop quote? StoneMatch helps homeowners check the material, specification, supplier and price before committing — or find suitable worktop options from scratch." },
	];
}

export default function Home() {
	return <Welcome message="" />;
}
