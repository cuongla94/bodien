import styled from 'styled-components';

interface ScrollButtonProps {
  $show: boolean;
}

export const ScrollButton = styled.button<ScrollButtonProps>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: #343a40;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
`;
