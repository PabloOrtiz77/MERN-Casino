/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_API_DOMAIN: "http://localhost:8000/api",
  },
  transpilePackages: ["@mui/x-charts"],
};

export default nextConfig;
