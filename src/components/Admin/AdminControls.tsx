import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";

interface AdminControlsProps {
  total: number;
  onLogout?: () => void;
}

export const AdminControls = ({ total, onLogout }: AdminControlsProps) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('bodien-admin-auth');
    if (onLogout) {
      onLogout();
    } else {
      router.reload();
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-0">Admin Dashboard ({total})</h1>
      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={() => router.push('/admin/blogs/create')}
          className="d-flex align-items-center gap-2"
        >
          <FaPlus />
          Add Blog
        </Button>
        <Button variant="outline-danger" size="sm" onClick={logout}>
          🔒 Logout
        </Button>
      </div>
    </div>
  );
};
