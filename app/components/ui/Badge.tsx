import React from "react";
import Image from "next/image";

export interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "primary" | "secondary" | "success";
	size?: "sm" | "md" | "lg";
	iconURL?: string;
	iconAlt?: string;
	className?: string;
}

/**
 * Badge component for tech stack pills and status indicators
 * Supports optional icons for technology badges
 */
const Badge = ({ children, variant = "default", size = "md", iconURL, iconAlt = "", className = "" }: BadgeProps) => {
	// Size classes
	const sizeClasses = {
		sm: "py-1 px-2 text-xs gap-1",
		md: "py-1.5 px-3 text-sm gap-1.5",
		lg: "py-2 px-4 text-base gap-2",
	};

	// Icon size based on badge size
	const iconSizes = {
		sm: { width: 12, height: 12 },
		md: { width: 16, height: 16 },
		lg: { width: 20, height: 20 },
	};

	// Variant classes using semantic tokens
	const variantClasses = {
		// Default badge with subtle glassmorphism
		default:
			"bg-surface-elevated/60 text-content-secondary border border-border backdrop-blur-sm " +
			"hover:bg-surface-elevated/80 hover:text-content-primary hover:border-border-strong " +
			"transition-all duration-150",

		// Primary badge with gradient and consistent glow
		primary:
			"bg-gradient-primary text-content-primary border border-accent-secondary/30 " +
			"hover:shadow-md hover:shadow-accent-primary/30 transition-all duration-150",

		// Secondary badge (cyan accent) with matching glow
		secondary:
			"bg-accent-tertiary/20 text-accent-tertiary border border-accent-tertiary/50 " +
			"hover:bg-accent-tertiary/30 hover:border-accent-tertiary " +
			"hover:shadow-md hover:shadow-accent-tertiary/30 transition-all duration-150",

		// Success badge with matching glow
		success:
			"bg-status-success/20 text-status-success border border-status-success/50 " +
			"hover:bg-status-success/30 hover:border-status-success " +
			"hover:shadow-md hover:shadow-status-success/30 transition-all duration-150",
	};

	const baseClasses = `rounded-full inline-flex items-center justify-center font-medium select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

	return (
		<span className={baseClasses}>
			{iconURL && (
				<Image
					src={iconURL}
					alt={iconAlt}
					width={iconSizes[size].width}
					height={iconSizes[size].height}
					className="flex-shrink-0"
				/>
			)}
			<span>{children}</span>
		</span>
	);
};

export default Badge;
