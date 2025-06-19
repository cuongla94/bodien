import { useState } from 'react';
import { useRouter } from 'next/router';
import { ITheme } from 'types/theme';
import { useGetBlogsPages } from 'common/Pagination';
import { useAdminAuth } from 'hooks/useAdminAuth';
import { useThemeProvider } from 'hooks/useThemeProvider';
import axios from 'axios';
import { AdminPageLayout } from 'layouts';
import { AdminDashboard } from 'components/AdminDashBoard';

export default function AdminPage() {
  const router = useRouter();
  const { theme } = useThemeProvider() as { theme: ITheme };
  const { authenticated, loading: authLoading, login, logout } = useAdminAuth();

  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ view: { list: 0 }, date: { asc: 0 } });

  const { data, size, setSize, hitEnd } = useGetBlogsPages({ filter });
  const currentData = data || [[]];
  const filteredBlogs = currentData.flat().filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const [formLoading, setFormLoading] = useState(false);
  const handlePasswordSubmit = (password: string) => {
    setFormLoading(true);
    setError('');
    const success = login(password);
    if (!success) setError('Incorrect password');
    setFormLoading(false);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/blogs/edit/${id}`);
  };  

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<{ id: string; title: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = (id: string, title: string) => {
    setSelectedBlog({ id, title });
    setShowConfirm(true);
    setDeleteError('');
    setDeleteSuccess('');
  };

  const confirmDelete = async () => {
    if (!selectedBlog?.id) {
      setDeleteError('No blog selected for deletion.');
      return;
    }

    setDeleteLoading(true);

    try {
      const response = await axios.delete(`/api/blogs/delete`, {
        params: { id: selectedBlog.id },
      });

      const result = response.data;

      if (result.success) {
        setDeleteSuccess(`Blog post "${selectedBlog.title}" deleted successfully`);
        setSize(1);
        setTimeout(() => setDeleteSuccess(''), 5000);
      } else {
        throw new Error(result.message || 'Delete operation failed');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error.message || 'Unknown error';
      setDeleteError(`Failed to delete blog post: ${errorMessage}`);
    } finally {
      setDeleteLoading(false);
      setShowConfirm(false);
      setSelectedBlog(null);
    }
  };

  const handleToggleHidden = async (id: string, hidden: boolean) => {
    try {
      await axios.patch(`/api/blog/toggle-visibility`, { id, hidden });
      setSize(1); // Refresh list
    } catch (error: any) {
      setDeleteError('Failed to toggle blog visibility.');
      setTimeout(() => setDeleteError(''), 5000);
    }
  };

  const dismissAlert = (type: 'success' | 'error') => {
    if (type === 'success') setDeleteSuccess('');
    if (type === 'error') setDeleteError('');
  };

  if (authLoading) return null;

  return (
    <AdminPageLayout>
      <AdminDashboard
        authenticated={authenticated}
        filteredBlogs={filteredBlogs}
        theme={theme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleHidden={handleToggleHidden}
        deleteSuccess={deleteSuccess}
        deleteError={deleteError}
        dismissAlert={dismissAlert}
        hitEnd={hitEnd}
        size={size}
        setSize={setSize}
        formatDate={formatDate}
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        selectedBlog={selectedBlog}
        deleteLoading={deleteLoading}
        confirmDelete={confirmDelete}
        handlePasswordSubmit={handlePasswordSubmit}
        error={error}
        formLoading={formLoading}
        setSelectedBlog={setSelectedBlog}
      />
    </AdminPageLayout>
  );
}
