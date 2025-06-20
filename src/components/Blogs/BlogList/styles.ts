// components/Admin/styles.ts
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

export const Wrapper = styled(Col)`
  margin: 0 auto;
`;

export const MessageBox = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.95rem;
`;
