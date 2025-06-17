import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'services';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { blogSlug, sectionId, linkLabel } = req.body;
  if (!blogSlug || !sectionId || !linkLabel) {
    return res.status(400).json({ error: 'Missing blogSlug, sectionId, or linkLabel' });
  }

  try {
    const query = `*[_type == "blog" && slug.current == $slug][0]{ _id, sections }`;
    const blog = await sanityClient.fetch(query, { slug: blogSlug });

    if (!blog || !blog._id) return res.status(404).json({ error: 'Blog not found' });

    const sectionIndex = blog.sections.findIndex((s: any) => s._key === sectionId);
    if (sectionIndex === -1) return res.status(404).json({ error: 'Section not found' });

    const linkIndex = blog.sections[sectionIndex].affiliateLinks?.findIndex((l: any) => l.label === linkLabel);
    if (linkIndex === -1 || linkIndex === undefined) return res.status(404).json({ error: 'Affiliate link not found' });

    const path = `sections[${sectionIndex}].affiliateLinks[${linkIndex}].clicks`;

    await sanityClient.patch(blog._id).inc({ [path]: 1 }).commit();
    res.status(200).json({ message: 'Affiliate click recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track affiliate click', detail: err.message });
  }
}
