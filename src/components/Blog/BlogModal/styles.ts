import styled from "styled-components";

// Styled-components
export const BlogModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BlogModalContent = styled.div`
  background: #fff;
  max-width: 720px;
  width: 100%;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

export const BlogModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;
