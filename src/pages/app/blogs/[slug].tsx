import { useRouter } from 'next/router';

const BlogSlugPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Blog Post: {slug}</h1>
      <p>This is a placeholder page for the blog post with slug: <strong>{slug}</strong></p>
    </div>
  );
};

export default BlogSlugPage;
