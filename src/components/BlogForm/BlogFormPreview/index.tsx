import React from 'react';
import Image from 'next/image';

import {
  SectionWrapper,
  ProductWrapper,
  ImageWrapper,
  ContentWrapper,
  Title,
  Description,
  LinksWrapper,
} from './styles';
import { BlogModal } from 'components/Blog/BlogModal';

interface BlogFormPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    title: string;
    coverPreview?: string;
    sections: {
      _type: 'content' | 'product';
      _key?: string;
      name?: string;
      description?: string;
      content?: any;
      imagePreview?: string;
      image?: { asset?: { url: string } };
      affiliateLinks?: { label: string; url: string }[];
    }[];
  };
}

export const BlogFormPreview: React.FC<BlogFormPreviewProps> = ({
  isOpen,
  onClose,
  formData,
}) => {
  if (!formData) return null;

  return (
    <BlogModal isOpen={isOpen} onClose={onClose}>
      <div style={{ width: '100%' }}>
        <Title>{formData.title}</Title>
        {formData.sections.map((section, idx) => {
          const key = section._key || `section-${idx}`;
          const imagePreview = section.imagePreview || section.image?.asset?.url || '';

          if (section._type === 'content') {
            return (
              <SectionWrapper key={key}>
                <Description
                  dangerouslySetInnerHTML={{
                    __html: section.description || '',
                  }}
                />
              </SectionWrapper>
            );
          }

          if (section._type === 'product') {
            return (
              <ProductWrapper key={key}>
                {imagePreview && (
                  <ImageWrapper>
                    <Image
                      src={imagePreview}
                      alt={section.name || 'Product'}
                      width={200}
                      height={200}
                      objectFit="contain"
                    />
                  </ImageWrapper>
                )}

                <ContentWrapper>
                  {section.description && (
                    <Description
                      dangerouslySetInnerHTML={{ __html: section.description }}
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
      </div>
    </BlogModal>
  );
};
