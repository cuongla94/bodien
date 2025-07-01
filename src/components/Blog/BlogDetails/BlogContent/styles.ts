// components/BlogContent/styles.ts
import styled from 'styled-components';

export const BlogContentWrapper = styled.div`
  line-height: ${({ theme }) => theme.lineHeightBase || '1.7'};
  font-size: ${({ theme }) => theme.fontSizeBase || '1rem'};
  color: ${({ theme }) => theme.mainTextColor};
  font-family: ${({ theme }) => theme.fontFamily};
`;

export const BlogImageWrapper = styled.div<{ position: string }>`
  text-align: ${({ position }) => position};
  margin: 1.5rem 0;

  &.image-error {
    background-color: #f8d7da;
    padding: 1rem;
    border-radius: 6px;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    display: block;
  }
`;

export const ImageAlt = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.subTextColor};
  margin-top: 0.25rem;
  text-align: center;
`;

export const ImagePlaceholder = styled.div`
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  color: #6c757d;
`;

export const CodeFilename = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.subTextColor};
  margin-top: 0.25rem;
  font-style: italic;
`;

export const EmptyContent = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.subTextColor};
  text-align: center;
`;
