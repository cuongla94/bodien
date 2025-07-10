module.exports = {
  env: {
    SANITY_DATASET_NAME: process.env.SANITY_DATASET_NAME,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'i-invdn-com.investing.com', 'media.wired.com', 'o.aolcdn.com', 'www.ft.com', 'fortune.com', 'static01.nyt.com'],
  },
};
