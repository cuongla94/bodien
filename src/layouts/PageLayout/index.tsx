// components/Layout/PageLayout.tsx
import { Container } from 'react-bootstrap';
import { AppNavbar } from 'layouts/Navbar';
import { ReactNode } from 'react';
import { ScrollToTopButton } from 'common/ScrollToTopButton';
import { LayoutWrapper, PageWrapper } from './styles';
import { Footer } from 'layouts/Footer';
import { AdminControls } from 'components/Admin/AdminControls';

interface IPageLayoutProps {
  children: ReactNode;
  className?: string;
  isAdmin?: boolean;
}

export default function PageLayout({
  children,
  className,
  isAdmin = false,
}: IPageLayoutProps) {
  return (
    <LayoutWrapper>
      <AppNavbar />
        {children}
      <Footer />
      <ScrollToTopButton />
    </LayoutWrapper>
  );
}
