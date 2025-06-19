import styled from 'styled-components';

export const SectionWrapper = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding: 1rem;
`;

export const ProductImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px dashed #ccc;
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
  background-color: white;
  border-radius: 50%;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #000;
  font-weight: 500;
`;

export const InvalidUrlText = styled.div`
  position: absolute;
  top: 65%;
  left: 0.9rem;
  font-size: 0.8rem;
  color: red;
`;
