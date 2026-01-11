import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	href?: string;
	iconURL?: string;
	iconAlt?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	className?: string;
	download?: boolean;
	target?: "_blank" | "_self";
	rel?: string;
}

/**
 * Button component with gradient effects and icon support
 * Supports both button and link (anchor/Next.js Link) modes
 */
const Button = ({
	children,
	variant = "primary",
	size = "md",
	href,
	iconURL,
	iconAlt = "",
	onClick,
	type = "button",
	disabled = false,
	className = "",
	download,
	target,
	rel,
}: ButtonProps) => {
	// Size classes
	const sizeClasses = {
		sm: "py-1.5 px-3 text-sm",
		md: "py-2 px-4 text-base",
		lg: "py-3 px-6 text-lg",
	};

	// Variant classes
	const variantClasses = {
		primary:
			"bg-gradient-primary text-text-primary font-bold hover:shadow-lg hover:shadow-primary-start/50 hover:scale-105 transition-all duration-300",
		secondary:
			"bg-transparent border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-text-primary hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 transition-all duration-300",
	};

	// Base classes shared by all buttons
	const baseClasses = `group rounded-full select-none inline-flex items-center justify-center space-x-2 ${sizeClasses[size]} ${variantClasses[variant]} ${
		disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
	} ${className}`;

	// Content wrapper for icon + children
	const content = (
		<>
			{iconURL && (
				<Image
					src={iconURL}
					alt={iconAlt}
					className={`max-w-6 max-h-6 transition-all duration-300 ${
						variant === "secondary" ? "group-hover:brightness-0 group-hover:invert" : ""
					}`}
					width={24}
					height={24}
					style={
						variant === "primary"
							? {
									filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(321deg) brightness(111%) contrast(101%)",
							  }
							: variant === "secondary"
							? {
									filter: "invert(74%) sepia(61%) saturate(2968%) hue-rotate(146deg) brightness(91%) contrast(101%)",
							  }
							: undefined
					}
				/>
			)}
			<span>{children}</span>
		</>
	);

	// Link mode (external or Next.js Link)
	if (href && !disabled) {
		const isExternal = href.startsWith("http") || href.startsWith("mailto");

		if (isExternal) {
			return (
				<a
					href={href}
					className={baseClasses}
					download={download}
					target={target}
					rel={rel || (target === "_blank" ? "noreferrer noopener" : undefined)}
				>
					{content}
				</a>
			);
		}

		return (
			<Link href={href} className={baseClasses}>
				{content}
			</Link>
		);
	}

	// Button mode
	return (
		<button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
			{content}
		</button>
	);
};

export default Button;
