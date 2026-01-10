"use client";

import React from "react";
import Badge from "../ui/Badge";
import { getCategorizedSkills } from "@/lib/constants";

/**
 * SkillsMatrix section displays skills grouped by category
 * Uses Badge components for each skill with gradient text for categories
 */
const SkillsMatrix = () => {
	const skillsByCategory = getCategorizedSkills();

	return (
		<section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent to-card-bg/20">
			<div className="container mx-auto max-w-6xl">
				{/* Section Header */}
				<div className="mb-16 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						<span className="bg-gradient-primary bg-clip-text text-transparent">Skills & Technologies</span>
					</h2>
					<p className="text-lg text-text-secondary max-w-2xl mx-auto">
						Technical expertise across the full stack
					</p>
				</div>

				{/* Skills Grid */}
				<div className="space-y-12">
					{skillsByCategory.map((categoryData) => (
						<div key={categoryData.category}>
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
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SkillsMatrix;
