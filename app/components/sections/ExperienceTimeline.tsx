"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Experience from "../Experience";
import { getAllExperiences } from "@/lib/constants";
import {
	fadeUpVariants,
	reducedFadeVariants,
	staggerContainerVariants,
	staggerItemVariants,
	reducedContainerVariants,
	reducedItemVariants,
} from "@/app/components/animation/variants";

/**
 * ExperienceTimeline section displays work experiences in a vertical timeline format
 * Reuses the existing Experience component with timeline visual elements
 */
const ExperienceTimeline = () => {
	const shouldReduceMotion = useReducedMotion();
	const experiences = getAllExperiences();

	return (
		<section className="py-20 px-6 md:px-12 lg:px-20">
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
						<span className="bg-gradient-primary bg-clip-text text-transparent">Work Experience</span>
					</h2>
					<p className="text-lg text-text-secondary max-w-2xl mx-auto">
						My professional journey building impactful software solutions
					</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative">
					{/* Timeline Line with Gradient */}
					<div className="absolute left-0 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-start via-primary-end to-transparent"></div>

					{/* Timeline Items */}
					<motion.div
						className="space-y-12"
						variants={shouldReduceMotion ? reducedContainerVariants : staggerContainerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						{experiences.map((experience, index) => (
							<motion.div
								key={`${experience.company}-${index}`}
								className="relative pl-8 md:pl-24"
								variants={shouldReduceMotion ? reducedItemVariants : staggerItemVariants}
							>
								{/* Timeline Dot */}
								<div className="absolute left-0 md:left-8 top-8 transform -translate-x-1/2 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background-start shadow-lg shadow-primary-start/50 z-10"></div>

								{/* Experience Component */}
								<Experience
									startDate={experience.startDate}
									endDate={experience.endDate}
									position={experience.position}
									company={experience.company}
									location={experience.location}
									description={experience.description}
								/>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default ExperienceTimeline;
