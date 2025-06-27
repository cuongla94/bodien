import styled from 'styled-components';

export const CategoryListContainer = styled.div`
  max-height: 160px;
  overflow-y: auto;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  scroll-behavior: smooth;

  &:hover {
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #bbb #f5f5f5;

  /* Webkit scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #ff4e91, #6e8efb);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #ff2689, #5e7ffb);
  }
`;
