// src/components/HomeTopCategories/styles.ts
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

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  justify-items: center;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
`;

export const CategoryCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; // center image and text horizontally
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;


export const CategoryImage = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .no-image {
    color: ${({ theme }) => theme.subTextColor};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-style: italic;
    font-family: ${({ theme }) => theme.fontFamily.subtext};
    text-align: center;
    width: 100%;
  }
`;

export const CategoryName = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fontFamily.base};
  color: ${({ theme }) => theme.mainTextColor};
  font-size: ${({ theme }) => theme.fontSize.md};

  span {
    color: ${({ theme }) => theme.primaryColor};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;
