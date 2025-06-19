import { Container } from 'react-bootstrap';
import { AppNavbar } from 'common/Navbar';
import { ReactNode, useEffect } from 'react';
import { MainInfo } from 'config';
import { ITheme } from 'types/theme';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { AdminControls } from 'components/Admin/AdminControls';
import { ScrollToTopButton } from 'common/ScrollToTopButton';
import { LayoutWrapper, PageWrapper, Footer, FooterText } from './styles';

interface IAdminPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminPageLayout({
  children,
  className,
}: IAdminPageLayoutProps) {
  const { theme } = useThemeProvider() as {
    theme: ITheme;
    toggleTheme: () => void;
  };

  useEffect(() => {
    if (theme?.type) {
      document.body.style.background = theme.background;
      document.body.style.color = theme.mainTextColor;
    }
  }, [theme]);

  return (
    <LayoutWrapper className={theme.type}>
      <Container className="flex-grow-1 d-flex flex-column">
        <AppNavbar />
        <hr />
        <AdminControls />
        <PageWrapper className={className || ''}>{children}</PageWrapper>
      </Container>
      <Footer>
        <Container>
          <FooterText>
            &copy; {new Date().getFullYear()} {MainInfo.footerCopyRight}
          </FooterText>
        </Container>
      </Footer>
      <ScrollToTopButton />
    </LayoutWrapper>
  );
}
