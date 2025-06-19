import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

export const CoverWrapper = styled.div`
  max-width: 400px;
  margin-top: 1rem;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.cardShadow || '0 1px 4px rgba(0, 0, 0, 0.1)'};
`;

export const CoverImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  object-fit: cover;
`;

export const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 6px;
  right: 6px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.mainTextColor};
  border-radius: 50%;
  padding: 4px;
  font-size: 0.9rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
    color: #000;
  }
`;
