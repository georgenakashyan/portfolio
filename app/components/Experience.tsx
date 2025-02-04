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
		<div className='grid grid-cols-10 grid-rows-1 space-x-10 pb-4'>
			<div className='col-span-3 text-sm pt-1 min-w-fit text-text_secondary'>
				{startDate} — {endDate}
			</div>
			<div className='col-span-7'>
				<p className='text-lg font-semibold'>{position}</p>
				<p className='text-md'>{company}</p>
				<ul className='list-disc pl-5 pt-2'>
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
