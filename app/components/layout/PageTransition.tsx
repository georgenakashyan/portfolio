"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

interface PageTransitionProps {
	children: React.ReactNode;
}

/**
 * Page transition wrapper using Framer Motion
 * Provides smooth fade animations between page transitions
 */
const PageTransition = ({ children }: PageTransitionProps) => {
	const pathname = usePathname();
	const shouldReduceMotion = useReducedMotion();

	return (
		<AnimatePresence
			mode='wait'
			initial={false}
		>
			<motion.div
				key={pathname}
				initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
				transition={{
					duration: shouldReduceMotion ? 0 : 0.3,
					ease: "easeInOut",
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default PageTransition;
