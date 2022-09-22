/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		BASE_URI: process.env.BASE_URI,
	},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
}

module.exports = nextConfig
