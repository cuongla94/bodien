// src/components/HomeBanner/styles.ts
import styled from 'styled-components';

export const HomeBannerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const HomeBannerContent = styled.div`
  max-width: 600px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

export const HomeBannerHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.mainTextColor};
  font-family: ${({ theme }) => theme.fontFamily.heading};

  span {
    color: ${({ theme }) => theme.primaryColor};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
`;

export const HomeBannerSubheading = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.subTextColor};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fontFamily.subtext};
`;

export const HomeBannerCTAButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.75rem 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSize.base};
  border-radius: 50px;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fontFamily.button};
  transition: background-color ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBg};
  }
`;

export const HomeBannerRight = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    flex: 1;
    margin-left: ${({ theme }) => theme.spacing.lg};
  }

  .carousel-placeholder {
    background-color: ${({ theme }) => theme.cardBackground};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    text-align: center;
    color: ${({ theme }) => theme.subTextColor};
    font-style: italic;
    font-family: ${({ theme }) => theme.fontFamily.subtext};
  }
`;
