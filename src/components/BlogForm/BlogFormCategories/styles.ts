import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    box-shadow: none;
    border-color: #ccc;
  }
`;

export const CategoryListContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  /* Scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: #bbb #f5f5f5;

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

export const CategoryOption = styled.div<{ selected?: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${({ selected }) => (selected ? '#0d6efd' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#212529')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0d6efd' : '#f8f9fa')};
  }
`;
