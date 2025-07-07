import PageLayout from 'layouts/PageLayout';
import { Blogs } from 'components/Blogs';
import { Container } from 'react-bootstrap';
import { PageTitle } from 'common/PageTitle';

const BlogsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blogs' }
  ];

  return (
    <PageLayout className="blog-list-page">
      <PageTitle title="All Blog Posts" breadcrumbs={breadcrumbItems} />
      <Container className="mt-5">
        <Blogs isAdmin={false} authenticated={false} />
      </Container>
    </PageLayout>
  );
};

export default BlogsPage;
