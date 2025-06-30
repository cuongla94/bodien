import { Button } from "react-bootstrap";
import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  // border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  height: 100%;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;

export const ImageStyled = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  // border-radius: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  height: 180px;
  // border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background-color: #f2f2f2;
  color: #888;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
`;

export const TitleStyled = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #1d4ed8;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  text-decoration: none;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
    color: #2563eb;
  }
`;

export const DescriptionStyled = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.75rem;
  flex-grow: 1;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CategoryStyled = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: 0.25rem;
`;

export const FooterStyled = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-top: auto;
`;

export const ReadMoreLink = styled.span`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const AnalyticsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme?.subTextColor || '#6c757d'};
  font-size: 0.8rem;
  font-weight: 500;
`;

export const AnalyticsItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: ${({ theme }) => theme?.highlight || '#2563eb'};
    width: 14px;
    height: 14px;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const ThemedButton = styled(Button)<{ bg?: string; text?: string }>`
  background-color: ${({ bg, theme }) => bg || theme?.buttonBg || '#2563eb'};
  color: ${({ text, theme }) => text || theme?.buttonText || '#fff'};
  border: none;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  font-weight: 500;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, opacity 0.2s ease;

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
