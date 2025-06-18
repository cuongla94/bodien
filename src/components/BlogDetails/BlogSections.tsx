import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from 'utils/portableTextComponent';

type BlogSection = {
  _type: string;
  _key?: string;
  content?: any;
  name?: string;
  description?: string;
  image?: { asset: { url: string } };
  affiliateLinks?: { url: string; label: string; clicks: number }[];
};

type Props = {
  sections: BlogSection[];
};

export default function BlogSections({ sections }: Props) {
  return (
    <>
      {sections.map((section, idx) => {
        const key = section._key || `section-${idx}`;

        if (section._type === 'content') {
          return (
            <div key={key} className="mb-5">
              {Array.isArray(section.content) ? (
                <PortableText value={section.content} components={portableTextComponents} />
              ) : typeof section.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : null}
            </div>
          );
        }
        if (section._type === 'product') {
          return (
            <div
              key={key}
              className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-4 mb-5"
            >
              {section.image?.asset?.url && (
                <div className="flex-shrink-0 text-center">
                  <Image
                    src={section.image.asset.url}
                    alt={section.name || 'Product'}
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}

              <div
                className="text-md-start"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                {section.name && <h4 className="mb-2">{section.name}</h4>}
                {section.description && <p className="text-muted">{section.description}</p>}

                {section.affiliateLinks?.length > 0 && (
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {section.affiliateLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}
