// HomePage.tsx
import { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import moment from 'moment';

import PageLayout from 'layouts/PageLayout';
import { AuthorIntro } from 'components/AuthorIntro';
import PreviewAlert from 'components/PreviewAlert';

import { useGetBlogsPages } from 'utils/Pagination';
import { getPaginatedBlogs } from 'apis';
import { BlogList } from 'components/BlogList';
import { BlogFilterControls } from 'components/Blog';

export default function HomePage({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  const [searchTerm, setSearchTerm] = useState('');

  const { data, size, setSize, hitEnd } = useGetBlogsPages({ filter });
  const currentData = data || [blogs];
  const flatBlogs = currentData.flat();

  const filteredBlogs = flatBlogs
    .filter(blog => !blog.hidden)
    .filter(blog =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const hasBlogs = filteredBlogs.length > 0;
  const totalBlogs = filteredBlogs.length;
  const hasMorePosts = !hitEnd && totalBlogs > 3;

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <BlogFilterControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortAsc={!!filter.date.asc}
        onToggleSort={() =>
          setFilter(prev => ({
            ...prev,
            date: { asc: prev.date.asc ? 0 : 1 },
          }))
        }
      />

      {hasBlogs ? (
        <>
          <Row className="mb-5" style={{ overflowY: 'hidden' }}>
            <BlogList data={[filteredBlogs]} />
          </Row>

          {hasMorePosts && (
            <div className="text-center mb-4">
              <Button
                onClick={() => setSize(size + 1)}
                size="lg"
                variant="outline-secondary"
              >
                Load More ({totalBlogs} posts loaded)
              </Button>
            </div>
          )}

          {hitEnd && totalBlogs > 1 && (
            <div className="text-center mb-4">
              <p className="text-muted small">All {totalBlogs} posts loaded</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <h4>No Posts Available</h4>
          <p className="text-muted mb-0">
            There are currently no blog posts to display. Please check back
            later!
          </p>
        </div>
      )}
    </PageLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: 'desc' });
  const publicBlogs = blogs.filter(blog => !blog.hidden);

  return {
    props: {
      blogs: publicBlogs,
      preview,
    },
    revalidate: 1,
  };
}
