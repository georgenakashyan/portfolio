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

	// Variant classes
	const variantClasses = {
		default:
			"bg-card-bg/60 text-text-secondary border border-white/10 backdrop-blur-sm hover:bg-card-bg/80 hover:text-text-primary hover:border-white/20 transition-all duration-200",
		primary:
			"bg-gradient-primary text-text-primary border border-primary-end/30 hover:shadow-md hover:shadow-primary-start/30 transition-all duration-200",
		secondary:
			"bg-secondary/20 text-secondary border border-secondary/50 hover:bg-secondary/30 hover:border-secondary transition-all duration-200",
		success:
			"bg-success/20 text-success border border-success/50 hover:bg-success/30 hover:border-success transition-all duration-200",
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
