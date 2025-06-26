import styled from 'styled-components';

export const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const CoverImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const UploadArea = styled.div`
  width: 100%;
  max-width: 100%;
  height: 260px; /* ✅ Reduce height */
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
    color: white; /* ✅ ensure child icons get white fallback */
  }
`;


export const RemoveIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 18px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const FullWidthWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
`;
