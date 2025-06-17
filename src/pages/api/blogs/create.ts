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

  try {
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    const [fields, files] = await form.parse(req);

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const subtitle = Array.isArray(fields.subtitle) ? fields.subtitle[0] : fields.subtitle;
    const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
    const tagsString = Array.isArray(fields.tags) ? fields.tags[0] : fields.tags;
    const productsRaw = Array.isArray(fields.products) ? fields.products[0] : fields.products;

    const slug = generateSlug(title);
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    // Cover image upload
    let coverImageRef = null;
    if (files.coverImage && files.coverImage[0]?.filepath) {
      const file = files.coverImage[0];
      const uploaded = await uploadImageToSanity(file.filepath, file.originalFilename || 'cover-image');
      coverImageRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: uploaded._id },
      };
      fs.unlinkSync(file.filepath);
    }

    // Handle product sections
    const products = [];
    if (productsRaw) {
      const parsed = JSON.parse(productsRaw);
      for (let i = 0; i < parsed.length; i++) {
        const product = parsed[i];
        let imageRef = null;
        const imageKey = `productImage-${i}`;

        const imageFile = files[imageKey]?.[0];
        if (imageFile?.filepath) {
          const uploaded = await uploadImageToSanity(imageFile.filepath, imageFile.originalFilename || `product-${i}`);
          imageRef = { _type: 'image', asset: { _type: 'reference', _ref: uploaded._id } };
          fs.unlinkSync(imageFile.filepath);
        }

        products.push({
          _type: 'productSection',
          name: product.name,
          description: product.description,
          image: imageRef,
          affiliateLinks: product.affiliateLinks.map(link => ({
            _type: 'affiliateLink',
            label: link.label,
            url: link.url,
          }))
        });
      }
    }

    const contentBlocks = content.split('\n\n').filter(Boolean).map(p => ({
      _type: 'block',
      _key: Math.random().toString(36).substr(2, 9),
      style: 'normal',
      markDefs: [],
      children: [{
        _type: 'span',
        _key: Math.random().toString(36).substr(2, 9),
        text: p.trim(),
        marks: [],
      }],
    }));

    const blogPost = {
      _type: 'blog',
      title,
      subtitle,
      slug: { _type: 'slug', current: slug },
      content: contentBlocks,
      publishedAt: new Date().toISOString(),
      tags,
      ...(coverImageRef && { coverImage: coverImageRef }),
      ...(products.length && { products }),
    };

    const created = await sanityClient.create(blogPost);

    res.status(201).json({
      message: 'Blog post created successfully',
      slug: created.slug.current,
      id: created._id,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog post', detail: err.message });
  }
}
