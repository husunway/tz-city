/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make sure the protected three.js file is bundled with the /scene function on Vercel.
  outputFileTracingIncludes: {
    "/scene": ["./protected/**/*"],
  },
};

export default nextConfig;
