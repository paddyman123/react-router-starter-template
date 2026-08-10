import type { Config } from "@react-router/dev/config";

export default {
	ssr: false,
	prerender: [
		"/",
		"/how-it-works",
		"/about",
		"/suppliers",
		"/privacy",
		"/terms",
	],
} satisfies Config;
