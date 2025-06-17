import { createClient } from "@sanity/client";

// Debug environment variables
console.log('Environment check:');
console.log('PROJECT_ID:', process.env.SANITY_PROJECT_ID ? 'Found' : 'Missing');
console.log('DATASET:', process.env.SANITY_DATASET_NAME ? 'Found' : 'Missing');
console.log('TOKEN:', process.env.SANITY_API_TOKEN ? 'Found (length: ' + process.env.SANITY_API_TOKEN.length + ')' : 'Missing');

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET_NAME!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2023-05-03',
  useCdn: false,
});