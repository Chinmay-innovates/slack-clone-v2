/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.exprContextCritical = false;
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
			},
		],
	},
};

export default nextConfig;
