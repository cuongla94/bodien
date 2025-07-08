// components/Admin/styles.ts
import styled from 'styled-components';

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.lg}`};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;
