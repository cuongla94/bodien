import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: #d4eff5;
  border-radius: 2rem;
  padding: 0.75rem;
`;

export const TagPill = styled.span`
  background-color: #b9e3ec;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TagInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  min-width: 120px;
  flex-grow: 1;

  &:focus {
    outline: none;
    background: white;
    border-radius: 2rem;
    box-shadow: 0 0 0 2px #0d6efd;
  }
`;

export const TagCloseIcon = styled(FaTimes)`
  cursor: pointer;
`;
