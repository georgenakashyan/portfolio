"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { getFeaturedProjects } from "@/lib/constants";
import {
	fadeUpVariants,
	reducedFadeVariants,
	staggerContainerVariants,
	staggerItemVariants,
	reducedContainerVariants,
	reducedItemVariants,
} from "@/app/components/animation/variants";

/**
 * FeaturedProjects section displays the top 3 featured projects
 * Each card reveals tech stack overlay on hover
 */
const FeaturedProjects = () => {
	const shouldReduceMotion = useReducedMotion();
	const featuredProjects = getFeaturedProjects().slice(0, 3);

	return (
		<section id="projects" className="py-20 px-6 md:px-12 lg:px-20">
			<div className="container mx-auto">
				{/* Section Header */}
				<motion.div
					className="mb-12 text-center"
					variants={shouldReduceMotion ? reducedFadeVariants : fadeUpVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						<span className="bg-gradient-primary bg-clip-text text-transparent">Featured Projects</span>
					</h2>
					<p className="text-lg text-text-secondary max-w-2xl mx-auto">
						A selection of my best work showcasing full-stack development, API integrations, and research
						projects
					</p>
				</motion.div>

				{/* Projects Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					variants={shouldReduceMotion ? reducedContainerVariants : staggerContainerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{featuredProjects.map((project) => (
						<motion.div
							key={project.slug}
							variants={shouldReduceMotion ? reducedItemVariants : staggerItemVariants}
						>
							<Link
								href={`/projects/${project.slug}`}
								className="group block h-full"
							>
								<Card variant="hover" padding="none" className="h-full overflow-hidden">
									{/* Project Image */}
									<div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary-start/20 to-primary-end/20">
										{project.image && (
											<Image
												src={project.image}
												alt={project.title}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										)}

										{/* Tech Stack Overlay - Reveals on Hover */}
										<div className="absolute inset-0 bg-gradient-to-t from-card-bg via-card-bg/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
											<div className="flex flex-wrap gap-2">
												{project.techStack.slice(0, 4).map((tech) => (
													<Badge key={tech} variant="primary" size="sm">
														{tech}
													</Badge>
												))}
												{project.techStack.length > 4 && (
													<Badge variant="default" size="sm">
														+{project.techStack.length - 4}
													</Badge>
												)}
											</div>
										</div>
									</div>

									{/* Project Info */}
									<div className="p-6">
										<h3 className="text-xl font-bold text-text-primary mb-2 group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
											{project.title}
										</h3>
										<p className="text-text-secondary text-sm mb-4 line-clamp-3">
											{project.description}
										</p>

										{/* Category Badge */}
										{project.category && (
											<Badge variant="secondary" size="sm">
												{project.category}
											</Badge>
										)}
									</div>
								</Card>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* View All Projects Link */}
				<div className="mt-12 text-center">
					<Link
						href="/projects"
						className="inline-flex items-center text-text-primary hover:text-primary-start transition-colors duration-300 font-semibold text-lg group"
					>
						View All Projects
						<span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProjects;
