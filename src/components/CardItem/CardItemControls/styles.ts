import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ThemedButton = styled(Button)<{ bg?: string; text?: string }>`
  background-color: ${({ bg, theme }) => bg || theme.buttonBg};
  color: ${({ text, theme }) => text || theme.buttonText};
  border: none;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  font-weight: 500;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBg || '#ccc'};
    color: ${({ theme }) => theme.disabledText || '#666'};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
