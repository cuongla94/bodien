import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from 'utils/html/portableTextComponent';
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
  BlogViewMetaRow,
  BlogViewCategory,
} from './styles';
import { BlogViewModal } from 'common/Modals';
import moment from 'moment';
import { BlogViewProps } from './types';
import { useRouter } from 'next/router';
import { useTrackBlogView } from 'hooks/blogHooks';
import { AppApis } from 'config/apis-config';

export const BlogView: React.FC<BlogViewProps> = ({
  slug,
  title,
  date,
  category,
  sections,
  isPreview = false,
  isFormPreview = false,
  isOpen = false,
  onClose = () => {},
  children
}) => {
  const router = useRouter();
  const previousUrl = useRef<string | null>(null);

  // ✅ Track view (only if not preview)
  useTrackBlogView(!isFormPreview ? slug : '');
  useEffect(() => {
    if (isOpen && slug && !isFormPreview) {
      previousUrl.current = window.location.pathname;
      const newUrl = `${AppApis.blogs.default}/${slug}`;
      window.history.pushState(null, '', newUrl);
    }

    return () => {
      if (isOpen && previousUrl.current) {
        window.history.pushState(null, '', previousUrl.current);
      }
    };
  }, [isOpen, slug]);

  const content = (
    <BlogViewContentWrapper>
      <BlogViewTitle>{title}</BlogViewTitle>
      <BlogViewMetaRow>
        <BlogViewCategory>
          {category.title || 'Uncategorized'}
        </BlogViewCategory>
        <BlogViewDate>
          {date
            ? `Published on ${moment(date).format('MMMM DD, YYYY')}`
            : `Current time: ${moment().format('MMMM DD, YYYY')}`}
        </BlogViewDate>
      </BlogViewMetaRow>

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
                            style={{ textDecoration: 'none' }}
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
    <BlogViewModal isOpen={isOpen} onClose={onClose}>
      <>
        {content}
        {children && <div style={{ marginTop: '2rem' }}>{children}</div>}
      </>
    </BlogViewModal>
  ) : (
    <>
      {content}
      {children && <div style={{ marginTop: '2rem' }}>{children}</div>}
    </>
  );
};
