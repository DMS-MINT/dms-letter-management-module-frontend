/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: `${process.env.NEXT_PUBLIC_BACKEND_HOST}`,
				port: `${process.env.NEXT_PUBLIC_BACKEND_PORT}`,
				pathname: "/media/**",
			},
		],
	},
};

export default nextConfig;
