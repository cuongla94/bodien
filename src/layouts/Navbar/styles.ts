// styles.ts
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
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
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
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLinkItem = styled.a<{ $active?: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.primaryColor : theme.mainTextColor};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
`;


export const ActiveLinkUnderline = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  background-color: ${({ theme }) => theme.primaryColor};
  transform-origin: left center;
  transition: transform 0.3s ease;
  will-change: transform;
`;


