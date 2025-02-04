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
		<div className='grid grid-cols-10 grid-rows-1 -m-6 p-6 space-x-10 border border-background rounded-3xl hover:bg-opacity-5 hover:bg-slate-200 transition'>
			<div className='col-span-3 text-sm pt-1 min-w-fit text-text_secondary'>
				{startDate} — {endDate}
			</div>
			<div className='col-span-7'>
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
