/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
  },
  i18n: {
    locales: ["en-US", "de-DE"],
    defaultLocale: "en-US",
  },
};

module.exports = {
  i18n: {
    locales: ["en-US", "de-DE"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: "example.com",
        defaultLocale: "en-US",
        http: true,
      },
      {
        domain: "example.de",
        defaultLocale: "de-DE",
        http: true,
      },
    ],
  },
};

module.exports = nextConfig;
