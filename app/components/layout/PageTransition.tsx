"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React, { useContext, useEffect, useRef } from "react";
import {
	pageTransitionVariants,
	reducedPageTransitionVariants,
} from "../animation/variants";

interface PageTransitionProps {
	children: React.ReactNode;
}

/**
 * Hook to track previous value across renders
 * Used by FrozenRouter to maintain context during exit animations
 */
function usePreviousValue<T>(value: T): T | undefined {
	const prevValue = useRef<T>();
	useEffect(() => {
		prevValue.current = value;
		return () => {
			prevValue.current = undefined;
		};
	});
	return prevValue.current;
}

/**
 * FrozenRouter prevents premature context updates during exit animations
 * Freezes the router context when segment changes, allowing exit animation to complete
 * before the new route's context takes over
 */
function FrozenRouter({ children }: { children: React.ReactNode }) {
	const context = useContext(LayoutRouterContext);
	const prevContext = usePreviousValue(context) || null;
	const segment = useSelectedLayoutSegment();
	const prevSegment = usePreviousValue(segment);

	// Detect actual segment change (not initial render)
	const changed =
		segment !== prevSegment &&
		segment !== undefined &&
		prevSegment !== undefined;

	return (
		<LayoutRouterContext.Provider value={changed ? prevContext : context}>
			{children}
		</LayoutRouterContext.Provider>
	);
}

/**
 * Page transition wrapper using Framer Motion
 * Provides smooth fade animations between page transitions
 *
 * Uses FrozenRouter pattern to fix hydration animation replay bug:
 * - useSelectedLayoutSegment instead of usePathname for stable keys
 * - FrozenRouter freezes context during exit animations
 * - initial={false} prevents animation on initial page load
 */
const PageTransition = ({ children }: PageTransitionProps) => {
	const segment = useSelectedLayoutSegment();
	const shouldReduceMotion = useReducedMotion();

	const variants = shouldReduceMotion
		? reducedPageTransitionVariants
		: pageTransitionVariants;

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={segment}
				variants={variants}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{
					duration: shouldReduceMotion ? 0.01 : 0.3,
					ease: "easeInOut",
				}}
			>
				<FrozenRouter>{children}</FrozenRouter>
			</motion.div>
		</AnimatePresence>
	);
};

export default PageTransition;
