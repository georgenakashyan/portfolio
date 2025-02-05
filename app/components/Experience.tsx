interface ExperienceProps {
	startDate: string;
	endDate: string;
	position: string;
	company: string;
	location: string;
	description: string[];
}

const Experience = ({
	startDate,
	endDate,
	position,
	company,
	location,
	description,
}: ExperienceProps) => {
	return (
		<div className='flex xl:flex-row flex-col xl:-m-6 xl:p-6 xl:space-x-10 border border-background rounded-3xl hover:bg-opacity-5 hover:bg-slate-200 transition'>
			<div className='text-sm pt-1 min-w-fit text-text_secondary'>
				{startDate} — {endDate}
			</div>
			<div className='flex-grow'>
				<p className='text-xl font-semibold'>{position}</p>
				<p className='text-lg'>{company}</p>
				<p className='text-md'>{location}</p>
				<ul className='list-disc pl-5 pt-2 text-text_secondary'>
					{description.map((bullet, index) => (
						<li
							key={index}
							className='text-sm text-text_secondary'
						>
							{bullet}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Experience;
