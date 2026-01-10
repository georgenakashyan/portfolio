"use client";

import React, { useState } from "react";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

/**
 * ContactForm component with Formspree integration
 * Includes validation for email format and displays success/error messages
 */
const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateForm = () => {
		const newErrors = {
			name: "",
			email: "",
			message: "",
		};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		}

		setErrors(newErrors);
		return !newErrors.name && !newErrors.email && !newErrors.message;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// Placeholder Formspree endpoint - replace with actual endpoint when configured
			const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitStatus("success");
				setFormData({ name: "", email: "", message: "" });
			} else {
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Name Field */}
				<Input
					id="name"
					name="name"
					type="text"
					label="Name"
					placeholder="Your name"
					value={formData.name}
					onChange={handleChange}
					error={errors.name}
					required
					disabled={isSubmitting}
				/>

				{/* Email Field */}
				<Input
					id="email"
					name="email"
					type="email"
					label="Email"
					placeholder="your.email@example.com"
					value={formData.email}
					onChange={handleChange}
					error={errors.email}
					required
					disabled={isSubmitting}
				/>

				{/* Message Field */}
				<Textarea
					id="message"
					name="message"
					label="Message"
					placeholder="Tell me about your project or idea..."
					value={formData.message}
					onChange={handleChange}
					error={errors.message}
					required
					rows={6}
					maxLength={1000}
					disabled={isSubmitting}
				/>

				{/* Submit Button */}
				<Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
					{isSubmitting ? "Sending..." : "Send Message"}
				</Button>

				{/* Success Message */}
				{submitStatus === "success" && (
					<div className="p-4 bg-success/20 border border-success rounded-xl">
						<p className="text-success text-center font-medium">
							Message sent successfully! I'll get back to you soon.
						</p>
					</div>
				)}

				{/* Error Message */}
				{submitStatus === "error" && (
					<div className="p-4 bg-red-500/20 border border-red-500 rounded-xl">
						<p className="text-red-500 text-center font-medium">
							Failed to send message. Please try again or email me directly.
						</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
