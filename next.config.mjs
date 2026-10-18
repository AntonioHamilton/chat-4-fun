/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_WS_URL: process.env.WS_URL ?? process.env.NEXT_PUBLIC_WS_URL,
	},
	compiler: {
		styledComponents: true,
	},
};

export default nextConfig;
