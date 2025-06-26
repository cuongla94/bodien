// components/Layout/PageLayout.tsx
import { Container } from 'react-bootstrap';
import { AppNavbar } from 'common/Navbar';
import { ReactNode } from 'react';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { ScrollToTopButton } from 'common/ScrollToTopButton';
import { LayoutWrapper, PageWrapper } from './styles';
import { Footer } from 'layouts/Footer';

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
        <PageWrapper className={`page-wrapper ${className || ''}`}>
          {children}
        </PageWrapper>
      </Container>
      <Footer />
      <ScrollToTopButton />
    </LayoutWrapper>
  );
}
