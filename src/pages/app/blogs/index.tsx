import PageLayout from 'layouts/PageLayout';
import { Blogs } from 'components/Blogs';
import { Breadcrumbs } from 'common/Breadcrumbs';

const BlogsPage = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blogs' }
  ];

  return (
    <PageLayout className="blog-list-page">
      <div className="mt-5">
        <Breadcrumbs items={breadcrumbItems} className="mb-3" />
        <h1 className="mb-4">All Blog Posts</h1>
        <Blogs
          isAdmin={false}
          authenticated={false} />
      </div>
    </PageLayout>
  );
};

export default BlogsPage;
