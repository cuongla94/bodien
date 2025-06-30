import { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { ThemeToggle } from 'common/ThemeToggle';
import { MainInfo } from 'config';
import LogoImage from 'assets/LogoImage.png';
import { useThemeProvider } from 'hooks/useThemeProvider';
import {
  NavbarBrandWrapper,
  NavbarBrandTitle,
  NavbarLogo,
  StyledNavbar,
  NavLinks,
  NavLinkItem,
} from './styles';
import { AppLinks } from 'config/navigation-config';

export const AppNavbar = () => {
  const { theme } = useThemeProvider();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Brand = (
    <Link href="/" passHref legacyBehavior>
      <a style={{ textDecoration: 'none' }}>
        <NavbarBrandWrapper>
          <NavbarLogo src={LogoImage} alt="Logo" width={32} height={32} />
          <NavbarBrandTitle>{MainInfo.brandName}</NavbarBrandTitle>
        </NavbarBrandWrapper>
      </a>
    </Link>
  );

  return (
    <StyledNavbar
      $scrolled={scrolled}
      variant={theme.type === 'dark' ? 'dark' : 'light'}
      expand="lg"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {Brand}

        <NavLinks>
          {[AppLinks.home, AppLinks.news, AppLinks.blogs].map((item) => (
            <Link key={item.link} href={item.link} passHref legacyBehavior>
              <NavLinkItem>{item.title}</NavLinkItem>
            </Link>
          ))}
        </NavLinks>

        <ThemeToggle />
      </div>
    </StyledNavbar>
  );
};

