import styled from 'styled-components';

export const AnalyticsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.8rem;
  font-weight: 500;
`;

export const AnalyticsItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: ${({ theme }) => theme.highlight};
    width: 14px;
    height: 14px;
  }
`;
