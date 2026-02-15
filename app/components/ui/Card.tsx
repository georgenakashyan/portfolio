import React from "react";

export interface CardProps {
	children: React.ReactNode;
	variant?: "default" | "hover" | "glow" | "flat";
	padding?: "none" | "sm" | "md" | "lg";
	className?: string;
	onClick?: () => void;
}

/**
 * Card component with glassmorphism effect and backdrop blur
 * Includes hover lift effect for interactive cards
 */
const Card = ({ children, variant = "default", padding = "md", className = "", onClick }: CardProps) => {
	// Padding classes
	const paddingClasses = {
		none: "p-0",
		sm: "p-4",
		md: "p-6",
		lg: "p-8",
	};

	// Variant classes using semantic tokens
	const variantClasses = {
		// Standard glassmorphism card with backdrop blur
		default:
			"bg-surface-elevated/40 backdrop-blur-lg border border-border shadow-raised",

		// Interactive card with hover lift effect
		hover:
			"bg-surface-elevated/40 backdrop-blur-lg border border-border shadow-raised " +
			"hover:bg-surface-elevated/60 hover:-translate-y-1 hover:shadow-overlay " +
			"hover:border-border-strong transition-all duration-200 cursor-pointer",

		// Interactive card with hover lift AND glow effect
		// Uses shadow-glow-card (depth + subtle colored glow combined)
		glow:
			"bg-surface-elevated/40 backdrop-blur-lg border border-border shadow-raised " +
			"hover:bg-surface-elevated/60 hover:-translate-y-1 hover:shadow-glow-card " +
			"hover:border-border-strong transition-all duration-200 cursor-pointer",

		// Flat card without glassmorphism
		flat: "bg-surface-raised border border-border-subtle",
	};

	const baseClasses = `rounded-3xl ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`;

	return (
		<div className={baseClasses} onClick={onClick}>
			{children}
		</div>
	);
};

export default Card;
