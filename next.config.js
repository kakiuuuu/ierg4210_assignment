/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["ierg4210appbucket.s3.us-east-1.amazonaws.com"],
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
}

export default nextConfig