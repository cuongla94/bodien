import styled from 'styled-components';
import { Button } from 'react-bootstrap';

//
// ─── CARD ITEM ──────────────────────────────────────────────────────────────
//

export const CardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.cardBackground || '#fff'};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow || '0 2px 8px rgba(0,0,0,0.05)'};
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  height: 100%;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow || '0 8px 24px rgba(0,0,0,0.12)'};
    transform: translateY(-4px);
  }
`;

export const CardItemImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

export const CardItemPlaceholderImage = styled.div`
  width: 100%;
  height: 220px;
  background-color: #f2f2f2;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
`;

export const CardItemContent = styled.div`
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CardItemCategory = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme?.primaryColor || '#2563eb'};
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  width: fit-content; /* ensures it only takes up as much space as needed */
`;

export const CardItemTitle = styled.a`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme?.mainTextColor || '#111827'};
  margin-bottom: 0.5rem;
  line-height: 1.4;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme?.linkHover || '#2563eb'};
  }
`;

export const CardItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subTextColor || '#6b7280'};
  margin-bottom: 1rem;
  flex-grow: 1;
`;

export const CardItemFooter = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.subTextColor || '#888'};
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const CardItemFooterItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CardItemControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const CardItemButton = styled(Button)<{ bg?: string; text?: string }>`
  background-color: ${({ bg, theme }) => bg || theme?.buttonBg || '#2563eb'};
  color: ${({ text, theme }) => text || theme?.buttonText || '#fff'};
  border: none;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  font-weight: 500;
  border-radius: 0.25rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme?.disabledBg || '#ccc'};
    color: ${({ theme }) => theme?.disabledText || '#666'};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// CardItemReadMoreLink
export const CardItemReadMoreLink = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme?.linkColor || '#2563eb'};
  text-decoration: none;
  margin-left: auto;

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme?.linkHover || '#1D4ED8'};
  }
`;

// CardItemFooterStyled
export const CardItemFooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme?.subTextColor || '#888'};
  margin-top: auto;
`;

