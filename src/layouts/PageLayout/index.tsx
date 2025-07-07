// components/Layout/PageLayout.tsx
import { Container } from 'react-bootstrap';
import { AppNavbar } from 'layouts/Navbar';
import { ReactNode } from 'react';
import { ScrollToTopButton } from 'common/ScrollToTopButton';
import { LayoutWrapper } from './styles';
import { Footer } from 'layouts/Footer';
import { useRouter } from 'next/router';

interface IPageLayoutProps {
  children: ReactNode;
  className?: string;
  isAdmin?: boolean;
}

export default function PageLayout({
  children,
  isAdmin = false,
}: IPageLayoutProps) {
  const router = useRouter();
  const activePath = router.pathname;

  return (
    <LayoutWrapper>
      <AppNavbar isAdmin={isAdmin} activePath={activePath} />
      {children}
      <Footer activePath={activePath} />
      <ScrollToTopButton />
    </LayoutWrapper>
  );
}
