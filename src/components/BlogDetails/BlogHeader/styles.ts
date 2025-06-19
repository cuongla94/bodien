import styled from 'styled-components';

export const BlogHeaderWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const BlogTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const BlogDate = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const CoverImageWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
`;
