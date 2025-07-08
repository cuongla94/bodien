import { useRouter } from 'next/router';
import { Button, Container } from 'react-bootstrap';
import { FaPlus, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { AdminControlsData, AdminLinks } from 'config/admin-config';
import { AppLinks } from 'config/navigation-config';
import { ControlsContainer, ControlsGroup } from './styles';
import { AnimatedButton } from 'common/AnimatedButton';

interface AdminControlsProps {
  onLogout?: () => void;
}

export const AdminControls = ({ onLogout }: AdminControlsProps) => {
  const router = useRouter();
  const isDashboard = router.pathname === `${AdminLinks.adminDashboard}`;

  const logout = () => {
    localStorage.removeItem('bodien-admin-auth');
    window.location.href = `${AppLinks.home}`;
  };

  return (
    <Container className="mb-3">
      <ControlsContainer>
        <ControlsGroup>
          {isDashboard ? (
            <AnimatedButton
              onClick={() => router.push('/admin/blogs/create')}
              baseColor="black"
              hoverColor="white"
              textColor="white"
              borderColor="black"
              hoverTextColor="black"
              fontSize="sm"
            >
              <FaPlus style={{ marginRight: '0.4rem' }} />
              {AdminControlsData.navigation.add_blog}
            </AnimatedButton>
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
    </Container>
  );
};
