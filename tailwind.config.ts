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
				"background-start": "var(--background-start)",
				"background-end": "var(--background-end)",
				"primary-start": "var(--primary-start)",
				"primary-end": "var(--primary-end)",
				secondary: "var(--secondary)",
				"text-primary": "var(--text-primary)",
				"text-secondary": "var(--text-secondary)",
				"card-bg": "var(--card-bg)",
				success: "var(--success)",
			},
			backgroundImage: {
				"gradient-bg": "linear-gradient(to bottom right, var(--background-start), var(--background-end))",
				"gradient-primary": "linear-gradient(to right, var(--primary-start), var(--primary-end))",
			},
			fontFamily: {
				sans: ["var(--font-inter)", "sans-serif"],
				mono: ["var(--font-jetbrains-mono)", "monospace"],
			},
		},
	},
	plugins: [],
} satisfies Config;
