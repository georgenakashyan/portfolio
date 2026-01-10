import React from "react";
import { Metadata } from "next";
import PageTransition from "../components/layout/PageTransition";
import ProjectGrid from "../components/sections/ProjectGrid";

export const metadata: Metadata = {
	title: "Projects | George Nakashyan - Full Stack Developer Portfolio",
	description:
		"Explore my portfolio of full-stack web applications, research projects, and technical implementations showcasing React, Next.js, Firebase, Python, and more.",
};

/**
 * Projects listing page
 * Displays all projects in a 2x2 grid layout
 */
const ProjectsPage = () => {
	return (
		<PageTransition>
			<main className="min-h-screen pt-24 pb-12 px-6 md:px-12 lg:px-20">
				{/* Page Header */}
				<div className="container mx-auto mb-12 text-center">
					<h1 className="text-5xl md:text-6xl font-bold mb-6">
						<span className="bg-gradient-primary bg-clip-text text-transparent">My Projects</span>
					</h1>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
						A collection of full-stack applications, research projects, and technical implementations that
						showcase my expertise in modern web development, API integrations, and software engineering.
					</p>
				</div>

				{/* Projects Grid */}
				<ProjectGrid />
			</main>
		</PageTransition>
	);
};

export default ProjectsPage;
