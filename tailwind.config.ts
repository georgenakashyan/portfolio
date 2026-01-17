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
				// NEW: Semantic surface colors
				surface: {
					base: "var(--surface-base)",
					elevated: "var(--surface-elevated)",
					raised: "var(--surface-raised)",
					sunken: "var(--surface-sunken)",
					overlay: "var(--surface-overlay)",
				},
				// NEW: Semantic content/text colors
				content: {
					primary: "var(--text-primary)",
					secondary: "var(--text-secondary)",
					muted: "var(--text-muted)",
				},
				// NEW: Semantic accent colors
				accent: {
					primary: "var(--accent-primary)",
					secondary: "var(--accent-secondary)",
					tertiary: "var(--accent-tertiary)",
				},
				// NEW: Status colors
				status: {
					success: "var(--status-success)",
					error: "var(--status-error)",
				},
				// NEW: Border colors
				border: {
					subtle: "var(--border-subtle)",
					DEFAULT: "var(--border-default)",
					strong: "var(--border-strong)",
				},

				// LEGACY: Keep existing tokens during migration
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
				// Use semantic gradient tokens
				"gradient-bg":
					"linear-gradient(to bottom right, var(--gradient-surface-from), var(--gradient-surface-to))",
				"gradient-primary":
					"linear-gradient(to right, var(--gradient-primary-from), var(--gradient-primary-to))",
			},
			boxShadow: {
				raised: "var(--shadow-raised)",
				overlay: "var(--shadow-overlay)",
			},
			fontFamily: {
				sans: ["var(--font-inter)", "sans-serif"],
				mono: ["var(--font-jetbrains-mono)", "monospace"],
			},
		},
	},
	plugins: [],
} satisfies Config;
