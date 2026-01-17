"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Sticky navigation bar with glassmorphism background
 * Features mobile hamburger menu with slide-in animation
 * Highlights active route with gradient text
 */
const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const shouldReduceMotion = useReducedMotion();

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/projects", label: "Projects" },
		{ href: "/experience", label: "Experience" },
		{ href: "/contact", label: "Contact" },
	];

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-card-bg/70 border-b border-text-secondary/10 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Name */}
					<Link
						href="/"
						className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
					>
						George Nakashyan
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-8">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`text-base font-semibold transition-all duration-300 ${
										isActive
											? "bg-gradient-primary bg-clip-text text-transparent"
											: "text-text-secondary hover:text-text-primary"
									}`}
								>
									{link.label}
								</Link>
							);
						})}
					</div>

					{/* Mobile Hamburger Button */}
					<button
						onClick={toggleMobileMenu}
						className="md:hidden text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-start rounded-md p-2"
						aria-label="Toggle mobile menu"
					>
						<div className="w-6 h-5 flex flex-col justify-between">
							<motion.span
								animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
								transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
								className="w-full h-0.5 bg-current transform origin-center"
							/>
							<motion.span
								animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
								transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
								className="w-full h-0.5 bg-current"
							/>
							<motion.span
								animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
								transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
								className="w-full h-0.5 bg-current transform origin-center"
							/>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ x: shouldReduceMotion ? 0 : "100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: shouldReduceMotion ? 0 : "100%", opacity: 0 }}
						transition={
							shouldReduceMotion
								? { duration: 0 }
								: { type: "spring", stiffness: 300, damping: 30 }
						}
						className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-card-bg border-l border-text-secondary/10 shadow-xl md:hidden"
					>
						<div className="flex flex-col space-y-4 p-6">
							{navLinks.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										onClick={closeMobileMenu}
										className={`text-lg font-semibold transition-all duration-300 ${
											isActive
												? "bg-gradient-primary bg-clip-text text-transparent"
												: "text-text-secondary hover:text-text-primary"
										}`}
									>
										{link.label}
									</Link>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Overlay for mobile menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
						onClick={closeMobileMenu}
						className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden z-40"
					/>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
