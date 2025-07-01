import { BlogForm } from 'components/BlogForm';
import PageLayout from 'layouts/PageLayout';

export default function CreateBlogPage() {
  return (
    <PageLayout isAdmin>
      <BlogForm mode="create" />
    </PageLayout>
  );
}
