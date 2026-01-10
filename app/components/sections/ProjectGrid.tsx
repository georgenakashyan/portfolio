"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { projects } from "@/lib/constants";

/**
 * ProjectGrid displays all projects in a 2x2 grid layout
 * Used on the /projects listing page
 */
const ProjectGrid = () => {
	return (
		<section className="py-12">
			<div className="container mx-auto">
				{/* Projects Grid - 2x2 on desktop, 1 column on mobile */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{projects.map((project) => (
						<Link key={project.slug} href={`/projects/${project.slug}`} className="group block h-full">
							<Card variant="hover" padding="none" className="h-full overflow-hidden">
								{/* Project Image */}
								<div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary-start/20 to-primary-end/20">
									{project.image && (
										<Image
											src={project.image}
											alt={project.title}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-110"
										/>
									)}

									{/* Tech Stack Overlay - Reveals on Hover */}
									<div className="absolute inset-0 bg-gradient-to-t from-card-bg via-card-bg/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
										<div className="flex flex-wrap gap-2">
											{project.techStack.slice(0, 5).map((tech) => (
												<Badge key={tech} variant="primary" size="sm">
													{tech}
												</Badge>
											))}
											{project.techStack.length > 5 && (
												<Badge variant="default" size="sm">
													+{project.techStack.length - 5}
												</Badge>
											)}
										</div>
									</div>
								</div>

								{/* Project Info */}
								<div className="p-6">
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-2xl font-bold text-text-primary group-hover:bg-gradient-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
											{project.title}
										</h3>
										{project.category && (
											<Badge variant="secondary" size="sm">
												{project.category}
											</Badge>
										)}
									</div>
									<p className="text-text-secondary text-base leading-relaxed line-clamp-3">
										{project.description}
									</p>

									{/* Links */}
									<div className="flex items-center gap-4 mt-4">
										{project.github && (
											<span className="text-sm text-primary-start hover:text-primary-end transition-colors duration-200">
												View on GitHub →
											</span>
										)}
										{project.demo && (
											<span className="text-sm text-primary-start hover:text-primary-end transition-colors duration-200">
												Live Demo →
											</span>
										)}
									</div>
								</div>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectGrid;
