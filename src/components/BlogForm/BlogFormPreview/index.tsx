import React from 'react';
import Image from 'next/image';

import {
  SectionWrapper,
  ProductWrapper,
  ImageWrapper,
  ContentWrapper,
  Title,
  LinksWrapper,
} from './styles';
import { BlogModal } from 'components/Blog/BlogModal';
import { QuillPreview } from 'components/QuillPreview';
import { Col, Row } from 'react-bootstrap';

interface BlogFormPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    title: string;
    coverPreview?: string;
    sections: {
      _type: 'content' | 'product' | 'image';
      _key?: string;
      name?: string;
      description?: string;
      content?: any;
      imagePreview?: string;
      image?: { asset?: { url: string } };
      affiliateLinks?: { label: string; url: string }[];
      width?: number;
      height?: number;
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
          const imagePreview =
            section.imagePreview || section.image?.asset?.url || '';

          if (section._type === 'content') {
            return (
              <SectionWrapper key={key}>
                {section.description && (
                  <QuillPreview value={section.description} type="content" />
                )}
              </SectionWrapper>
            );
          }

          if (section._type === 'product') {
            return (
              <ProductWrapper key={key}>
                <Row className="align-items-start">
                  {imagePreview && (
                    <Col md={5}>
                      <ImageWrapper>
                        <Image
                          src={imagePreview}
                          alt={section.name || 'Product'}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </ImageWrapper>
                    </Col>
                  )}

                  <Col md={7}>
                    <ContentWrapper>
                      {section.description && (
                        <QuillPreview value={section.description} type="product" />
                      )}

                      {section.affiliateLinks?.length > 0 && (
                        <LinksWrapper>
                          {section.affiliateLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary me-2 mb-2"
                            >
                              {link.label}
                            </a>
                          ))}
                        </LinksWrapper>
                      )}
                    </ContentWrapper>
                  </Col>
                </Row>
              </ProductWrapper>
            );
          }

          if (section._type === 'image') {
            const width = section.width || 300;
            const height = section.height || 200;

            return (
              <SectionWrapper key={key} style={{ textAlign: 'center' }}>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Blog Image"
                    width={width}
                    height={height}
                    objectFit="contain"
                  />
                )}
              </SectionWrapper>
            );
          }

          return null;
        })}
      </div>
    </BlogModal>
  );
};
