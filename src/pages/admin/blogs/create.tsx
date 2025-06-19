import { BlogForm } from 'components/BlogForm';
import { AdminPageLayout } from 'layouts';

export default function CreateBlogPage() {
  return (
    <AdminPageLayout>
      <BlogForm mode="create" />
    </AdminPageLayout>
  );
}
