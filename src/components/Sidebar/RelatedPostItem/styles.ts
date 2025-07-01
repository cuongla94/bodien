import styled from "styled-components";

// Styles
export const RelatedPostItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  margin-bottom: 1.25rem;

  &:hover h4 {
    color: #2563eb;
  }
`;

export const RelatedPostItemThumbnail = styled.div`
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
`;

export const RelatedPostItemContent = styled.div`
  flex: 1;
`;

export const RelatedPostItemTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const RelatedPostItemDateText = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
`;

export const RelatedPostItemNoImage = styled.div`
  width: 80px;
  height: 80px;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  text-align: center;
`;
