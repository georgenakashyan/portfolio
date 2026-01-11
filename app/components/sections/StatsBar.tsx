"use client";

import Card from "../ui/Card";

/**
 * StatsBar section displays key statistics and achievements
 * Features 4 prominent metrics: GPA, Research Publications, Technical Projects, and Years of Experience
 */
const StatsBar = () => {
	const stats = [
		{
			label: "Years of Experience",
			value: "2+",
			description: "Software Engineering",
			icon: "⚡",
		},
		{
			label: "GPA",
			value: "3.9",
			description: "Summa Cum Laude",
			icon: "🎓",
		},
		{
			label: "Projects",
			value: "10+",
			description: "Personal and Professional",
			icon: "💻",
		},
		{
			label: "Publication",
			value: "1",
			description: "Research Papers",
			icon: "📊",
		},
	];

	return (
		<section className='py-20 px-6 md:px-12 lg:px-20'>
			<div className='container mx-auto'>
				{/* Stats Grid */}
				<div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
					{stats.map((stat) => (
						<Card
							key={stat.label}
							variant='hover'
							padding='lg'
							className='text-center group cursor-default'
						>
							{/* Icon */}
							<div className='text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>
								{stat.icon}
							</div>

							{/* Value */}
							<div className='text-4xl md:text-5xl font-bold mb-2'>
								<span className='bg-gradient-primary bg-clip-text text-transparent'>
									{stat.value}
								</span>
							</div>

							{/* Label */}
							<div className='text-text-primary font-semibold text-lg mb-1'>
								{stat.label}
							</div>

							{/* Description */}
							<div className='text-text-secondary text-sm'>
								{stat.description}
							</div>
						</Card>
					))}
				</div>

				{/* Additional Context */}
				<div className='mt-12 text-center'>
					<p className='text-text-secondary text-lg max-w-3xl mx-auto'>
						Graduated with{" "}
						<span className='text-text-primary font-semibold'>
							Academic Excellence Award
						</span>{" "}
						and{" "}
						<span className='text-text-primary font-semibold'>
							Summa Cum Laude honors
						</span>{" "}
						from Farmingdale State College
					</p>
				</div>
			</div>
		</section>
	);
};

export default StatsBar;
