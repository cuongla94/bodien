import styled from 'styled-components';

export const CategoryListContainer = styled.div`
  height: 150px;
  overflow-y: scroll !important;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  display: block;

  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #ccc #f1f1f1;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(to bottom, #ff4e91, #6e8efb);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #ff2689, #5e7ffb);
  }
`;
