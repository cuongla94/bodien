import { BlogForm } from 'components/BlogForm';
import { getBlogById } from 'apis';
import PageLayout from 'layouts/PageLayout';

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
    <PageLayout isAdmin>
      <BlogForm mode="edit" initialData={initialData} />
    </PageLayout>
  );
}
