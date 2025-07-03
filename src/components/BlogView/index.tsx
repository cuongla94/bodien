import React from 'react';
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from 'utils/html/portableTextComponent';
import { BlogModal } from 'components/Blog/BlogModal';
import { QuillPreview } from 'components/QuillPreview';

import {
  BlogViewTitle,
  BlogViewDate,
  BlogViewSectionWrapper,
  BlogViewProductWrapper,
  BlogViewImageWrapper,
  BlogViewContentSection,
  BlogViewLinksWrapper,
  BlogViewContentWrapper,
} from './styles';

interface BlogSection {
  _type: 'content' | 'product' | 'image';
  _key?: string;
  name?: string;
  content?: any;
  description?: any;
  imagePreview?: string;
  image?: { asset?: { url: string } };
  affiliateLinks?: { label: string; url: string; clicks?: number }[];
  width?: number;
  height?: number;
}

interface BlogViewProps {
  title: string;
  date?: string;
  sections: BlogSection[];
  isPreview?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  title,
  date,
  sections,
  isPreview = false,
  isOpen = false,
  onClose = () => {},
}) => {
  const content = (
    <BlogViewContentWrapper>
      <BlogViewTitle>{title}</BlogViewTitle>
      <BlogViewDate>
        {date ? `Published on ${date}` : `Current time: ${new Date().toLocaleString()}`}
    </BlogViewDate>


      {sections.map((section, idx) => {
        const key = section._key || `section-${idx}`;
        const imagePreview = section.imagePreview || section.image?.asset?.url || '';

        if (section._type === 'content') {
          return (
            <BlogViewSectionWrapper key={key}>
              {isPreview && typeof section.description === 'string' ? (
                <QuillPreview value={section.description} type="content" />
              ) : (
                section.content && (
                  <PortableText
                    value={section.content}
                    components={portableTextComponents}
                  />
                )
              )}
            </BlogViewSectionWrapper>
          );
        }

        if (section._type === 'product') {
          return (
            <BlogViewProductWrapper key={key}>
              <Row className="align-items-start">
                <Col md={5}>
                  <BlogViewImageWrapper>
                    {imagePreview ? (
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
                    ) : (
                      <div className="placeholder">No Image Available</div>
                    )}
                  </BlogViewImageWrapper>
                </Col>

                <Col md={7}>
                  <BlogViewContentSection>
                    {section.description && (
                      isPreview && typeof section.description === 'string' ? (
                        <QuillPreview value={section.description} type="product" />
                      ) : (
                        Array.isArray(section.description) && (
                          <PortableText
                            value={section.description}
                            components={portableTextComponents}
                          />
                        )
                      )
                    )}

                    {section.affiliateLinks?.length > 0 && (
                      <BlogViewLinksWrapper>
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
                      </BlogViewLinksWrapper>
                    )}
                  </BlogViewContentSection>
                </Col>
              </Row>
            </BlogViewProductWrapper>
          );
        }

        if (section._type === 'image') {
          const width = section.width || 300;
          const height = section.height || 200;

          return (
            <BlogViewSectionWrapper key={key} style={{ textAlign: 'center' }}>
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Blog Image"
                  width={width}
                  height={height}
                  objectFit="contain"
                />
              ) : (
                <div
                  style={{
                    width: width,
                    height: height,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    fontStyle: 'italic',
                    color: '#999',
                    background: '#f9f9f9',
                    textAlign: 'center',
                    fontSize: '0.95rem',
                  }}
                >
                  No Image Available
                </div>
              )}
            </BlogViewSectionWrapper>
          );
        }

        return null;
      })}
    </BlogViewContentWrapper>
  );

  return isPreview ? (
    <BlogModal isOpen={isOpen} onClose={onClose}>
      {content}
    </BlogModal>
  ) : (
    content
  );
};
