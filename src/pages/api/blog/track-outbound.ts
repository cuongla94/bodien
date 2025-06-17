import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'services';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { blogSlug } = req.body;
  if (!blogSlug) return res.status(400).json({ error: 'Missing blogSlug' });

  try {
    const blogId = await sanityClient.fetch(`*[_type == "blog" && slug.current == $slug][0]._id`, { slug: blogSlug });
    if (!blogId) return res.status(404).json({ error: 'Blog not found' });

    await sanityClient.patch(blogId).inc({ outboundClicks: 1 }).commit();
    res.status(200).json({ message: 'Outbound click recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record outbound click', detail: err.message });
  }
}
