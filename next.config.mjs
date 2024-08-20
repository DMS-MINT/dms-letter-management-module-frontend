/** @type {import('next').NextConfig} */
const nextConfig = {
	output:"standalone",
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: `${process.env.NEXT_PUBLIC_BACKEND_HOST}`,

				pathname: "/media/**",
			},
		],
	},
};

export default nextConfig;
