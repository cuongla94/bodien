import { Container } from 'react-bootstrap';
import { AppNavbar } from 'common/Navbar';
import { ReactNode } from 'react';
import { MainInfo } from 'config';
import { ITheme } from 'types/theme';
import { useThemeProvider } from 'hooks/useThemeProvider';

interface IPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: IPageLayoutProps) {
  const { theme, toggleTheme } = useThemeProvider() as { theme: ITheme; toggleTheme: () => void };
  
  return (
    <div className={`d-flex flex-column min-vh-100 ${theme.type}`}>
      <Container className="flex-grow-1 d-flex flex-column">
        <AppNavbar />
        <hr/>
        <div
          className={`page-wrapper flex-grow-1 ${className || ''}`}
          style={{ overflowY: 'hidden' }}
        >
          {children}
        </div>
      </Container>
      <footer className="bg-light border-top py-3 mt-auto">
        <Container>
          <div className="text-center">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} {MainInfo.footerCopyRight}
            </p>
          </div>
        </Container>
      </footer>
      <style jsx global>{`
        html, body {
          background: ${theme.background};
          color: ${theme.mainTextColor};
          transition: color 0.2s ease-out 0s, background 0.2s ease-out 0s;
        }
      `}
      </style>
    </div>
  )
}