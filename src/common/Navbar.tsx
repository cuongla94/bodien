import { Navbar } from 'react-bootstrap';
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
      className="d-flex align-items-center gap-2"
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
      <span
        style={{
          color: theme?.mainTextColor,
          fontWeight: 'bold',
          fontSize: '25px'
        }}
      >
        {MainInfo.brandName}
      </span>
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
