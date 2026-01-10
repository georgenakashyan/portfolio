import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageTransition from "../../components/layout/PageTransition";
import ProjectDetail from "../../components/sections/ProjectDetail";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/utils/mdx";

interface ProjectPageProps {
	params: Promise<{
		slug: string;
	}>;
}

/**
 * Generate static params for all project slugs
 * This enables static site generation for all project pages
 */
export async function generateStaticParams() {
	const slugs = getAllProjectSlugs();

	return slugs.map((slug) => ({
		slug,
	}));
}

/**
 * Generate metadata for each project page
 * Used for SEO and social media sharing
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		return {
			title: "Project Not Found",
		};
	}

	return {
		title: `${project.frontmatter.title} | George Nakashyan Portfolio`,
		description: project.frontmatter.description,
	};
}

/**
 * Dynamic project detail page
 * Renders MDX content with custom components
 */
const ProjectPage = async ({ params }: ProjectPageProps) => {
	const { slug } = await params;
	const project = await getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return (
		<PageTransition>
			<main className="min-h-screen pt-24 pb-12">
				<ProjectDetail frontmatter={project.frontmatter}>
					<MDXRemote source={project.content} />
				</ProjectDetail>
			</main>
		</PageTransition>
	);
};

export default ProjectPage;
