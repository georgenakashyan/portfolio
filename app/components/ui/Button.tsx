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
		primary: [
			// Base
			"bg-gradient-primary text-content-primary font-bold",
			// Hover (glow + subtle scale)
			"hover:shadow-glow-primary hover:scale-[1.02]",
			// Active/pressed (reduced scale, dimmed)
			"active:scale-[0.98] active:brightness-90 active:shadow-glow-sm",
			// Transition (150ms per research - not 300ms)
			"transition-all duration-150",
			// Disabled (prevent all hover/active effects)
			"disabled:hover:shadow-none disabled:hover:scale-100 disabled:active:scale-100 disabled:active:brightness-100",
		].join(" "),

		secondary: [
			// Base (cyan accent)
			"bg-transparent border-2 border-accent-tertiary text-accent-tertiary font-semibold",
			// Hover (fill + glow)
			"hover:bg-accent-tertiary hover:text-content-primary hover:shadow-glow-tertiary hover:scale-[1.02]",
			// Active/pressed
			"active:scale-[0.98] active:brightness-90",
			// Transition
			"transition-all duration-150",
			// Disabled
			"disabled:hover:shadow-none disabled:hover:scale-100 disabled:hover:bg-transparent disabled:hover:text-accent-tertiary",
		].join(" "),
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
					className={`max-w-6 max-h-6 ${
						variant === "primary"
							? "[filter:invert(100%)_sepia(0%)_saturate(0%)_hue-rotate(321deg)_brightness(111%)_contrast(101%)]"
							: variant === "secondary"
							? "[filter:invert(74%)_sepia(61%)_saturate(2968%)_hue-rotate(146deg)_brightness(91%)_contrast(101%)] group-hover:[filter:brightness(0)_invert(1)] [transition:filter_150ms_ease-in-out]"
							: ""
					}`}
					width={24}
					height={24}
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
