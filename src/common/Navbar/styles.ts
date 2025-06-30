import styled from 'styled-components';
import Image from 'next/image';

export const NavbarBrandWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

export const NavbarBrandTitle = styled.span`
  color: ${({ theme }) => theme.mainTextColor};
  font-weight: bold;
  font-size: 1.6rem;
  text-decoration: none;
`;

export const NavbarLogo = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;
