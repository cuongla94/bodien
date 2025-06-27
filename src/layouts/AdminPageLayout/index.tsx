import { Container } from 'react-bootstrap';
import { AppNavbar } from 'common/Navbar';
import { ReactNode, useEffect } from 'react';
import { MainInfo } from 'config';
import { ITheme } from 'types/theme';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { AdminControls } from 'components/Admin/AdminControls';
import { ScrollToTopButton } from 'common/ScrollToTopButton';
import { LayoutWrapper, PageWrapper } from './styles';
import { Footer } from 'layouts/Footer';

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
          <AdminControls />
          <PageWrapper className={className || ''}>{children}</PageWrapper>
      </Container>
        <Footer />
      <ScrollToTopButton />
    </LayoutWrapper>
  );
}
