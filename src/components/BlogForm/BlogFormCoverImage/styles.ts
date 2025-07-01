import styled from 'styled-components';

export const FullWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 260px; /* Match UploadArea for consistency */
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const CoverImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Prevent overflow */
  border-radius: 8px;
`;

export const UploadArea = styled.div`
  width: 100%;
  max-width: 100%;
  height: 260px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }

  div {
    margin-top: 8px;
    font-size: 0.9rem;
    color: #666;
  }
`;

export const UploadIconButton = styled.div`
  background-color: black;
  color: white;
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
  }
`;

export const RemoveIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

