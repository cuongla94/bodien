import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'services';

const VIEW_EXPIRY_HOURS = 6;
let viewedIps: Record<string, number> = {};

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress || '';

  return ip === '::1' ? '127.0.0.1' : ip;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { blogSlug } = req.body;
  if (!blogSlug) {
    return res.status(400).json({ error: 'Missing blogSlug' });
  }

  const ip = getClientIp(req);
  const key = `${blogSlug}_${ip}`;
  const now = Date.now();

  // ✅ Detailed log for debugging
  console.log(`[Blog View Tracker] Blog: ${blogSlug}`);
  console.log(`IP Address: ${ip}`);
  console.log(`User-Agent: ${req.headers['user-agent']}`);
  console.log(`Key: ${key}`);
  console.log(`Viewed Before: ${!!viewedIps[key]}`);
  console.log(`Now: ${now}, Last Viewed: ${viewedIps[key]}`);

  if (viewedIps[key] && now - viewedIps[key] < VIEW_EXPIRY_HOURS * 3600 * 1000) {
    return res.status(200).json({ message: 'Already viewed' });
  }

  try {
    const blogId = await sanityClient.fetch(
      `*[_type == "blog" && slug.current == $slug][0]._id`,
      { slug: blogSlug }
    );

    if (!blogId) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await sanityClient.patch(blogId).inc({ numOfViews: 1 }).commit();
    viewedIps[key] = now;

    res.status(200).json({ message: `View recorded for ${blogSlug}`, viewedIP: ip });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record view', detail: err.message });
  }
}
