import React from "react";

export interface CardProps {
	children: React.ReactNode;
	variant?: "default" | "hover" | "flat";
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

	// Variant classes
	const variantClasses = {
		// Standard glassmorphism card with backdrop blur
		default: "bg-card-bg/40 backdrop-blur-lg border border-white/10",
		// Interactive card with hover lift effect
		hover: "bg-card-bg/40 backdrop-blur-lg border border-white/10 hover:bg-card-bg/60 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-start/20 transition-all duration-300 cursor-pointer",
		// Flat card without glassmorphism
		flat: "bg-card-bg border border-white/5",
	};

	const baseClasses = `rounded-3xl ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`;

	return (
		<div className={baseClasses} onClick={onClick}>
			{children}
		</div>
	);
};

export default Card;
