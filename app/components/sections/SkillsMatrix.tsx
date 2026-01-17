"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Badge from "../ui/Badge";
import { getCategorizedSkills } from "@/lib/constants";
import {
	fadeUpVariants,
	reducedFadeVariants,
	staggerContainerVariants,
	staggerItemVariants,
	reducedContainerVariants,
	reducedItemVariants,
} from "@/app/components/animation/variants";

/**
 * SkillsMatrix section displays skills grouped by category
 * Uses Badge components for each skill with gradient text for categories
 */
const SkillsMatrix = () => {
	const shouldReduceMotion = useReducedMotion();
	const skillsByCategory = getCategorizedSkills();

	return (
		<section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent to-card-bg/20">
			<div className="container mx-auto max-w-6xl">
				{/* Section Header */}
				<motion.div
					className="mb-16 text-center"
					variants={shouldReduceMotion ? reducedFadeVariants : fadeUpVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						<span className="bg-gradient-primary bg-clip-text text-transparent">Skills & Technologies</span>
					</h2>
					<p className="text-lg text-text-secondary max-w-2xl mx-auto">
						Technical expertise across the full stack
					</p>
				</motion.div>

				{/* Skills Grid */}
				<motion.div
					className="space-y-12"
					variants={shouldReduceMotion ? reducedContainerVariants : staggerContainerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{skillsByCategory.map((categoryData) => (
						<motion.div
							key={categoryData.category}
							variants={shouldReduceMotion ? reducedItemVariants : staggerItemVariants}
						>
							{/* Category Header */}
							<h3 className="text-2xl font-bold mb-6">
								<span className="bg-gradient-primary bg-clip-text text-transparent">
									{categoryData.category}
								</span>
							</h3>

							{/* Skills Grid - Responsive layout */}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
								{categoryData.skills.map((skill) => (
									<Badge key={skill} variant="default" size="md">
										{skill}
									</Badge>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default SkillsMatrix;
