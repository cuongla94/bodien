import styled from 'styled-components';
import Image from 'next/image';
import { Navbar } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1050;
  transition: all 0.3s ease;
  background: ${({ $scrolled, theme }) =>
    $scrolled ? theme.navbarBackground || 'rgba(255,255,255,0.8)' : 'transparent'};
  box-shadow: ${({ $scrolled, theme }) =>
    $scrolled
      ? theme.type === 'dark'
        ? '0 2px 6px rgba(255,255,255,0.08)'
        : '0 2px 4px rgba(0,0,0,0.1)'
      : 'none'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(8px)' : 'none')};
`;

export const NavbarBrandWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavbarBrandTitle = styled.span`
  color: ${({ theme }) => theme.mainTextColor};
  font-weight: bold;
  font-size: 1.6rem;
`;

export const NavbarLogo = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: none; // Optional: hide on small screens or implement hamburger menu
  }
`;

export const NavLinkItem = styled.a`
  color: ${({ theme }) => theme.linkColor};
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.linkHover};
    text-decoration: underline;
  }
`;

