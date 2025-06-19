import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

export const TagsWrapper = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem; /* Slightly larger for better spacing on wrap */
`;

export const ThemedBadge = styled(Badge)<{
  bgColor?: string;
  textColor?: string;
}>`
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.highlight || '#6c757d'};
  color: ${({ textColor, theme }) => textColor || theme.buttonText || '#fff'};
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;
