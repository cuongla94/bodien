// AppNavbar.tsx
import { useEffect, useState, useRef } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MainInfo } from 'config';
import LogoImage from 'assets/LogoImage.png';
import {
  NavbarBrandWrapper,
  NavbarBrandTitle,
  NavbarLogo,
  StyledNavbar,
  NavLinks,
  NavLinkItem,
} from './styles';
import { AppLinks } from 'config/navigation-config';

interface AppNavBarProps {
  isAdmin: boolean;
  activePath: string;
}

export const AppNavbar = ({ isAdmin, activePath }: AppNavBarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledNavbar $scrolled={scrolled} variant="light" expand="lg">
      <Container style={{ padding: '1rem 0' }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link href="/" passHref legacyBehavior>
            <a style={{ textDecoration: 'none' }}>
              <NavbarBrandWrapper>
                <NavbarLogo src={LogoImage} alt="Logo" width={158} height={50} />
                {/* <NavbarBrandTitle>{MainInfo.brandName}</NavbarBrandTitle> */}
              </NavbarBrandWrapper>
            </a>
          </Link>

          {!isAdmin && (
            <NavLinks>
              {Object.values(AppLinks).map((item) => (
                <Link key={item.link} href={item.link} passHref legacyBehavior>
                  <NavLinkItem $active={activePath === item.link}>
                    {item.title}
                  </NavLinkItem>
                </Link>
              ))}
            </NavLinks>
          )}
        </div>
      </Container>
    </StyledNavbar>
  );
};
