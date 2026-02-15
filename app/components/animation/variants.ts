import type { Variants } from "framer-motion";

/**
 * Centralized animation variants for Framer Motion
 * All variants are typed and organized by use case
 * Reduced motion variants use 0.01ms duration (not 0) for reliable cross-browser support
 */

// =============================================================================
// Section Reveal Variants
// =============================================================================

/**
 * Standard section reveal with fade + slide up
 * Use with whileInView for scroll-triggered animations
 */
export const fadeUpVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

/**
 * Reduced motion section reveal - opacity only
 */
export const reducedFadeVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.01 },
	},
};

// =============================================================================
// Stagger Animation Variants
// =============================================================================

/**
 * Container for staggered children animations
 * Use on parent element with whileInView
 */
export const staggerContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

/**
 * Individual staggered item with fade + slide up
 * Use on child elements within stagger container
 */
export const staggerItemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4, ease: "easeOut" },
	},
};

/**
 * Reduced motion container - instant reveal
 */
export const reducedContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.01 },
	},
};

/**
 * Reduced motion item - inherits from container
 */
export const reducedItemVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

// =============================================================================
// Page Transition Variants
// =============================================================================

/**
 * Page transition with fade + vertical slide
 * Use with AnimatePresence for route changes
 */
export const pageTransitionVariants: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

/**
 * Reduced motion page transition - opacity only
 */
export const reducedPageTransitionVariants: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};
