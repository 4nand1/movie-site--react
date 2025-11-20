import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env : {
    ACCESS_TOKEN : process.env.ACCESS_TOKEN || ""
  }
};

export default nextConfig;

 