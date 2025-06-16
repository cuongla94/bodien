import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from 'utils/sanityClient';

interface DeleteResponse {
  success: boolean;
  message: string;
  deletedId?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteResponse>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use DELETE.',
    });
  }

  const id =
    typeof req.query.id === 'string'
      ? req.query.id.trim()
      : Array.isArray(req.query.id)
      ? req.query.id[0].trim()
      : '';

  console.log('[DELETE API] Blog ID:', id);

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Valid blog post ID is required',
    });
  }

  try {
    const existingPost = await sanityClient.fetch(
      `*[_type == "blog" && _id == $id][0]{ _id, title }`, // ✅ FIXED _type
      { id }
    );

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await sanityClient.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    console.error('Delete operation failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    });
  }
}
