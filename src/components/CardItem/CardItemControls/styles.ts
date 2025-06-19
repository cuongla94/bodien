import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem; /* Bootstrap gap-2 = 0.5rem */
`;

export const ThemedButton = styled(Button)<{ bg?: string; text?: string }>`
  background-color: ${({ bg }) => bg || 'initial'};
  color: ${({ text }) => text || 'initial'};
  border: none;

  &:hover {
    opacity: 0.9;
  }
`;
