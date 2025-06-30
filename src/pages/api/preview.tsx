
import { getBlogBySlug } from 'apis';
import { AppLinks } from 'config/navigation-config';

export default async function enablePreview(req, res) {

  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({message: 'Invalid token'})
  }

  const blog = await getBlogBySlug(req.query.slug, true);

  if (!blog) {
    return res.status(401).json({message: 'Invalid Slug!'})
  }
  // setPreviewData will set cookies into you browsert
  // __prerender_bypass __next_preview_data
  res.setPreviewData({});
  res.writeHead(307, { Location: `${AppLinks.blogs.link}/${blog.slug}`})
  res.end();
}
