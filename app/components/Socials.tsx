import Image from "next/image";

const Socials = () => {
	return (
		<div className='flex flex-1 flex-row ml-1 space-x-6'>
			<a href='https://www.linkedin.com/in/george-nakashyan/'>
				<Image
					src='./assets/linkedin_icon.svg'
					alt='View my LinkedIn'
					className='max-w-14 max-y-14'
					width={35}
					height={35}
					style={{
						filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(321deg) brightness(111%) contrast(101%)",
					}}
				/>
			</a>
			<a href='https://github.com/georgenakashyan'>
				<Image
					src='./assets/github_icon.svg'
					alt='View my GitHub'
					className='max-w-14 max-y-14'
					width={35}
					height={35}
					style={{
						filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(321deg) brightness(111%) contrast(101%)",
					}}
				/>
			</a>
			<a href={`mailto:${process.env.myEmail}`}>
				<Image
					src='./assets/email_icon.svg'
					alt='Email me'
					className='max-w-14 max-y-14'
					width={35}
					height={35}
					style={{
						filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(321deg) brightness(111%) contrast(101%)",
					}}
				/>
			</a>
		</div>
	);
};

export default Socials;
