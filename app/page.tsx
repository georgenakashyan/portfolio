import Experience from "./components/Experience";
import MainButton from "./components/MainButton";
import Socials from "./components/Socials";

export default function Home() {
	return (
		<div className='xl:mx-[15%] lg:mx-[10%] mx-[5%] flex xl:flex-row flex-col max-h-full text-text_primary'>
			<header className='xl:sticky xl:top-0 flex xl:w-[50%] flex-col justify-between py-24'>
				<div className='xl:min-h-full xl:space-y-3 xl:pr-[20%] pr-[0%] min-w-full'>
					<h1 className='font-semibold text-5xl'>George Nakashyan</h1>
					<h2 className='font-semibold text-2xl'>
						Full Stack Software Engineer
					</h2>
					<h3 className='text-lg !mt-0'>Based in New York</h3>

					<div className='p-[2%]'></div>

					<div className='text-text_secondary space-y-3 text-xl'>
						<div>
							I'm a Full Stack Software Engineer with a Bachelor's
							in Computer Science. I graduated with Summa Cum
							Laude honors and the Academic Excellence Award. I am
							currently doing freelance while open to work
							positions.
						</div>
						<div>
							I have experience building full stack web
							applications using Next.js and the MERN stack, as
							well as creating analytic graph simulations in
							Python with NetworkX and Matplotlib.
						</div>
					</div>

					<div className='p-[2%]'></div>

					<div className='flex space-x-[5%]'>
						<MainButton
							href='./George-Nakashyan-Resume.pdf'
							iconURL='./assets/eye_icon.svg'
						>
							View Resume
						</MainButton>
						<MainButton
							href='./George-Nakashyan-Resume.pdf'
							iconURL='./assets/download_icon.svg'
							download={true}
						>
							Download Resume
						</MainButton>
					</div>

					<div className='p-[10%]'></div>

					<Socials />
				</div>
			</header>
			<main className='pt-24 xl:w-[50%] xl:py-24 space-y-10'>
				<section className='space-y-4'>
					<h1 className='font-semibold text-3xl space-y-10'>
						Work Experience
					</h1>
					<Experience
						startDate='MAY 2024'
						endDate='PRESENT'
						position='Full Stack Software Engineer'
						company='Freelance'
						location='Hicksville, NY'
						description={[
							"Partnered with clients to optimize websites through tailored tech solutions.",
							"Decreased product development time by utilizing full stack frameworks such as Next.js.",
							"Reduced processing costs to 2.9% by integrating the Stripe API.",
						]}
					></Experience>
					<Experience
						startDate='AUG 2023'
						endDate='DEC 2023'
						position='Front End Software Engineering Intern'
						company='SUNY Farmingdale'
						location='Farmingdale, NY'
						description={[
							"Cut new staff training time by 30% with a reactive webpage for training materials.",
							"Designed reactive web elements, improving reported UX by 40% on Farmingdale's website.",
							"Reduced task time by 20% with SQL-based staff availability lists.",
						]}
					></Experience>
				</section>
				{/* <div className='p-[2%]'></div>
				<section className='space-y-4'>
					<h1 className='font-semibold text-3xl space-y-10'>
						Projects
					</h1>
					<Project
						title='ParkingPal'
						link='http://github.com/georgenakashyan/ParkingPal'
					></Project>
				</section> */}
			</main>
		</div>
	);
}
