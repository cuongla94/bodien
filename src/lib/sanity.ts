import { createClient } from '@sanity/client';

const options = {
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production'
  // useCdn === true, gives you fast response, it will get you
  // cached data
  // useCdn === false, give you little bit slower response, but
  // latest data
}

export const previewClient = createClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

export default createClient(options);