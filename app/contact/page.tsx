import { Metadata } from "next";
import ContactForm from "../components/sections/ContactForm";
import Socials from "../components/Socials";
import Button from "../components/ui/Button";

export const metadata: Metadata = {
	title: "Contact | George Nakashyan - Full Stack Software Engineer",
	description:
		"Get in touch with George Nakashyan for full-stack development opportunities, freelance projects, or collaboration. Located in New York, NY.",
	keywords: [
		"contact software engineer",
		"hire full stack developer",
		"Next.js developer",
		"freelance web developer",
		"New York developer",
	],
};

export default function ContactPage() {
	const email =
		process.env.NEXT_PUBLIC_MY_EMAIL || "georgenakashyan@gmail.com";

	return (
		<div className='min-h-screen py-20 px-6 md:px-12 lg:px-20'>
			<div className='container mx-auto max-w-7xl'>
				{/* Page Header */}
				<div className='mb-16 text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
						<span className='bg-gradient-primary bg-clip-text text-transparent'>
							Get In Touch
						</span>
					</h1>
					<p className='text-lg text-text-secondary max-w-2xl mx-auto'>
						Have a project in mind or want to collaborate? I'd love
						to hear from you.
					</p>
				</div>

				{/* Split Layout - Contact Info & Form */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
					{/* Left Side - Contact Information */}
					<div className='space-y-8'>
						<div>
							<h2 className='text-2xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent'>
								Contact Information
							</h2>

							{/* Email */}
							<div className='mb-6'>
								<h3 className='text-text-secondary text-sm font-semibold mb-2 uppercase tracking-wide'>
									Email
								</h3>
								<a
									href={`mailto:${email}`}
									className='text-text-primary text-lg hover:text-primary-start transition-colors duration-300'
								>
									{email}
								</a>
							</div>

							{/* Location */}
							<div className='mb-6'>
								<h3 className='text-text-secondary text-sm font-semibold mb-2 uppercase tracking-wide'>
									Location
								</h3>
								<p className='text-text-primary text-lg'>
									New York, NY
								</p>
							</div>

							{/* Social Links */}
							<div className='mb-6'>
								<h3 className='text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wide'>
									Connect With Me
								</h3>
								<Socials />
							</div>

							{/* Download Resume */}
							<div className='pt-6'>
								<Button
									href='/George-Nakashyan-Resume.pdf'
									variant='secondary'
									size='lg'
									download
									target='_blank'
								>
									Download Resume
								</Button>
							</div>
						</div>

						{/* Additional Info Card */}
						<div className='p-6 bg-card-bg/40 backdrop-blur-lg border border-white/10 rounded-3xl'>
							<h3 className='text-xl font-bold mb-3 text-text-primary'>
								Open to Opportunities
							</h3>
							<p className='text-text-secondary text-sm leading-relaxed'>
								I'm always interested in new opportunities,
								collaborations, and challenging projects.
								Whether you have a question, a project idea, or
								just want to connect, feel free to reach out. I
								typically respond within 24 hours.
							</p>
						</div>
					</div>

					{/* Right Side - Contact Form */}
					<div className='lg:pl-8'>
						<div className='p-8 bg-card-bg/40 backdrop-blur-lg border border-white/10 rounded-3xl'>
							<h2 className='text-2xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent'>
								Send a Message
							</h2>
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
