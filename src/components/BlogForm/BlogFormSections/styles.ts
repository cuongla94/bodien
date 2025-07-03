import styled from 'styled-components';

export const SectionWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  // padding: 1rem;
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
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: #f5f5f5;
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

// ✅ ADDED BELOW

export const FullWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 260px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
`;

export const CoverImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

export const UploadArea = styled.div`
  width: 100%;
  max-width: 100%;
  height: 260px;
  border: 2px dashed ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.highlight || '#aaa'};
  }

  div {
    margin-top: 8px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.subTextColor};
  }
`;

export const UploadIconButton = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.mainTextColor || 'black'};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

