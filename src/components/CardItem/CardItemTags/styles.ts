import styled from 'styled-components';
import { Badge } from 'react-bootstrap';

export const TagsWrapper = styled.div`
  margin-bottom: 0.5rem; /* Bootstrap mb-2 = 0.5rem */
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem; /* Bootstrap gap-1 = 0.25rem */
`;

export const ThemedBadge = styled(Badge)<{
  bgColor?: string;
  textColor?: string;
}>`
  background-color: ${({ bgColor }) =>
    bgColor || '#6c757d'}; /* default to .bg-secondary */
  color: ${({ textColor }) => textColor || '#fff'};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
`;
