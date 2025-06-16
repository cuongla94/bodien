import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { sanityClient } from 'utils/sanityClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function uploadImageToSanity(filePath: string, filename: string) {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    const asset = await sanityClient.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    return asset;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Debug the client configuration
  console.log('Client configuration debug:');
  console.log('Project ID:', process.env.SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.SANITY_DATASET_NAME);
  console.log('Token exists:', !!process.env.SANITY_API_TOKEN);
  console.log('Token length:', process.env.SANITY_API_TOKEN?.length);
  console.log('Token starts with sk:', process.env.SANITY_API_TOKEN?.startsWith('sk'));

  try {
    console.log('API called - starting form parsing...');

    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    const [fields, files] = await form.parse(req);
    console.log('Form parsed successfully');
    console.log('Fields:', fields);
    console.log('Files:', Object.keys(files));

    // Extract field values (formidable returns arrays)
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const subtitle = Array.isArray(fields.subtitle) ? fields.subtitle[0] : fields.subtitle;
    const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
    const excerpt = Array.isArray(fields.excerpt) ? fields.excerpt[0] : fields.excerpt;
    const tagsString = Array.isArray(fields.tags) ? fields.tags[0] : fields.tags;

    console.log('Extracted values:', { title, subtitle, content: content?.substring(0, 100) + '...', excerpt, tagsString });

    if (!title || !content) {
      console.log('Validation failed: missing title or content');
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = generateSlug(title);
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    console.log('Generated slug:', slug);
    console.log('Processed tags:', tags);

    // Handle image upload
    let coverImageRef = null;
    if (files.coverImage) {
      console.log('Processing cover image...');
      const imageFile = Array.isArray(files.coverImage) ? files.coverImage[0] : files.coverImage;
      if (imageFile && imageFile.filepath) {
        try {
          const uploadedAsset = await uploadImageToSanity(
            imageFile.filepath,
            imageFile.originalFilename || 'cover-image'
          );
          coverImageRef = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedAsset._id,
            },
          };
          console.log('Image uploaded successfully:', uploadedAsset._id);
          
          // Clean up temp file
          fs.unlinkSync(imageFile.filepath);
        } catch (uploadError) {
          console.error('Failed to upload image:', uploadError);
          // Continue without image rather than failing completely
        }
      }
    }

    // Convert content to Sanity blocks
    const contentBlocks = content.split('\n\n').filter(Boolean).map((paragraph: string) => ({
      _type: 'block',
      _key: Math.random().toString(36).substr(2, 9),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substr(2, 9),
          text: paragraph.trim(),
          marks: [],
        },
      ],
    }));

    console.log('Created content blocks:', contentBlocks.length);

    const blogPost = {
      _type: 'blog',
      title,
      subtitle: subtitle || '',
      slug: {
        _type: 'slug',
        current: slug,
      },
      excerpt: excerpt || '',
      content: contentBlocks,
      ...(coverImageRef && { coverImage: coverImageRef }),
      publishedAt: new Date().toISOString(),
      tags: tags,
    };

    console.log('Creating blog post in Sanity...');
    const result = await sanityClient.create(blogPost);
    console.log('Blog post created successfully:', result._id);

    res.status(201).json({
      message: 'Blog post created successfully',
      slug: result.slug.current,
      id: result._id,
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to create blog post',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
    });
  }
}