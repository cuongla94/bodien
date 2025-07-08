// components/BlogContent/index.tsx
import { PortableText } from '@portabletext/react';
import { BlogContentHighlightCode } from './BlogContentHighlightCode';
import { urlFor } from 'apis';

import {
  BlogContentWrapper,
  BlogImageWrapper,
  ImageAlt,
  ImagePlaceholder,
  CodeFilename,
  EmptyContent,
} from './styles';

const components = {
  types: {
    code: ({
      value,
    }: {
      value: { language: string; code: string; filename: string };
    }) => (
      <BlogContentHighlightCode language={value.language}>
        {value.code}
        {value.filename && <CodeFilename>{value.filename}</CodeFilename>}
      </BlogContentHighlightCode>
    ),

    image: ({
      value,
    }: {
      value: { asset: any; alt: string; position?: string };
    }) => {
      const position = value.position || 'center';
      const imageUrl = value.asset
        ? urlFor(value.asset).height(600).fit('max').url()
        : null;

      if (!imageUrl) {
        return (
          <ImagePlaceholder>
            <p>Image not available</p>
            {value.alt && <ImageAlt>{value.alt}</ImageAlt>}
          </ImagePlaceholder>
        );
      }

      return (
        <BlogImageWrapper position={position}>
          <img
            src={imageUrl}
            alt={value.alt || 'Blog image'}
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('image-error');
            }}
          />
          {value.alt && <ImageAlt>{value.alt}</ImageAlt>}
        </BlogImageWrapper>
      );
    },
  },
};

interface IBlogContentProps {
  content: any[];
}

export const BlogContent = ({ content }: IBlogContentProps) => {
  if (!content || content.length === 0) {
    return (
      <EmptyContent>
        <p>No content available.</p>
      </EmptyContent>
    );
  }

  return (
    <BlogContentWrapper>
      <PortableText value={content} components={components} />
    </BlogContentWrapper>
  );
};
