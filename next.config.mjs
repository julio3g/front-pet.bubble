/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dogsapi.origamid.dev',
      },
      {
        protocol: 'http',
        hostname: 'pet-shop.local',
      },
    ],
  },
  // webpack(config) {
  //   // Exclui SVG da regra padrão de arquivos
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: [
  //       {
  //         loader: '@svgr/webpack',
  //         options: {
  //           icon: true,
  //         },
  //       },
  //     ],
  //   })

  //   return config
  // },
}

export default nextConfig
