import client, { previewClient } from 'lib/sanity';
import imageUrlBuilder from '@sanity/image-url';

const blogFields = `
  _id,
  _type,
  title,
  subtitle,
  'slug': slug.current,
  publishedAt,
  coverImage,
`

const builder = imageUrlBuilder(client)
const getClient = preview => preview ? previewClient : client

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs() {
  const results = await client
    .fetch(`*[_type == "blog"] | order(publishedAt desc) {${blogFields}}`);
  return results;
}

export async function getPaginatedBlogs({offset = 0, date = 'desc'} = {offset: 0, date: 'desc'}) {
  const results = await client
    .fetch(`*[_type == "blog"] | order(publishedAt ${date}) {${blogFields}}[${offset}...${offset + 6}]`);
  return results;
}

export const onBlogUpdate = (slug) => {
  const client = getClient(true);
  return client.listen(`*[_type == "blog" && slug.current == $slug] {
    ${blogFields}
    content[]{..., "asset": asset->}
  }`, {slug})
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const result = await currentClient
    .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset": asset->}
    }`, {slug})
    .then(res => preview ? (res?.[1] ? res[1] : res[0]) : res?.[0])

  return result;
}