import styled from 'styled-components';

//
// ─── CARD ITEM ──────────────────────────────────────────────────────────────
//

export const CardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.cardBackground || '#fff'};
  border: 1px solid #eee;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow || '0 1px 3px rgba(0, 0, 0, 0.05)'};
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  height: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor || '#007bff'};
    box-shadow: ${({ theme }) => theme.boxShadow || '0 8px 20px rgba(0, 0, 0, 0.08)'};
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

  display: -webkit-box;
  -webkit-line-clamp: 4; /* Clamp to 4 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

export const CardItemButton = styled.button<{
  size?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  bg?: string;
  text?: string;
}>`
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  background-color: ${({ variant, bg }) => {
    if (bg) return bg;
    if (variant === 'danger') return '#ef4444'; // red
    if (variant === 'secondary') return '#6b7280'; // gray
    return '#2563eb'; // default blue
  }};

  color: ${({ variant, text }) => {
    if (text) return text;
    return '#ffffff';
  }};

  &:hover {
    opacity: 0.9;
  }
`;


// CardItemReadMoreLink
export const CardItemReadMoreLink = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme?.linkColor};
  text-decoration: none;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme?.linkHover};
  }
`;

// CardItemFooterStyled
export const CardItemFooterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme?.subTextColor};
  margin-top: auto;
`;

//
// ─── CARD ITEM HORIZONTAL ──────────────────────────────────────────────────────────────
//
export const CardItemHorizontalWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: row;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.cardBackground || '#fff'};
  box-shadow: ${({ theme }) => theme.cardShadow || '0 2px 4px rgba(0, 0, 0, 0.05)'};
  padding: 1rem;
  height: 100%; /* ensures it fills column height */
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow || '0 8px 24px rgba(0,0,0,0.12)'};
    transform: translateY(-2px);
  }
`;

export const CardItemHorizontalImageWrapper = styled.div`
  min-width: 100px;
  height: 100px;
  background-color: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #888;
  padding: 1rem 0;
`;

export const CardItemHorizontalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-height: 100%;
`;


export const CardItemHorizontalCategory = styled.div`
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const CardItemHorizontalTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

export const CardItemHorizontalDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.subTextColor || '#6b7280'};
  margin: 0.5rem 0;
  line-height: 1.4;
  flex-grow: 1;

  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  min-height: 6.5em;
`;

export const CardItemHorizontalMeta = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.25rem;
  gap: 1rem;

  svg {
    margin-right: 0.25rem;
    vertical-align: middle;
  }
`;

export const CardItemHorizontalReadMore = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme?.primaryColor || '#111827'};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  font-weight: 600;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0%;
    height: 1px;
    background-color: ${({ theme }) => theme?.primaryColor || '#111827'};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme?.primaryColor || '#111827'};
  }
`;

