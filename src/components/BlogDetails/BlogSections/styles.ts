import styled from 'styled-components';

export const SectionWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
  display: inline-block;

  img {
    border-radius: 8px;
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
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.subTextColor};
  margin: 0;

  p {
    margin-bottom: 5px;
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 5px;

  a {
    font-size: 0.875rem;
  }
`;
