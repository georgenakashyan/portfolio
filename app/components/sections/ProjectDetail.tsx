"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { ProjectMDXFrontmatter } from "@/lib/utils/mdx";

export interface ProjectDetailProps {
	frontmatter: ProjectMDXFrontmatter;
	children: React.ReactNode;
}

/**
 * ProjectDetail is a case study template component
 * Displays project header with metadata and renders MDX content
 */
const ProjectDetail = ({ frontmatter, children }: ProjectDetailProps) => {
	const { title, description, date, category, techStack, github, demo, image } = frontmatter;

	return (
		<article className="py-12">
			<div className="container mx-auto max-w-5xl px-6">
				{/* Back Button */}
				<Link
					href="/projects"
					className="inline-flex items-center text-text-secondary hover:text-primary-start transition-colors duration-200 mb-8 group"
				>
					<span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
					<span className="ml-2">Back to Projects</span>
				</Link>

				{/* Project Header */}
				<header className="mb-12">
					<div className="flex flex-wrap items-center gap-3 mb-4">
						{category && <Badge variant="secondary">{category}</Badge>}
						<span className="text-text-secondary text-sm">{date}</span>
					</div>

					<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
						{title}
					</h1>

					<p className="text-xl text-text-secondary leading-relaxed mb-8">{description}</p>

					{/* Action Buttons */}
					<div className="flex flex-wrap gap-4 mb-8">
						{github && (
							<Button variant="primary" size="md" href={github} target="_blank" rel="noopener noreferrer">
								View on GitHub
							</Button>
						)}
						{demo && (
							<Button variant="secondary" size="md" href={demo} target="_blank" rel="noopener noreferrer">
								Live Demo
							</Button>
						)}
					</div>

					{/* Tech Stack */}
					<div className="mb-8">
						<h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
							Tech Stack
						</h3>
						<div className="flex flex-wrap gap-2">
							{techStack.map((tech) => (
								<Badge key={tech} variant="default">
									{tech}
								</Badge>
							))}
						</div>
					</div>
				</header>

				{/* Featured Image */}
				{image && (
					<Card variant="flat" padding="none" className="mb-12 overflow-hidden">
						<div className="relative w-full h-[400px] md:h-[500px]">
							<Image src={image} alt={title} fill className="object-cover" />
						</div>
					</Card>
				)}

				{/* MDX Content */}
				<Card variant="default" padding="lg">
					<div className="mdx-content">{children}</div>
				</Card>
			</div>
		</article>
	);
};

export default ProjectDetail;
