/** @type {import('next').NextConfig} */
const isMobile = process.env.MOBILE_BUILD === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(isMobile
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true
      }
    : {})
};

export default nextConfig;
