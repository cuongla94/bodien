import { PortableText } from '@portabletext/react';
import HighlightCode from 'components/HighlightCode';
import { urlFor } from 'apis';

const components = {
  types: {
    code: ({ value }: { value: { language: string; code: string; filename: string } }) => {
      return (
        <HighlightCode language={value.language}>
          {value.code}
          <div className="code-filename">{value.filename}</div>
        </HighlightCode>
      );
    },
    image: ({ value }: { value: { asset: any; alt: string; position?: string } }) => {
      const position = value.position || 'center';
      
      // Safe image URL generation
      const getImageUrl = () => {
        if (value.asset) {
          return urlFor(value.asset).height(600).fit('max').url();
        }
        return null;
      };

      const imageUrl = getImageUrl();
      
      if (!imageUrl) {
        return (
          <div className="blog-image-placeholder">
            <p className="text-muted">Image not available</p>
            {value.alt && <div className="image-alt">{value.alt}</div>}
          </div>
        );
      }

      return (
        <div className={`blog-image blog-image-${position}`}>
          <img 
            src={imageUrl} 
            alt={value.alt || 'Blog image'} 
            className="img-fluid rounded"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('image-error');
            }}
          />
          {value.alt && <div className="image-alt">{value.alt}</div>}
        </div>
      );
    }
  }
};

interface IBlogContentProps {
  content: any[];
}

export const BlogContent = ({ content }: IBlogContentProps) => {
  if (!content || content.length === 0) {
    return (
      <div className="blog-content-empty">
        <p className="text-muted">No content available.</p>
      </div>
    );
  }

  return (
    <div className="blog-content">
      <PortableText
        value={content}
        components={components}
      />
    </div>
  );
};