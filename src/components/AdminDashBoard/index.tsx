import { Alert } from 'react-bootstrap';
import { AdminPasswordForm } from 'components/Admin/AdminPasswordForm';
import { ConfirmationModal } from 'common/modals';
import { AdminBlogList } from './AdminBlogList'; 

interface AdminDashboardProps {
  authenticated: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: any;
  setFilter: (filter: any) => void;
  filteredBlogs: any[];
  theme: any;
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string) => void;
  onToggleHidden: (id: string, hidden: boolean) => void;
  deleteSuccess: string;
  deleteError: string;
  dismissAlert: (type: 'success' | 'error') => void;
  hitEnd: boolean;
  size: number;
  setSize: (size: number) => void;
  formatDate: (date: string) => string;
  showConfirm: boolean;
  selectedBlog: { id: string; title: string } | null;
  confirmDelete: () => void;
  deleteLoading: boolean;
  setShowConfirm: (show: boolean) => void;
  setSelectedBlog: (blog: { id: string; title: string } | null) => void;
  error: string;
  formLoading: boolean;
  handlePasswordSubmit: (password: string) => void;
}

export const AdminDashboard = ({
  authenticated,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  filteredBlogs,
  theme,
  onEdit,
  onDelete,
  onToggleHidden,
  deleteSuccess,
  deleteError,
  dismissAlert,
  hitEnd,
  size,
  setSize,
  formatDate,
  showConfirm,
  selectedBlog,
  confirmDelete,
  deleteLoading,
  setShowConfirm,
  setSelectedBlog,
  error,
  formLoading,
  handlePasswordSubmit,
}: AdminDashboardProps) => {
  return (
    <>
      <AdminPasswordForm
        show={!authenticated}
        onSubmit={handlePasswordSubmit}
        error={error}
        loading={formLoading}
      />

      {authenticated && (
        <>
          {deleteSuccess && (
            <Alert variant="success" dismissible onClose={() => dismissAlert('success')}>
              {deleteSuccess}
            </Alert>
          )}

          {deleteError && (
            <Alert variant="danger" dismissible onClose={() => dismissAlert('error')}>
              {deleteError}
            </Alert>
          )}

          {/* ✅ Replace blog list logic with AdminBlogList */}
          <AdminBlogList
            authenticated={authenticated}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filter={filter}
            setFilter={setFilter}
            filteredBlogs={filteredBlogs}
            theme={theme}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleHidden={onToggleHidden}
            deleteSuccess={deleteSuccess}
            deleteError={deleteError}
            dismissAlert={dismissAlert}
            hitEnd={hitEnd}
            size={size}
            setSize={setSize}
            formatDate={formatDate}
          />
        </>
      )}

      <ConfirmationModal
        show={showConfirm}
        title="Delete Confirmation"
        message={`Are you sure you want to delete the blog post "${selectedBlog?.title}"? This action cannot be undone.`}
        confirmLabel={deleteLoading ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedBlog(null);
        }}
      />
    </>
  );
};
