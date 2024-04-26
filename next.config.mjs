/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		BACK_END_URL: process.env.NEXT_PUBLIC_BACK_END_URL,
		CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
	},
	// reactStrictMode: false,
};

export default nextConfig;
