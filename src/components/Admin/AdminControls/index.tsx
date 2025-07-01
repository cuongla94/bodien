// components/Admin/AdminControls.tsx
import { Button } from 'react-bootstrap';
import { FaPlus, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { AdminControlsData, AdminLinks } from 'config/admin-config';
import { ControlsContainer, ControlsGroup } from './styles';

interface AdminControlsProps {
  onLogout?: () => void;
}

export const AdminControls = ({ onLogout }: AdminControlsProps) => {
  const router = useRouter();
  const isDashboard = router.pathname === '/admin';

  const logout = () => {
    localStorage.removeItem('bodien-admin-auth');
    window.location.href = '/';
  };

  return (
    <ControlsContainer>
      <ControlsGroup>
        {isDashboard ? (
          <Button
            variant="primary"
            onClick={() => router.push(`${AdminLinks.blogCreate}`)}
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
  );
};
