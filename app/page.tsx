import MainButton from "./components/MainButton";
import Socials from "./components/Socials";

export default function Home() {
	return (
		<div className='mx-[15%] flex lg:flex-row flex-col max-h-full text-text_primary'>
			<header className='lg:sticky lg:top-0 flex lg:max-h-screen lg:w-[50%] flex-col justify-between py-24'>
				<div className='lg:min-h-full lg:space-y-3 lg:pr-[20%] pr-[0%] min-w-full'>
					<h1 className='font-semibold text-5xl'>George Nakashyan</h1>
					<h2 className='font-semibold text-2xl'>
						Full Stack Software Engineer
					</h2>

					<div className='p-[2%]'></div>

					<div className='text-text_secondary space-y-3 lg:text-xl text-md'>
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
			<main className='pt-24 lg:w-[50%] lg:py-24'>
				<section className=''>Work Experience</section>
				<section className=''>Projects</section>
			</main>
		</div>
	);
}
