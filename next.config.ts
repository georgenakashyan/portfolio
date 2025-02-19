import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		myEmail: process.env.MY_EMAIL,
	},
	/* config options here */
};

export default nextConfig;
