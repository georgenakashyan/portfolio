/**
 * Design System Color Tokens
 * Based on Portfolio Redesign Architecture (2026-01-09)
 */

export const colors = {
	// Background gradient: #0a0e27 → #0f172a
	background: {
		start: "#0a0e27",
		end: "#0f172a",
		gradient: "linear-gradient(to bottom right, #0a0e27, #0f172a)",
	},

	// Primary accent gradient: #3b82f6 → #8b5cf6
	primary: {
		start: "#3b82f6",
		end: "#8b5cf6",
		gradient: "linear-gradient(to right, #3b82f6, #8b5cf6)",
	},

	// Secondary accent (cyan)
	secondary: "#06b6d4",

	// Text colors
	text: {
		primary: "#f1f5f9",
		secondary: "#cbd5e1",
	},

	// Card background
	card: {
		bg: "#1e293b",
	},

	// Success color
	success: "#10b981",
} as const;

export type ColorSystem = typeof colors;
