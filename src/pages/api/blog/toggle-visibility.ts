// pages/api/blog/toggleHidden.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'services';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, hidden } = req.body;

  if (!id || typeof hidden !== 'boolean') {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const result = await sanityClient.patch(id).set({ hidden }).commit();
    res.status(200).json({ message: 'Visibility updated', result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visibility', detail: err.message });
  }
}
