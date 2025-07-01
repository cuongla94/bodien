import { useEffect, useState } from 'react';
import PageLayout from 'layouts/PageLayout';
import { BlogList } from 'components/Blogs/BlogList';
import { getAllBlogs } from 'apis';
import { IBlogPost } from 'types/blog';
import { Spinner } from 'common/Spinner';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optional admin state if needed
  const isAdmin = false;
  const authenticated = true;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const all = await getAllBlogs();
        setBlogs(all);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <PageLayout className="blog-list-page">
      <div className="mt-5">
        <h1 className="mb-4">All Blog Posts</h1>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <BlogList
            data={blogs}
            isAdmin={isAdmin}
            authenticated={authenticated}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default BlogsPage;
