import fs from "fs";
import path from "path";

export interface ProjectMDXFrontmatter {
	title: string;
	description: string;
	date: string;
	category: string;
	techStack: string[];
	github?: string;
	demo?: string;
	image: string;
}

export interface ProjectMDX {
	slug: string;
	frontmatter: ProjectMDXFrontmatter;
	content: string;
}

const contentDirectory = path.join(process.cwd(), "content", "projects");

/**
 * Get all project slugs from the content directory
 * Used for generateStaticParams in dynamic routes
 */
export const getAllProjectSlugs = (): string[] => {
	if (!fs.existsSync(contentDirectory)) {
		return [];
	}

	const files = fs.readdirSync(contentDirectory);
	return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
};

/**
 * Get project MDX content by slug
 * Returns frontmatter and content separately
 */
export const getProjectBySlug = async (slug: string): Promise<ProjectMDX | null> => {
	const filePath = path.join(contentDirectory, `${slug}.mdx`);

	if (!fs.existsSync(filePath)) {
		return null;
	}

	const fileContent = fs.readFileSync(filePath, "utf8");

	// Extract frontmatter and content
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const match = frontmatterRegex.exec(fileContent);

	if (!match) {
		return null;
	}

	const frontmatterString = match[1];
	const content = match[2];

	// Parse frontmatter (simple YAML parser for basic key-value pairs)
	const frontmatter = parseFrontmatter(frontmatterString) as unknown as ProjectMDXFrontmatter;

	return {
		slug,
		frontmatter,
		content,
	};
};

/**
 * Get all projects with their frontmatter
 * Used for listing pages
 */
export const getAllProjects = async (): Promise<ProjectMDX[]> => {
	const slugs = getAllProjectSlugs();
	const projects = await Promise.all(slugs.map((slug) => getProjectBySlug(slug)));

	return projects.filter((project): project is ProjectMDX => project !== null);
};

/**
 * Simple frontmatter parser for YAML-like format
 * Handles strings, arrays, and basic values
 */
const parseFrontmatter = (frontmatterString: string): Record<string, unknown> => {
	const lines = frontmatterString.split("\n");
	const frontmatter: Record<string, unknown> = {};
	let currentKey: string | null = null;
	let arrayMode = false;
	const arrayValues: string[] = [];

	for (const line of lines) {
		const trimmed = line.trim();

		if (!trimmed) continue;

		// Array item
		if (trimmed.startsWith("- ")) {
			if (arrayMode && currentKey) {
				arrayValues.push(trimmed.substring(2).trim());
			}
			continue;
		}

		// Key-value pair
		const colonIndex = trimmed.indexOf(":");
		if (colonIndex > 0) {
			// Save previous array if exists
			if (arrayMode && currentKey) {
				frontmatter[currentKey] = arrayValues.slice();
				arrayValues.length = 0;
			}

			currentKey = trimmed.substring(0, colonIndex).trim();
			const value = trimmed.substring(colonIndex + 1).trim();

			if (value === "") {
				// Empty value indicates array follows
				arrayMode = true;
			} else {
				// Direct value
				arrayMode = false;
				// Remove quotes if present
				frontmatter[currentKey] = value.replace(/^["']|["']$/g, "");
			}
		}
	}

	// Save final array if exists
	if (arrayMode && currentKey) {
		frontmatter[currentKey] = arrayValues;
	}

	return frontmatter;
};
