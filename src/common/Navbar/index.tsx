import { Navbar } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from 'common/ThemeToggle';
import { MainInfo } from 'config';
import LogoImage from 'assets/LogoImage.png';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { BrandWrapper, BrandTitle, Logo } from './styles';

export const AppNavbar = () => {
  const { theme } = useThemeProvider();

  const Brand = (
    <Link href="/" passHref legacyBehavior>
      <BrandWrapper>
        <Logo src={LogoImage} alt="Logo" width={32} height={32} />
        <BrandTitle color={theme?.mainTextColor}>
          {MainInfo.brandName}
        </BrandTitle>
      </BrandWrapper>
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
