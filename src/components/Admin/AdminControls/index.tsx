import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaPlus, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { AdminControlsData, AdminLinks } from 'config/admin-config';
import { ControlsContainer, ControlsGroup } from './styles';
import { AppLinks } from 'config/navigation-config';
import { BlogFormModal } from 'components/Modals/BlogFormModal';
import { BlogForm } from 'components/BlogForm';

interface AdminControlsProps {
  onLogout?: () => void;
}

export const AdminControls = ({ onLogout }: AdminControlsProps) => {
  const router = useRouter();
  const isDashboard = router.pathname === `${AdminLinks.adminDashboard}`;
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    localStorage.removeItem('bodien-admin-auth');
    window.location.href = `${AppLinks.home}`;
  };

  return (
    <Container className='mb-3'>
      <ControlsContainer>
        <ControlsGroup>
          {isDashboard ? (
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              className="d-flex align-items-center gap-2"
            >
              <FaPlus />
              {AdminControlsData.navigation.add_blog}
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => router.push(`${AdminLinks.adminDashboard}`)}
              className="d-flex align-items-center gap-2"
            >
              <FaHome />
              {AdminControlsData.navigation.dashboard}
            </Button>
          )}
        </ControlsGroup>

        <div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={logout}
            className="d-flex align-items-center gap-2"
          >
            <FaSignOutAlt />
            {AdminControlsData.logout}
          </Button>
        </div>
      </ControlsContainer>

      {/* Blog Form Modal */}
      <BlogFormModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <BlogForm mode="create" />
      </BlogFormModal>
    </Container>
  );
};
