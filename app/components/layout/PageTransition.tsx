"use client";

import { AnimatePresence, motion } from "framer-motion";
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

	return (
		<AnimatePresence
			mode='wait'
			initial={false}
		>
			<motion.div
				key={pathname}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default PageTransition;
