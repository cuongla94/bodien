import styled from 'styled-components';

export const SectionWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  display: inline-block;

  img {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    object-fit: contain;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
`;

export const Title = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  color: ${({ theme }) => theme.mainTextColor};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.subTextColor};
  margin: 0;

  p {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};

  a {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: ${({ theme }) => theme.fontFamily.button};
  }
`;

export const ContentQuillPreview = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};

  .ql-editor {
    padding: 0;
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-family: ${({ theme }) => theme.fontFamily.base};
    color: ${({ theme }) => theme.mainTextColor};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  }
`;

export const ProductQuillPreview = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  .ql-editor {
    padding: 0;
    line-height: ${({ theme }) => theme.lineHeights.normal};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: ${({ theme }) => theme.fontFamily.base};
    color: ${({ theme }) => theme.mainTextColor};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }
`;
