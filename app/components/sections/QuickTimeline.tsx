"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getAllExperiences } from "@/lib/constants";
import Card from "../ui/Card";
import {
	fadeUpVariants,
	reducedFadeVariants,
	staggerContainerVariants,
	staggerItemVariants,
	reducedContainerVariants,
	reducedItemVariants,
} from "@/app/components/animation/variants";

/**
 * QuickTimeline section displays a horizontal company timeline
 * Shows career progression through companies and positions
 */
const QuickTimeline = () => {
	const shouldReduceMotion = useReducedMotion();
	const experiences = getAllExperiences();

	return (
		<section className='py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent to-card-bg/20'>
			<div className='container mx-auto'>
				{/* Section Header */}
				<motion.div
					className='mb-12 text-center'
					variants={shouldReduceMotion ? reducedFadeVariants : fadeUpVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
				>
					<h2 className='text-4xl md:text-5xl font-bold mb-4'>
						<span className='bg-gradient-primary bg-clip-text text-transparent'>
							Experience Timeline
						</span>
					</h2>
					<p className='text-lg text-text-secondary max-w-2xl mx-auto'>
						My professional journey building scalable applications
						and delivering impactful solutions
					</p>
				</motion.div>

				{/* Timeline - Horizontal on larger screens, vertical on mobile */}
				<div className='relative md:pt-12'>
					{/* Timeline Line */}
					<div className='hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-primary'></div>

					{/* Timeline Items */}
					<motion.div
						className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 md:mt-8'
						variants={shouldReduceMotion ? reducedContainerVariants : staggerContainerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1 }}
					>
						{experiences.map((experience, index) => (
							<motion.div
								key={`${experience.company}-${index}`}
								className='relative'
								variants={shouldReduceMotion ? reducedItemVariants : staggerItemVariants}
							>
								{/* Timeline Dot */}
								<div className='hidden md:flex absolute -top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-primary rounded-full border-4 border-background-start z-10 shadow-lg shadow-primary-start/50'></div>

								{/* Experience Card */}
								<Card
									variant='hover'
									padding='md'
									className='h-full cursor-default'
								>
									<div className='text-center'>
										{/* Date Range */}
										<div className='text-sm font-mono text-secondary mb-3'>
											{experience.startDate} -{" "}
											{experience.endDate}
										</div>

										{/* Company Name */}
										<h3 className='text-xl font-bold text-text-primary mb-2'>
											{experience.company}
										</h3>

										{/* Position */}
										<p className='text-text-secondary text-sm mb-4'>
											{experience.position}
										</p>

										{/* Location */}
										<p className='text-text-secondary/60 text-xs mb-4'>
											{experience.location}
										</p>

										{/* Key Achievement (First bullet point) */}
										<p className='text-text-secondary text-sm italic line-clamp-2'>
											"{experience.description[0]}"
										</p>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* View Full Experience Link */}
				<div className='mt-12 text-center'>
					<a
						href='/experience'
						className='inline-flex items-center text-text-primary hover:text-primary-start transition-colors duration-300 font-semibold text-lg group'
					>
						View Full Experience
						<span className='ml-2 group-hover:translate-x-1 transition-transform duration-300'>
							→
						</span>
					</a>
				</div>
			</div>
		</section>
	);
};

export default QuickTimeline;
