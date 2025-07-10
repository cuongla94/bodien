import styled from 'styled-components';

export const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SectionHeaderTitleRow = styled.div`
  display: flex;
  align-items: baseline;
`;

export const SectionHeaderTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  margin: 0;
`;

export const SectionHeaderNavControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0;

  button {
    background: ${({ theme }) => theme.primaryColor};
    color: white;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.linkHover};
    }

    &:disabled {
      background: ${({ theme }) => theme.disabledBg};
      color: ${({ theme }) => theme.disabledText};
      cursor: not-allowed;
    }
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.mainTextColor};
  }
`;

export const SectionHeaderStyledLink = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.linkColor};
  position: relative;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  padding: 0 4px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0%;
    height: 2px;
    background-color: ${({ theme }) => theme.linkColor};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;



export const InlineLinkWithBrackets = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.mainTextColor || '#374151'};

  span {
    padding: 0 4px;
    display: inline-block;
  }
`;
