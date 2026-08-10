import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "StoneMatch | The right stone. The right supplier. The right price." },
		{ name: "description", content: "Tell StoneMatch about your project and we'll match you with the right stone and reputable local suppliers, then help you secure the best combination of product, service and price." },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home() {
	return <Welcome message="" />;
}
