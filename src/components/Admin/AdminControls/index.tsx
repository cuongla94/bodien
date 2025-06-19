// components/Admin/AdminControls.tsx
import { Button } from 'react-bootstrap';
import { FaPlus, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { AdminControlsData } from 'config/admin-config';
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
        <Button
          variant="outline-secondary"
          onClick={() => router.push('/')}
          className="d-flex align-items-center gap-2"
        >
          <FiExternalLink />
          Public Site
        </Button>

        {isDashboard ? (
          <Button
            variant="primary"
            onClick={() => router.push('/admin/blogs/create')}
            className="d-flex align-items-center gap-2"
          >
            <FaPlus />
            {AdminControlsData.navigation.add_blog}
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={() => router.push('/admin')}
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
