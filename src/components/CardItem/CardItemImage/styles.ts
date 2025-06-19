import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.cardBackground || '#f8f9fa'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor || '#dee2e6'};

  @media (max-width: 576px) {
    height: 150px;
  }

  /* Optional: Override background if no image */
  &.no-image {
    background-color: #e2e8f0; /* light gray */
  }
`;

export const StyledCardImage = styled(Card.Img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
`;

export const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.subTextColor || '#6c757d'};
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
`;
