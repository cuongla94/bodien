import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CardItem } from 'components/CardItem';
import { getAllBlogs } from 'apis';
import { MainDashboard } from 'config/main-config';
import { AppLinks } from 'config/navigation-config';
import { HomeSection, HomeHeader, HomeTitle, HomeSeeMore } from './styles';
import { getFormattedDate } from 'utils/dates';

interface LatestPostsProps {
  theme?: any;
}

export const LatestPosts = ({ theme }: LatestPostsProps) => {
  const [posts, setPosts] = useState([]);

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

  return (
    <HomeSection className="container">
      <HomeHeader className="d-flex justify-content-between align-items-end mb-3">
        <HomeTitle className="mb-0">{MainDashboard.latestPostsTitle}</HomeTitle>
        <Link href={AppLinks.blogs.link} passHref legacyBehavior>
          <HomeSeeMore>See more</HomeSeeMore>
        </Link>
      </HomeHeader>

      <div className="row g-4">
        {posts.map((post) => (
          <div key={post._id} className="col-12 col-sm-6 col-lg-4">
            <CardItem
              type="blog"
              title={post.title}
              category={post.category}
              image={post.coverImage}
              publishedDate={getFormattedDate(post)}
              updatedDate={post._updatedDate}
              url={post.slug ? `${AppLinks.blogs.link}/${post.slug}` : undefined}
              theme={theme}
              isAdmin={false}
              numOfViews={post.numOfViews}
              numOfShares={post.numOfShares}
              hidden={post.hidden}
            />
          </div>
        ))}
      </div>
    </HomeSection>
  );
};
