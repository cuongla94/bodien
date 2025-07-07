// src/components/RelatedPosts/RelatedPostItem/styles.ts
import styled from 'styled-components';

export const RelatedPostItemWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover h4 {
    color: ${({ theme }) => theme.linkHover};
  }
`;

export const RelatedPostItemThumbnail = styled.div`
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

export const RelatedPostItemContent = styled.div`
  flex: 1;
`;

export const RelatedPostItemTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  margin: 0;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const RelatedPostItemDateText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.subTextColor};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
`;

export const RelatedPostItemNoImage = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.subTextColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
`;
