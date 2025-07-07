import PageLayout from 'layouts/PageLayout';
import { Blogs } from 'components/Blogs';
import { Breadcrumbs } from 'common/Breadcrumbs';
import { Container } from 'react-bootstrap';

const BlogsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blogs' }
  ];

  return (
    <PageLayout className="blog-list-page">
      <Container className="mt-5">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        <h1 className="mb-4">All Blog Posts</h1>
        <Blogs
          isAdmin={false}
          authenticated={false} />
      </Container>
    </PageLayout>
  );
};

export default BlogsPage;
