import React from "react";

export interface InputProps {
	id?: string;
	name?: string;
	type?: "text" | "email" | "password" | "number" | "tel" | "url";
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	required?: boolean;
	autoComplete?: string;
	label?: string;
	error?: string;
	success?: boolean;
	helperText?: string;
	className?: string;
}

/**
 * Input component with validation states
 * Supports error, success, and disabled states with visual feedback
 */
const Input = ({
	id,
	name,
	type = "text",
	placeholder,
	value,
	defaultValue,
	onChange,
	onBlur,
	onFocus,
	disabled = false,
	required = false,
	autoComplete,
	label,
	error,
	success = false,
	helperText,
	className = "",
}: InputProps) => {
	// Determine validation state classes
	const getValidationClasses = () => {
		if (error) {
			return "border-red-500 focus:border-red-500 focus:ring-red-500/20";
		}
		if (success) {
			return "border-success focus:border-success focus:ring-success/20";
		}
		return "border-white/10 focus:border-primary-start focus:ring-primary-start/20";
	};

	const baseClasses = `w-full px-4 py-3 bg-card-bg/40 backdrop-blur-lg text-text-primary placeholder:text-text-secondary/50 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${getValidationClasses()} ${
		disabled ? "opacity-50 cursor-not-allowed" : ""
	} ${className}`;

	return (
		<div className="w-full">
			{label && (
				<label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				required={required}
				autoComplete={autoComplete}
				className={baseClasses}
			/>
			{error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
			{!error && helperText && <p className="mt-1.5 text-sm text-text-secondary/70">{helperText}</p>}
		</div>
	);
};

export default Input;
