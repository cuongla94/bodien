import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { useAdminAuth } from 'hooks/useAdminAuth';
import { AdminPageLayout } from 'layouts';
import { Dashboard } from 'components/Dashboard';
import { AdminPasswordForm } from 'components/Admin/AdminPasswordForm';
import { ConfirmationModal } from 'common/modals';

export default function AdminPage() {
  const { theme } = useThemeProvider();
  const { authenticated, loading: authLoading, login } = useAdminAuth();
  const router = useRouter();

  const [error, setError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePasswordSubmit = (password: string) => {
    setFormLoading(true);
    const success = login(password);
    if (!success) setError('Incorrect password');
    setFormLoading(false);
  };

  const handleEdit = (id: string) => router.push(`/admin/blogs/edit/${id}`);

  const handleDelete = (id: string, title: string) => {
    setSelectedBlog({ id, title });
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlog?.id) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/blogs/delete`, {
        params: { id: selectedBlog.id },
      });
      setDeleteSuccess(`Deleted "${selectedBlog.title}"`);
    } catch {
      setDeleteError('Failed to delete blog');
    } finally {
      setDeleteLoading(false);
      setShowConfirm(false);
      setSelectedBlog(null);
    }
  };

  const handleToggleHidden = async (id: string, hidden: boolean) => {
    try {
      await axios.patch(`/api/blog/toggle-visibility`, { id, hidden });
    } catch {
      setDeleteError('Failed to toggle visibility');
    }
  };

  const dismissAlert = (type: 'success' | 'error') => {
    if (type === 'success') setDeleteSuccess('');
    else setDeleteError('');
  };

  if (authLoading) return null;

  return (
    <AdminPageLayout>
      <AdminPasswordForm
        show={!authenticated}
        onSubmit={handlePasswordSubmit}
        error={error}
        loading={formLoading}
      />

      {authenticated && (
        <Dashboard
          mode="admin"
          theme={theme}
          authenticated={authenticated}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleHidden={handleToggleHidden}
          deleteSuccess={deleteSuccess}
          deleteError={deleteError}
          dismissAlert={dismissAlert}
        />
      )}

      <ConfirmationModal
        show={showConfirm}
        title="Delete Confirmation"
        message={`Are you sure you want to delete "${selectedBlog?.title}"?`}
        confirmLabel={deleteLoading ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedBlog(null);
        }}
      />
    </AdminPageLayout>
  );
}
