import styled from 'styled-components';

export const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const SectionHeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const SectionHeaderLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: #000;
  position: relative;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  padding-bottom: 2px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0%;
    height: 2px;
    background-color: #2563eb;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;
