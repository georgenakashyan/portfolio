"use client";

import React from "react";
import Button from "../ui/Button";
import { getAllSkills } from "@/lib/constants";

/**
 * Hero section with animated mesh gradient background
 * Features name/title display, CTAs, and tech stack marquee
 */
const Hero = () => {
	const skills = getAllSkills();
	const techStackText = skills.map((s) => s.name).join(" • ");

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated Mesh Gradient Background */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-br from-background-start via-primary-start/20 to-background-end"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-20 left-20 w-96 h-96 bg-primary-start/30 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-end/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-500"></div>
				</div>
			</div>

			{/* Content Container */}
			<div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 text-center">
				{/* Name with Gradient Text */}
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
					<span className="bg-gradient-primary bg-clip-text text-transparent">George Nakashyan</span>
				</h1>

				{/* Title */}
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text-primary mb-4">
					Full Stack Software Engineer
				</h2>

				{/* Tagline */}
				<p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
					Building scalable web applications with modern tech stacks
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
					<Button href="#projects" variant="primary" size="lg">
						View Projects
					</Button>
					<Button href="/George-Nakashyan-Resume.pdf" variant="secondary" size="lg" download target="_blank">
						Download Resume
					</Button>
				</div>

				{/* Tech Stack Marquee (Static for now, will animate in Phase 9) */}
				<div className="relative overflow-hidden py-8">
					<div className="flex gap-8 whitespace-nowrap text-text-secondary/60 text-sm font-mono">
						<span>{techStackText}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
