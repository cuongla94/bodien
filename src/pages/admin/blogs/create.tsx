// pages/admin/blogs/create.tsx
import { Container } from 'react-bootstrap';
import { BlogCreateForm } from 'components/BlogCreateForm';
import {AdminPageLayout} from 'layouts';

export default function CreateBlogPage() {
  return (
    <AdminPageLayout>
      <BlogCreateForm />
    </AdminPageLayout>
  );
};
