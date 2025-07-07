import styled from 'styled-components';

export const LatestNewsNavControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;

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
