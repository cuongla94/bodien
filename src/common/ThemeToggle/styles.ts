import styled from 'styled-components';

export const ToggleLabel = styled.label`
  .react-toggle {
    position: relative;
    display: inline-block;
    width: 60px; /* ← Updated from 62px */
    height: 30px;
  }

  .react-toggle-track {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.cardBackground};
    transition: background 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .react-toggle--checked .react-toggle-track {
    background-color: ${({ theme }) => theme.linkColor};
  }

  .react-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.highlight};
    border: 2px solid ${({ theme }) => theme.mainTextColor};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    box-shadow: 0 0 6px rgba(0, 132, 255, 0.7);
  }

  .react-toggle--checked .react-toggle-thumb {
    left: 32px; /* ← Adjusted from 34px to fit 60px track */
    background-color: ${({ theme }) => theme.buttonBg};
  }

  .react-toggle-track-check,
  .react-toggle-track-x {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 26px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    z-index: 1;
    opacity: 1;
  }

  .react-toggle-track-check {
    left: 5px;
    color: ${({ theme }) => theme.mainTextColor};
  }

  .react-toggle-track-x {
    right: 5px;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Keep icons always visible */
  .react-toggle:hover .react-toggle-track-check,
  .react-toggle:hover .react-toggle-track-x {
    opacity: 1;
  }
`;
