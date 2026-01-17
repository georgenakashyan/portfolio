import React from "react";

export interface TextareaProps {
	id?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	disabled?: boolean;
	required?: boolean;
	rows?: number;
	maxLength?: number;
	label?: string;
	error?: string;
	success?: boolean;
	helperText?: string;
	className?: string;
	resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * Textarea component with validation states
 * Supports error, success, and disabled states with visual feedback
 */
const Textarea = ({
	id,
	name,
	placeholder,
	value,
	defaultValue,
	onChange,
	onBlur,
	onFocus,
	disabled = false,
	required = false,
	rows = 4,
	maxLength,
	label,
	error,
	success = false,
	helperText,
	className = "",
	resize = "vertical",
}: TextareaProps) => {
	// Determine validation state classes
	const getValidationClasses = () => {
		if (error) {
			return "border-red-500 focus:border-red-500 focus:ring-red-500/20";
		}
		if (success) {
			return "border-success focus:border-success focus:ring-success/20";
		}
		return "border-border focus:border-accent-primary focus:ring-accent-primary/20";
	};

	// Resize classes
	const resizeClasses = {
		none: "resize-none",
		vertical: "resize-y",
		horizontal: "resize-x",
		both: "resize",
	};

	const baseClasses = `w-full px-4 py-3 bg-surface-raised text-content-primary placeholder:text-content-muted rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${getValidationClasses()} ${
		disabled ? "opacity-50 cursor-not-allowed" : ""
	} ${resizeClasses[resize]} ${className}`;

	return (
		<div className="w-full">
			{label && (
				<label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-2">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<textarea
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				required={required}
				rows={rows}
				maxLength={maxLength}
				className={baseClasses}
				style={{
					WebkitTextFillColor: "var(--text-primary)",
					WebkitBoxShadow: "0 0 0px 1000px hsl(217 33% 17%) inset",
				}}
			/>
			{error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
			{!error && helperText && <p className="mt-1.5 text-sm text-text-secondary/70">{helperText}</p>}
			{maxLength && value && (
				<p className="mt-1.5 text-xs text-text-secondary/60 text-right">
					{value.length}/{maxLength}
				</p>
			)}
		</div>
	);
};

export default Textarea;
