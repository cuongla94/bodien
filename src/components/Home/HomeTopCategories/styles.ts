// src/components/HomeTopCategories/styles.ts
import Image from 'next/image';
import styled from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
background: linear-gradient(180deg, #F0F4F8 0%, #F9FAFB 100%);
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.mainTextColor};
`;

export const HomeCategoryItemCard = styled.div`
  width: 100%;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;

  &:hover .overlay {
    opacity: 1;
  }

  &:hover .border-animate {
    width: 100%;
  }
`;

export const HomeCategoryItemImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  width: 100%;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

export const HomeCategoryItemImage = styled(Image)`
  object-fit: fill;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const HomeCategoryItemOverlayText = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  z-index: 2;
  pointer-events: none;

  background-color: rgba(0, 0, 0, 0.5);
  padding: 6px 12px;
  border-radius: 8px;
`;


export const HomeCategoryItemBottomBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: ${({ theme }) => theme.primaryColor};
  width: 0;
  transition: width 0.3s ease;
  z-index: 1;

  ${HomeCategoryItemCard}:hover & {
    width: 100%;
  }
`;
