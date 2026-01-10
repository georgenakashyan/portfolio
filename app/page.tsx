import Hero from "./components/sections/Hero";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import QuickTimeline from "./components/sections/QuickTimeline";
import StatsBar from "./components/sections/StatsBar";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Hero />
			<StatsBar />
			<FeaturedProjects />
			<QuickTimeline />
		</div>
	);
}
