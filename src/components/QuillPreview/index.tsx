import React from 'react';
import dynamic from 'next/dynamic';
import { ContentQuillPreview, ProductQuillPreview } from './styles';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface QuillPreviewProps {
  value: string;
  type?: 'content' | 'product';
}

export const QuillPreview: React.FC<QuillPreviewProps> = ({ value, type = 'content' }) => {
  if (!value) return null;

  const Wrapper = type === 'product' ? ProductQuillPreview : ContentQuillPreview;

  return (
    <Wrapper>
      <ReactQuill value={value} readOnly theme="bubble" />
    </Wrapper>
  );
};
