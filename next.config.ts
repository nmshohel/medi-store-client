
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This wildcard allows all hostnames
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig













// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "images.unsplash.com",
//       "cdn.pixabay.com",
//       "i.ibb.co",
//       "images.pexels.com",
//       "i.ibb.co.com"
//     ],
//   },
// }

// module.exports = nextConfig
