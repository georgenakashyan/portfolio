import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	env: {
		myEmail: process.env.MY_EMAIL,
	},
	// Configure `pageExtensions` to include MDX files
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	/* config options here */
};

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
