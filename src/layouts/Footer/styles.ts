import styled from "styled-components";

export const FooterContainer = styled.footer`
  padding: 1rem 0;
  margin-top: auto;
`;

export const FooterText = styled.p`
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.subTextColor};
  font-size: 0.875rem;
`;
