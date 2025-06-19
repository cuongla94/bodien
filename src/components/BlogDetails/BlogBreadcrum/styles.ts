import styled from 'styled-components';

export const BreadcrumbWrapper = styled.div`
  font-size: 15px;
`;

export const BreadcrumbText = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.linkColor};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.linkHover};
    text-decoration: underline;
  }
`;
