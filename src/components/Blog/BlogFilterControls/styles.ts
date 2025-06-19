// components/BlogFilterControls/styles.ts
import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const SortControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: ${({ theme }) => theme.subTextColor};
    font-size: 0.875rem;
  }

  svg {
    color: ${({ theme }) => theme.mainTextColor};
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const SearchInput = styled.input`
  max-width: 300px;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.375rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.mainTextColor};
  background-color: ${({ theme }) => theme.background};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${({ theme }) => theme.primaryColor || theme.linkColor};
  }

  &::placeholder {
    color: ${({ theme }) => theme.subTextColor};
  }
`;
