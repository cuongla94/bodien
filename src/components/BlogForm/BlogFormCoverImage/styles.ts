import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

export const CoverWrapper = styled.div`
  max-width: 400px;
  margin-top: 1rem;
  position: relative;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  padding: 2px;
`;
