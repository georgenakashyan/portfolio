import React from "react";
import Socials from "../Socials";

/**
 * Footer component with social links and copyright notice
 * Reuses the existing Socials component for consistency
 */
const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full border-t border-text-secondary/10 bg-card-bg/30 backdrop-blur-sm mt-auto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
					{/* Social Links */}
					<div className="flex items-center">
						<Socials />
					</div>

					{/* Copyright Notice */}
					<div className="text-text-secondary text-sm text-center md:text-right">
						<p>&copy; {currentYear} George Nakashyan. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
