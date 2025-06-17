import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'services';

const VIEW_EXPIRY_HOURS = 6;

let viewedIps: Record<string, number> = {};

function getClientIp(req: NextApiRequest): string {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket.remoteAddress ||
    ''
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { blogSlug } = req.body;
  if (!blogSlug) return res.status(400).json({ error: 'Missing blogSlug' });

  const ip = getClientIp(req);
  const key = `${blogSlug}_${ip}`;

  const now = Date.now();
  if (viewedIps[key] && now - viewedIps[key] < VIEW_EXPIRY_HOURS * 3600 * 1000) {
    return res.status(200).json({ message: 'Already viewed' });
  }

  try {
    const blogId = await sanityClient.fetch(`*[_type == "blog" && slug.current == $slug][0]._id`, { slug: blogSlug });
    if (!blogId) return res.status(404).json({ error: 'Blog not found' });

    await sanityClient.patch(blogId).inc({ numOfViews: 1 }).commit();
    viewedIps[key] = now;

    res.status(200).json({ message: 'View recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record view', detail: err.message });
  }
}
