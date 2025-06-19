import { BlogForm } from 'components/BlogForm';
import { AdminPageLayout } from 'layouts';
import { getBlogById } from 'apis';

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const blog = await getBlogById(id);

    if (!blog) {
      return { notFound: true };
    }

    return {
      props: {
        initialData: blog
      }
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { notFound: true };
  }
}

export default function EditBlogPage({ initialData }) {
  return (
    <AdminPageLayout>
      <BlogForm mode="edit" initialData={initialData} />
    </AdminPageLayout>
  );
}
