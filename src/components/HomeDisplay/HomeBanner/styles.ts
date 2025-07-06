import styled from 'styled-components';

export const HomeBannerWrapper = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.footerBackground};
`;

export const HomeBannerRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const HomeBannerContent = styled.div`
  max-width: 600px;
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

export const HomeBannerImageWrapper = styled.div`
  flex: 1;
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    display: block;
  }
`;

export const HomeBannerCarousel = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};

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
