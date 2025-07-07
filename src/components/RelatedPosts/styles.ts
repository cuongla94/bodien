// src/components/RelatedPosts/styles.ts
import styled from 'styled-components';

export const RelatedPostsSectionWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

export const RelatedPostsSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  color: ${({ theme }) => theme.mainTextColor};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
