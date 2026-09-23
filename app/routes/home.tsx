import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "StoneMatch | Save Money on Quartz, Porcelain & Stone Worktops" },
		{ name: "description", content: "StoneMatch helps homeowners save money on quartz, porcelain, granite and marble worktops by comparing better-value supply, fabrication and installation routes." },
	];
}

export default function Home() {
	return <Welcome message="" />;
}
