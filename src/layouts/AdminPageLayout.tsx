import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { AdminControls } from 'components/Admin/AdminControls';

interface AdminPageLayoutProps {
  children: ReactNode;
}

export const AdminPageLayout = ({ children }: AdminPageLayoutProps) => {
  return (
    <Container className="py-4">
      <AdminControls />
      {children}
    </Container>
  );
};
