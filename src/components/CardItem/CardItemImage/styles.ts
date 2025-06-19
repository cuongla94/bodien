import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  overflow: hidden;
  position: relative;
`;

export const StyledCardImage = styled(Card.Img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
`;

export const PlaceholderText = styled.span`
  color: #6c757d;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
