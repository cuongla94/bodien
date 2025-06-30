import styled from 'styled-components';

export const HomeSection = styled.section`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const HomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const HomeSeeMore = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
