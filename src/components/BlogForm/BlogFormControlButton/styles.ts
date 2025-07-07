import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const ColumnWithBottomPadding = styled(Col)`
  padding-bottom: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: 0;
  }
`;

export const FirstColumn = styled(ColumnWithBottomPadding)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 0;
  }
`;

export const MiddleColumn = styled(ColumnWithBottomPadding)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 0.2rem;
  }
`;

export const LastColumn = styled(ColumnWithBottomPadding)`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 0;
  }
`;
