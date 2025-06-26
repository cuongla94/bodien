import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { sanityClient } from 'services';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadImageToSanity(filePath: string, filename: string) {
  const imageBuffer = fs.readFileSync(filePath);
  const asset = await sanityClient.assets.upload('image', imageBuffer, {
    filename,
  });
  return asset;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const blogId = req.query.id as string;

  if (!blogId) {
    return res.status(400).json({ error: 'Missing or invalid blog ID' });
  }

  try {
    const existingBlog = await sanityClient.fetch(
      `*[_type == "blog" && _id == $id][0]`,
      { id: blogId }
    );

    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const form = formidable({ uploadDir: '/tmp', keepExtensions: true });
    const [fields, files] = await form.parse(req);

    const title = fields.title?.[0] || '';
    const subtitle = fields.subtitle?.[0] || '';
    const category = fields.category?.[0] || '';
    const tagsRaw = fields.tags?.[0] || '';
    const tags = tagsRaw
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (!title || !category) {
      return res.status(400).json({ error: 'Missing title or category' });
    }

    let coverImageRef = null;

    if (files.coverImage?.[0]?.filepath) {
      const file = files.coverImage[0];
      const uploaded = await uploadImageToSanity(
        file.filepath,
        file.originalFilename || 'cover'
      );
      coverImageRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: uploaded._id },
      };
      try {
        fs.unlinkSync(file.filepath);
      } catch {}
    } else if (existingBlog.coverImage) {
      coverImageRef = existingBlog.coverImage;
    }

    const rawSections = fields.sections?.[0] || '[]';
    const parsedSections = JSON.parse(rawSections);
    const sections = [];

    for (let i = 0; i < parsedSections.length; i++) {
      const section = parsedSections[i];
      const _key = section._key || Math.random().toString(36).substring(2, 10);

      if (section._type === 'content') {
        const text = section.description || '';
        sections.push({
          _type: 'content',
          _key,
          content: [
            {
              _type: 'block',
              _key: Math.random().toString(36).substring(2, 10),
              style: 'normal',
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  _key: Math.random().toString(36).substring(2, 10),
                  text,
                  marks: [],
                },
              ],
            },
          ],
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
          } catch {}
        } else if (section.image?.asset?._id) {
          imageRef = {
            _type: 'image',
            asset: { _type: 'reference', _ref: section.image.asset._id },
          };
        }

        const affiliateLinks =
          section.affiliateLinks?.map(link => ({
            _type: 'affiliateLink',
            label: link.label,
            url: link.url,
            clicks: 0,
          })) || [];

        sections.push({
          _type: 'product',
          _key,
          name: section.name || '',
          description: section.description,
          image: imageRef,
          affiliateLinks,
        });
      }
    }

    const patch = sanityClient
      .patch(blogId)
      .set({ title, subtitle, tags, category, sections })
      .setIfMissing({ numOfViews: 0, numOfShares: 0 });

    if (coverImageRef) {
      patch.set({ coverImage: coverImageRef });
    }

    await patch.commit();

    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (err: any) {
    console.error('Failed to update blog:', err);
    res.status(500).json({ error: 'Failed to update', detail: err.message });
  }
}
