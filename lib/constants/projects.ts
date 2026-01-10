import { Project } from "../types/project";

export const projects: Project[] = [
	{
		title: "ParkingPal",
		slug: "parking-pal",
		description:
			"Real-time parking reservation application enabling users to find and reserve parking spots instantly using live location tracking and interactive maps.",
		techStack: [
			"React",
			"Firebase",
			"Google Maps API",
			"Firestore",
			"JavaScript",
			"CSS",
		],
		image: "/images/projects/parking-pal.png",
		github: "https://github.com/georgenakashyan/ParkingPal",
		demo: "https://parkingpal.georgenakashyan.com",
		featured: true,
		category: "Full Stack",
	},
	{
		title: "DebtCollector Bot",
		slug: "debt-collector-bot",
		description:
			"Discord bot for financial tracking and debt management among friends, featuring automated reminders, transaction history, and real-time balance updates.",
		techStack: [
			"Node.js",
			"Discord.js",
			"MongoDB",
			"JavaScript",
			"Express.js",
		],
		image: "/images/projects/debt-collector-bot.png",
		github: "https://github.com/georgenakashyan/DebtCollectorBot",
		demo: "https://discord.com/oauth2/authorize?client_id=1403163880032829470",
		featured: true,
		category: "Backend",
	},
	{
		title: "Prisoner's Dilemma Simulation",
		slug: "prisoners-dilemma",
		description:
			"Academic research project simulating game theory strategies on graph networks. Published with IEEE and ACM for the ASONAM 2023 conference proceedings with novel insights on cooperative behavior patterns.",
		techStack: ["Python", "NetworkX", "Matplotlib", "NumPy", "Pandas"],
		image: "/images/projects/prisoners-dilemma.jpeg",
		github: "https://github.com/georgenakashyan/prisoners-dilemma",
		featured: true,
		category: "Research",
	},
	{
		title: "Enterprise Web Application",
		slug: "enterprise-web-app",
		description:
			"Production-grade enterprise application built at Softworld, featuring multi-schema PostgreSQL database, file-based access control, and type-safe server actions with comprehensive validation.",
		techStack: [
			"Next.js",
			"PostgreSQL",
			"Drizzle ORM",
			"Zod",
			"Docker",
			"TypeScript",
			"Tailwind CSS",
		],
		image: "/projects/enterprise-app.png",
		featured: true,
		category: "Full Stack",
	},
];

export const getFeaturedProjects = (): Project[] => {
	return projects.filter((project) => project.featured);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
	return projects.find((project) => project.slug === slug);
};
