/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Supprimez X-Frame-Options complètement pour autoriser tous les iframes
          // OU utilisez une valeur valide comme 'SAMEORIGIN'
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *;", // Autorise TOUS les domaines parents
          },
        ],
      },
    ]
  },
}

export default nextConfig