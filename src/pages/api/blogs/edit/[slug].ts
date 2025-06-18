// /api/blogs/edit/[slug].ts
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
  const asset = await sanityClient.assets.upload('image', imageBuffer, { filename });
  return asset;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = req.query.slug as string;

  try {
    const blog = await sanityClient.fetch(`*[_type == 'blog' && slug.current == $slug][0]._id`, { slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const form = formidable({ uploadDir: '/tmp', keepExtensions: true });
    const [fields, files] = await form.parse(req);

    const title = fields.title?.[0] || '';
    const subtitle = fields.subtitle?.[0] || '';
    const tagsRaw = fields.tags?.[0] || '';
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

    let coverImageRef = null;
    if (files.coverImage?.[0]?.filepath) {
      const file = files.coverImage[0];
      const uploaded = await uploadImageToSanity(file.filepath, file.originalFilename || 'cover');
      coverImageRef = {
        _type: 'image',
        asset: { _type: 'reference', _ref: uploaded._id },
      };
      fs.unlinkSync(file.filepath);
    }

    const rawSections = fields.sections?.[0] || '[]';
    const parsedSections = JSON.parse(rawSections);
    const sections = [];

    for (let i = 0; i < parsedSections.length; i++) {
      const section = parsedSections[i];

      if (section.type === 'content') {
        sections.push({
          _type: 'content',
          content: [
            {
              _type: 'block',
              style: 'normal',
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  text: section.value || '',
                  marks: [],
                },
              ],
            },
          ],
        });
      } else if (section.type === 'product') {
        let imageRef = null;
        const imageKey = `productImage-${i}`;
        const imageFile = files[imageKey]?.[0];

        if (imageFile?.filepath) {
          const uploaded = await uploadImageToSanity(imageFile.filepath, imageFile.originalFilename || `product-${i}`);
          imageRef = {
            _type: 'image',
            asset: { _type: 'reference', _ref: uploaded._id },
          };
          fs.unlinkSync(imageFile.filepath);
        }

        const affiliateLinks = section.affiliateLinks?.map(link => ({
          _type: 'affiliateLink',
          label: link.label,
          url: link.url,
          clicks: 0
        })) || [];

        sections.push({
          _type: 'product',
          name: section.name,
          description: section.description,
          image: imageRef,
          affiliateLinks
        });
      }
    }

    const patch = sanityClient.patch(blog)
      .set({ title, subtitle, tags, sections })
      .setIfMissing({ numOfViews: 0, numOfShares: 0 });

    if (coverImageRef) {
      patch.set({ coverImage: coverImageRef });
    }

    await patch.commit();

    res.status(200).json({ message: 'Blog updated' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update', detail: err.message });
  }
}
