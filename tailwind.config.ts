import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary_dark: "var(--gn-primary-dark)",
				primary: "var(--gn-primary)",
				secondary: "var(--gn-secondary)",
				secondary_light: "var(--gn-secondary-light)",
				link: "var(--gn-link)",
				text_primary: "var(--gn-text-primary)",
				text_secondary: "var(--gn-text-secondary)",
			},
		},
	},
	plugins: [],
} satisfies Config;
