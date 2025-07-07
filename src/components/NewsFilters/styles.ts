import styled from 'styled-components';
import { themes } from '../../theme/ThemeContext';

const fontSizeMobile = themes.light.responsiveFontSize.body.mobile;
const fontSizeDesktop = themes.light.responsiveFontSize.body.desktop;

export const NewsFiltersWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  > .row {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const NewsFiltersCustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const NewsFiltersStyledLabel = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid ${themes.light.inputBorder};
  border-radius: ${themes.light.borderRadius.sm};
  font-size: ${fontSizeDesktop};
  background-color: ${themes.light.inputBg};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    font-size: ${fontSizeMobile};
  }
`;

export const NewsFiltersCustomOptionsWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid ${themes.light.inputBorder};
  border-radius: ${themes.light.borderRadius.sm};
  background: ${themes.light.inputBg};
  z-index: ${themes.light.zIndex.dropdown};
  max-height: 240px;
  overflow-y: auto;
  font-size: ${themes.light.responsiveFontSize.body.mobile};

  @media (min-width: ${themes.light.breakpoints.sm}) {
    font-size: ${themes.light.fontSize.base};
  }
`;


export const NewsFilterInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 1px solid ${themes.light.borderColor};
  font-size: ${fontSizeDesktop};
  outline: none;
  box-sizing: border-box;

  @media (max-width: 576px) {
    font-size: ${fontSizeMobile};
  }
`;

export const NewsFiltersCustomOption = styled.div<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#e0f0ff' : 'white')};
  color: ${({ $active }) => ($active ? '#1d4ed8' : '#111')};
  font-size: ${themes.light.fontSize.base};

  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: ${themes.light.breakpoints.sm}) {
    font-size: ${themes.light.fontSize.sm};
  }
`;


export const NewsFilterSelect = styled.select`
  width: 100%;
  height: 40px;
  padding: 0.5rem 1rem;
  border: 1px solid ${themes.light.inputBorder};
  border-radius: ${themes.light.borderRadius.sm};
  font-size: ${fontSizeDesktop};
  background-color: ${themes.light.inputBg};
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  box-sizing: border-box;

  @media (max-width: 576px) {
    font-size: ${fontSizeMobile};
  }
`;

export const SortCol = styled.div`
  padding-left: 0 !important;
`;

export const CategoryCol = styled.div`
  @media (max-width: 576px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

export const SourceCol = styled.div`
  padding-right: 0 !important;

  @media (max-width: 576px) {
    padding-left: 0 !important;
    margin-top: 0.5rem;
  }
`;
