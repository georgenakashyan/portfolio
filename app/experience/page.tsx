import { Metadata } from "next";
import ExperienceTimeline from "../components/sections/ExperienceTimeline";
import SkillsMatrix from "../components/sections/SkillsMatrix";

export const metadata: Metadata = {
	title: "Experience | George Nakashyan - Full Stack Software Engineer",
	description:
		"Explore my professional experience as a Full Stack Software Engineer, including roles at Softworld, freelance projects, and internships. View my technical skills across frontend, backend, and databases.",
	keywords: [
		"software engineer experience",
		"full stack developer",
		"Next.js developer",
		"PostgreSQL",
		"React developer",
		"work history",
	],
};

export default function ExperiencePage() {
	return (
		<div className="min-h-screen">
			<ExperienceTimeline />
			<SkillsMatrix />
		</div>
	);
}
