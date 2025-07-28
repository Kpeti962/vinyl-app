/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.discogs.com', 'st.discogs.com'],
    
  },
}

module.exports = nextConfig
