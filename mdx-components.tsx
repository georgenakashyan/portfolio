import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

/**
 * Custom MDX components for rendering markdown content
 * These components provide consistent styling across all MDX files
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Headings
		h1: ({ children }) => (
			<h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl md:text-4xl font-bold mb-4 mt-12 text-text-primary">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl md:text-3xl font-semibold mb-3 mt-8 text-text-primary">{children}</h3>
		),
		h4: ({ children }) => <h4 className="text-xl font-semibold mb-2 mt-6 text-text-primary">{children}</h4>,

		// Paragraph
		p: ({ children }) => <p className="text-lg text-text-secondary mb-4 leading-relaxed">{children}</p>,

		// Lists
		ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-text-secondary">{children}</ul>,
		ol: ({ children }) => (
			<ol className="list-decimal list-inside mb-4 space-y-2 text-text-secondary">{children}</ol>
		),
		li: ({ children }) => <li className="text-lg leading-relaxed">{children}</li>,

		// Links
		a: ({ href, children }) => (
			<a
				href={href}
				className="text-primary-start hover:text-primary-end underline transition-colors duration-200"
				target={href?.startsWith("http") ? "_blank" : undefined}
				rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			>
				{children}
			</a>
		),

		// Code blocks
		code: ({ children }) => (
			<code className="bg-card-bg/60 text-primary-start px-2 py-1 rounded text-sm font-mono border border-white/10">
				{children}
			</code>
		),
		pre: ({ children }) => (
			<pre className="bg-card-bg/60 p-4 rounded-lg overflow-x-auto mb-4 border border-white/10 backdrop-blur-sm">
				{children}
			</pre>
		),

		// Blockquote
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-primary-start pl-4 my-4 italic text-text-secondary bg-card-bg/40 py-2 rounded-r-lg backdrop-blur-sm">
				{children}
			</blockquote>
		),

		// Images - optimized with Next.js Image
		img: (props) => (
			<Image
				{...(props as ImageProps)}
				width={800}
				height={600}
				className="rounded-lg my-6 w-full h-auto"
				alt={props.alt || ""}
			/>
		),

		// Horizontal rule
		hr: () => <hr className="my-8 border-white/10" />,

		// Strong/Bold
		strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,

		// Emphasis/Italic
		em: ({ children }) => <em className="italic">{children}</em>,

		...components,
	};
}
