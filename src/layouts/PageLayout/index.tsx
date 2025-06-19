// components/Layout/PageLayout.tsx
import { Container } from 'react-bootstrap';
import { AppNavbar } from 'common/Navbar';
import { ReactNode } from 'react';
import { MainInfo } from 'config';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { ScrollToTopButton } from 'common/ScrollToTopButton';
import { LayoutWrapper, PageWrapper, Footer } from './styles';

interface IPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: IPageLayoutProps) {
  const { theme } = useThemeProvider();

  return (
    <LayoutWrapper>
      <Container className="flex-grow-1 d-flex flex-column">
        <AppNavbar />
        <hr />
        <PageWrapper className={`page-wrapper ${className || ''}`}>
          {children}
        </PageWrapper>
      </Container>

      <Footer>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} {MainInfo.footerCopyRight}
          </p>
        </Container>
      </Footer>

      <ScrollToTopButton />
    </LayoutWrapper>
  );
}
