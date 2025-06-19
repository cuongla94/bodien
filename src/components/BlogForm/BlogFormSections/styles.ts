import styled from 'styled-components';

export const SectionWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding: 1rem;
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: all 0.3s ease;
`;

export const ProductImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.codeBackground};
  border-radius: 10px;
  border: 1px dashed ${({ theme }) => theme.borderColor};
  overflow: hidden;
  position: relative;
`;

export const ProductImagePreview = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
`;

export const RemoveIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.mainTextColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
    color: #000;
  }
`;

export const UploadPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${({ theme }) => theme.subTextColor};
  font-weight: 500;
  font-size: 0.95rem;
`;

export const InvalidUrlText = styled.div`
  position: absolute;
  top: 65%;
  left: 0.9rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.errorColor || 'red'};
`;
