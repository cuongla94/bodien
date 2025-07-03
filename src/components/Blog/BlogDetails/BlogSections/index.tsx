import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from 'utils/html/portableTextComponent';

import {
  SectionWrapper,
  ProductWrapper,
  ImageWrapper,
  ContentWrapper,
  Title,
  Description,
  LinksWrapper,
} from './styles';

type BlogSection = {
  _type: string;
  _key?: string;
  content?: any;
  name?: string;
  description?: any; // now treated as rich text blocks
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
            <SectionWrapper key={key}>
              {section.content && (
                <PortableText
                  value={section.content}
                  components={portableTextComponents}
                />
              )}
            </SectionWrapper>
          );
        }

        if (section._type === 'product') {
          return (
            <ProductWrapper key={key}>
              {section.image?.asset?.url && (
                <ImageWrapper>
                  <Image
                    src={section.image.asset.url}
                    alt={section.name || 'Product'}
                    width={200}
                    height={200}
                  />
                </ImageWrapper>
              )}

              <ContentWrapper>
                {section.description && Array.isArray(section.description) && (
                  <PortableText
                    value={section.description}
                    components={portableTextComponents}
                  />
                )}

                {section.affiliateLinks?.length > 0 && (
                  <LinksWrapper>
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
                  </LinksWrapper>
                )}
              </ContentWrapper>
            </ProductWrapper>
          );
        }

        return null;
      })}
    </>
  );
}
