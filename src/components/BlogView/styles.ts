import styled from 'styled-components';

export const BlogViewContentWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

export const BlogViewTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const BlogViewDate = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const BlogViewSectionWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const BlogViewProductWrapper = styled.div`
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const BlogViewImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 200px; /* Ensures consistent height */
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 8px;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
    border-radius: 8px;
    font-style: italic;
    color: #999;
    background: #f9f9f9;
    text-align: center;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;


export const BlogViewContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
`;

export const BlogViewLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 5px;

  a {
    font-size: 0.875rem;
  }
`;
