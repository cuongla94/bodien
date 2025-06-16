import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from 'common/ThemeToggle';
import { MainInfo } from 'config';
import LogoImage from 'assets/LogoImage.png';
import { useThemeProvider } from 'hooks/useThemeProvider';

export const AppNavbar = () => {
  const { theme } = useThemeProvider(); 

  const Brand = (
    <Link
      href="/"
      className="d-flex align-items-center gap-2 text-decoration-none"
      style={{ textDecoration: 'none' }}
    >
      <Image
        src={LogoImage}
        alt="Logo"
        width={32}
        height={32}
        style={{
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
      <span style={{ color: theme?.mainTextColor }}>{MainInfo.brandName}</span>
    </Link>
  );  

  return (
    <Navbar
      variant={theme.type === 'dark' ? 'dark' : 'light'}
      className="fj-navbar fj-nav-base"
      bg="transparent"
      expand="lg"
    >
      <Navbar.Brand className="fj-navbar-brand">{Brand}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="ms-auto">
          <ThemeToggle />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};
