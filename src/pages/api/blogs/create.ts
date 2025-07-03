import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { sanityClient } from 'services';

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
  const imageBuffer = fs.readFileSync(filePath);
  const asset = await sanityClient.assets.upload('image', imageBuffer, {
    filename,
  });
  return asset;
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

    let category = null;
    try {
      const rawCategory = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      if (rawCategory) {
        const parsed = JSON.parse(rawCategory);
        if (parsed?.title && parsed?.value) {
          category = parsed;
        }
      }
    } catch {
      return res.status(400).json({ error: 'Invalid category format (must be object)' });
    }

    if (!title || !fields.sections || !category) {
      return res.status(400).json({ error: 'Missing title, category, or sections' });
    }

    const tagsRaw = Array.isArray(fields.tags) ? fields.tags[0] : fields.tags;
    const tags = tagsRaw
      ? tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    const slug = generateSlug(title);

    const hiddenRaw = Array.isArray(fields.hidden) ? fields.hidden[0] : fields.hidden;
    const hidden = String(hiddenRaw).toLowerCase() === 'true';

    let coverImageRef = null;
    if (files.coverImage && files.coverImage[0]?.filepath) {
      const file = files.coverImage[0];
      const uploaded = await uploadImageToSanity(
        file.filepath,
        file.originalFilename || 'cover-image'
      );
      coverImageRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: uploaded._id },
      };
      try {
        fs.unlinkSync(file.filepath);
      } catch (err) {
        console.warn('Failed to delete cover image temp file', err);
      }
    }

    let parsedSections: any[] = [];
    try {
      const rawSections = Array.isArray(fields.sections) ? fields.sections[0] : fields.sections;
      parsedSections = JSON.parse(rawSections || '[]');
      if (!Array.isArray(parsedSections) || parsedSections.length === 0) {
        return res.status(400).json({ error: 'Sections must be a non-empty array.' });
      }
    } catch (err) {
      return res.status(400).json({ error: 'Invalid sections JSON' });
    }

    const sections: any[] = [];

    for (let i = 0; i < parsedSections.length; i++) {
      const section = parsedSections[i];
      const _key = Math.random().toString(36).substring(2, 10);
      if (!section._type) continue;

      if (section._type === 'content') {
        const html = section.description || '';
        sections.push({
          _type: 'content',
          _key,
          description: html,
        });
      } else if (section._type === 'product') {
        let imageRef = null;
        const imageKey = `productImage-${i}`;
        const imageFile = files[imageKey]?.[0];

        if (imageFile?.filepath) {
          const uploaded = await uploadImageToSanity(
            imageFile.filepath,
            imageFile.originalFilename || `product-${i}`
          );
          imageRef = {
            _type: 'image',
            asset: { _type: 'reference', _ref: uploaded._id },
          };
          try {
            fs.unlinkSync(imageFile.filepath);
          } catch (err) {
            console.warn(`Failed to delete temp file for productImage-${i}`, err);
          }
        } else if (section.imagePreview) {
          const match = section.imagePreview.match(
            /image-([a-zA-Z0-9]+-[a-zA-Z0-9]+-[a-zA-Z0-9]+)/
          );
          if (match?.[1]) {
            imageRef = {
              _type: 'image',
              asset: { _type: 'reference', _ref: `image-${match[1]}` },
            };
          }
        }

        const affiliateLinks = (section.affiliateLinks || [])
          .filter(link => link.label?.trim() && link.url?.trim())
          .map(link => ({
            _type: 'affiliateLink',
            label: link.label,
            url: link.url,
            clicks: 0,
          }));

        sections.push({
          _type: 'product',
          _key,
          name: section.name || '',
          description: section.description || '',
          image: imageRef,
          affiliateLinks,
        });
      } else if (section._type === 'image') {
        let imageRef = null;
        if (section.imagePreview) {
          const match = section.imagePreview.match(
            /image-([a-zA-Z0-9]+-[a-zA-Z0-9]+-[a-zA-Z0-9]+)/
          );
          if (match?.[1]) {
            imageRef = {
              _type: 'image',
              asset: { _type: 'reference', _ref: `image-${match[1]}` },
            };
          }
        }

        if (imageRef) {
          sections.push({
            _type: 'image',
            _key,
            image: imageRef,
          });
        }
      }
    }

    const blogPost = {
      _type: 'blog',
      title,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      tags,
      category,
      numOfViews: 0,
      numOfShares: 0,
      hidden,
      sections,
      ...(coverImageRef && { coverImage: coverImageRef }),
    };

    const created = await sanityClient.create(blogPost);

    res.status(201).json({
      message: 'Blog post created successfully',
      slug: created.slug.current,
      id: created._id,
    });
  } catch (err: any) {
    console.error('❌ Blog creation error:', err);
    res.status(500).json({
      error: 'Failed to create blog post',
      detail: err.message,
    });
  }
}
