import styled from 'styled-components';

export const BlogViewContentWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

export const BlogViewTitle = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const BlogViewDate = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.subTextColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 1rem;
`;

export const BlogViewSectionWrapper = styled.div`
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.25rem;
  }
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
  height: 200px;
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
    border: 1px dashed ${({ theme }) => theme.borderColor};
    border-radius: 8px;
    font-style: italic;
    color: ${({ theme }) => theme.subTextColor};
    background: ${({ theme }) => theme.cardBackground};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.base};
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
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.buttonText};
    background-color: ${({ theme }) => theme.primaryColor};
    padding: 0.4rem 0.85rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-decoration: none;
    display: inline-block;
    transition: background-color ${({ theme }) => theme.transition.normal};

    &:hover {
      background-color: ${({ theme }) => theme.buttonHoverBg};
    }
  }
`;


export const BlogViewMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.subTextColor};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 1rem;
`;

export const BlogViewCategory = styled.span`
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.buttonText};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: 6px 16px;
  border-radius: 999px;
  display: inline-block;
`;

