import { Experience } from "../types/experience";

export const experiences: Experience[] = [
	{
		company: "Softworld",
		position: "Full Stack Software Engineer",
		startDate: "March 2025",
		endDate: "Present",
		location: "Westbury, NY",
		description: [
			"Architected and maintained PostgreSQL database with 4 distinct schemas using Drizzle ORM, ensuring type-safe database operations across the entire application",
			"Implemented file-based access control system in Next.js, securing sensitive resources and managing user permissions at the route level",
			"Developed type-safe server actions with Zod validation, reducing runtime errors by 35% and improving data integrity across all API endpoints",
			"Collaborated with cross-functional teams to deliver enterprise-grade features on schedule while maintaining 100% test coverage",
		],
		tech: [
			"Next.js",
			"PostgreSQL",
			"Drizzle ORM",
			"Zod",
			"TypeScript",
			"Docker",
			"Tailwind CSS",
		],
	},
	{
		company: "Freelance",
		position: "Software Engineer",
		startDate: "May 2024",
		endDate: "Present",
		location: "Hicksville, NY",
		description: [
			"Partnered with clients to optimize web applications, resulting in 40% faster load times and improved user experience metrics",
			"Built full-stack applications using modern frameworks including Next.js and MERN stack, delivering scalable solutions tailored to client needs",
			"Integrated Stripe payment processing with 2.9% transaction fees, implementing secure checkout flows and subscription management",
			"Managed end-to-end project delivery from requirements gathering to deployment, maintaining consistent communication with stakeholders",
		],
		tech: [
			"Next.js",
			"React",
			"Node.js",
			"MongoDB",
			"Express.js",
			"Stripe",
			"Vercel",
			"TypeScript",
		],
	},
	{
		company: "Farmingdale State College",
		position: "Front End Development Intern",
		startDate: "August 2023",
		endDate: "December 2023",
		location: "Farmingdale, NY",
		description: [
			"Reduced onboarding training time by 30% through development of intuitive user interfaces and comprehensive documentation",
			"Improved user experience metrics by 40% by implementing responsive design patterns and accessibility best practices",
			"Developed SQL-based staff directory system, enabling efficient search and filtering of employee information across departments",
		],
		tech: ["React", "JavaScript", "SQL", "HTML", "CSS", "Git"],
	},
];

export const getCurrentExperience = (): Experience | undefined => {
	return experiences.find((exp) => exp.endDate === "Present");
};

export const getAllExperiences = (): Experience[] => {
	return experiences;
};
