import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: ${({ theme }) => theme.codeBackground};
  border-radius: 2rem;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: background 0.3s ease;
`;

export const TagPill = styled.span`
  background-color: ${({ theme }) => theme.highlight};
  padding: 0.4rem 0.9rem;
  border-radius: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.mainTextColor};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const TagInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  min-width: 120px;
  flex-grow: 1;
  color: ${({ theme }) => theme.mainTextColor};
  font-family: ${({ theme }) => theme.fontFamily};

  &:focus {
    background: ${({ theme }) => theme.cardBackground};
    border-radius: 2rem;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor};
  }

  &::placeholder {
    color: ${({ theme }) => theme.subTextColor};
  }
`;

export const TagCloseIcon = styled(FaTimes)`
  cursor: pointer;
  color: ${({ theme }) => theme.subTextColor};

  &:hover {
    color: ${({ theme }) => theme.errorColor || '#dc3545'};
  }
`;
