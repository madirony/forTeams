// const withPWA = require("next-pwa");
// // const withPlugins = require("next-compose-plugins");

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// };
// module.exports = withPWA(nextConfig);

// module.exports = withPlugins(
//   [
//     [
//       withPWA,
//       {
//         pwa: {
//           dest: "public",
//         },
//       },
//     ],

//     // 추가 플러그인 작성
//   ],
//   nextConfig,
// );

// eslint : {
//   ignoreDuringBuilds: true
// }
const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["forteams-bucket.s3.ap-northeast-2.amazonaws.com"],
  },
};

module.exports = withPWA(nextConfig);
