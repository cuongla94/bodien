import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { ThemeToggle } from 'common/ThemeToggle';
import { MainInfo } from 'config';
import LogoImage from 'assets/LogoImage.png';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { NavbarBrandWrapper, NavbarBrandTitle, NavbarLogo } from './styles';

export const AppNavbar = () => {
  const { theme } = useThemeProvider();

  const Brand = (
    <Link href="/" passHref legacyBehavior>
      <a style={{ textDecoration: 'none' }}>
        <NavbarBrandWrapper>
          <NavbarLogo src={LogoImage} alt="Logo" width={32} height={32} />
          <NavbarBrandTitle color={theme?.mainTextColor}>
            {MainInfo.brandName}
          </NavbarBrandTitle>
        </NavbarBrandWrapper>
      </a>
    </Link>
  );

  return (
    <Navbar
      variant={theme.type === 'dark' ? 'dark' : 'light'}
      bg="transparent"
      expand="lg"
      className="fj-navbar fj-nav-base"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {Brand}
        <ThemeToggle />
      </div>
    </Navbar>
  );
};
