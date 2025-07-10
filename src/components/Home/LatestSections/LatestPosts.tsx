import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { getAllBlogs } from 'apis';
import { AppLinks } from 'config/navigation-config';
import { HomeSection } from '../styles';
import { getFormattedDate } from 'utils/dates';
import { SectionHeader } from 'common/SectionHeader';
import { HomeConfig } from 'config/home-config';
import { Blog } from 'components/Blog';
import { IBlogPost } from 'types/blog';
import { Sidebar } from 'components/Sidebar';
import { CardItemHorizontal } from 'components/CardItem/CardItemHorizontal';
import { CardItem } from 'components/CardItem';

interface LatestPostsProps {
  theme?: any;
}

export const LatestPosts = ({ theme }: LatestPostsProps) => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IBlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const blogs = await getAllBlogs();
      const latestPosts = blogs
        .filter((post) => !post.hidden)
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
        .slice(0, 9);

      setPosts(latestPosts);
    }

    fetchPosts();
  }, []);

  const handleReadMoreClick = (post: IBlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <HomeSection className="container">
      <SectionHeader
        title={HomeConfig.postsTitle}
        hideLink={false}
        href={`${AppLinks.blogs.link}?sort=date_desc`}
      />

      <Row className="g-4">
        <Col lg={9} md={12}>
          {posts.length === 0 ? (
            <p>No Posts Available.</p>
          ) : (
            <Row className="g-4">
              {posts.map((post) => (
                <Col key={post._id} xs={4}>
                  <CardItem
                    type="blog"
                    title={post.title}
                    category={post.category}
                    image={post.coverImage}
                    publishedDate={post.publishedAt}
                    updatedDate={post._updatedAt}
                    url={undefined}
                    theme={theme}
                    isAdmin={false}
                    numOfViews={post.numOfViews}
                    numOfShares={post.numOfShares}
                    hidden={post.hidden}
                    onReadMoreClick={() => handleReadMoreClick(post)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>

        <Col lg={3} md={12}>
          <Sidebar
            topPosts={[]}
            trending={[]}
            popular={posts}
            categories={[]}
            onPostClick={handleReadMoreClick}
            mode="popular"
          />
        </Col>
      </Row>

      {selectedPost && (
        <Blog
          blog={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          allPosts={posts}
          theme={theme}
          onReadMoreClick={handleReadMoreClick}
        />
      )}
    </HomeSection>
  );
};
