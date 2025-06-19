import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  min-height: 48px;
`;

export const TagPill = styled.div`
  background: #d1ecf1;
  color: #0c5460;
  border-radius: 12px;
  padding: 3px 10px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TagInput = styled.input`
  border: none;
  outline: none;
  background-color: #f1f3f5;
  border-radius: 12px;
  padding: 6px 10px;
  font-size: 0.85rem;
  min-width: 100px;
  max-width: 160px;
  flex-shrink: 0;
`;

export const TagCloseIcon = styled(FaTimes)`
  cursor: pointer;
`;
