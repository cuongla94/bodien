import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { CardItem } from 'components/CardItem';
import { Wrapper, MessageBox } from './styles';
import { Toast } from 'common/Toast';
import { AppLinks } from 'config/navigation-config';
import { IBlogListProps, IBlogPost } from 'types/blog';
import { getFormattedDate } from 'utils/dates';
import { Blog } from 'components/Blog';

export const BlogList = ({
  data = [],
  theme,
  isAdmin = false,
  authenticated = true,
  onEdit = () => {},
  onDelete = () => {},
  onToggleHidden = () => {},
  deleteSuccess,
  deleteError,
  dismissAlert = () => {},
}: IBlogListProps) => {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<IBlogPost | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [slugFromUrl, setSlugFromUrl] = useState<string | null>(null);

  const router = useRouter();

  const blogs = Array.isArray(data[0]) ? data.flat() : data;

  // Extract ?post=slug from URL on initial mount
useEffect(() => {
  const querySlug = new URLSearchParams(window.location.search).get('post');
  if (querySlug) {
    setSlugFromUrl(querySlug);
  }
}, []);

  // Handle delete toasts and modal open after blogs are ready
  useEffect(() => {
    if (deleteSuccess) {
      setToast({ type: 'success', message: deleteSuccess });
      dismissAlert('success');
    }
    if (deleteError) {
      setToast({ type: 'error', message: deleteError });
      dismissAlert('error');
    }

if (slugFromUrl && blogs.length > 0 && !selectedBlog) {
  const matchedBlog = blogs.find((b) => b.slug === slugFromUrl);
  if (matchedBlog) {
    handleReadMore(matchedBlog, false); // don't push URL again
    setSlugFromUrl(null); // ✅ prevent re-trigger
  }
}
  }, [deleteSuccess, deleteError, dismissAlert, blogs, selectedBlog, slugFromUrl]);

  const handleReadMore = (blog: IBlogPost, updateUrl = true) => {
    setSelectedBlog(blog);
    setModalOpen(true);
    if (updateUrl) {
      window.history.pushState({}, '', `${AppLinks.blogs.link}?post=${blog.slug}`);
    }
  };

const handleCloseModal = () => {
  setModalOpen(false);
  setSelectedBlog(null);
  window.history.pushState({}, '', AppLinks.blogs.link); // clears ?post=
};


  if (isAdmin && !authenticated) return null;

  return (
    <Wrapper md={12}>
      {toast && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}>
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {blogs.length > 0 ? (
        <>
          <Row>
            {blogs.map((blog) => (
              <Col key={blog._id || blog.slug} lg={4} md={4} className="mb-4">
                <CardItem
                  title={blog.title}
                  category={blog.category}
                  publishedDate={getFormattedDate(blog)}
                  updatedDate={blog._updatedAt}
                  image={blog.coverImage}
                  url={undefined}
                  tags={blog.tags || []}
                  isAdmin={isAdmin}
                  onEdit={isAdmin ? () => onEdit(blog._id!) : undefined}
                  onDelete={isAdmin ? () => onDelete(blog._id!, blog.title) : undefined}
                  onToggleHidden={
                    isAdmin ? () => onToggleHidden(blog._id!, !blog.hidden) : undefined
                  }
                  hidden={isAdmin ? blog.hidden : undefined}
                  theme={theme}
                  numOfViews={blog.numOfViews || 0}
                  numOfShares={blog.numOfShares || 0}
                  onReadMoreClick={() => handleReadMore(blog)}
                  slug={blog.slug}
                />
              </Col>
            ))}
          </Row>

          {selectedBlog && (
            <Blog
              blog={selectedBlog}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              allPosts={blogs}
              onReadMoreClick={handleReadMore}
              theme={theme}
            />
          )}
        </>
      ) : (
        <MessageBox>
          <p>No blogs found.</p>
        </MessageBox>
      )}
    </Wrapper>
  );
};
