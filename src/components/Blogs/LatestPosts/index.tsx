import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { format } from 'date-fns';
import { CardItem } from 'components/CardItem';
import { MainDashboard } from 'config/main-config';

interface Post {
  _id: string;
  title: string;
  category?: { title: string; value: string };
  slug: { current: string };
  coverImage?: { asset: { url: string } };
  publishedAt: string;
}

interface LatestPostsProps {
  posts: Post[];
  theme?: any;
}

export const LatestPosts = ({ posts, theme }: LatestPostsProps) => {
  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [posts]);

  const visiblePosts = sortedPosts.slice(0, 8);
  const staticPosts = visiblePosts.slice(0, 4);
  const carouselPosts = visiblePosts.slice(4);

  return (
    <section className="my-5">
      <h2 className="mb-4">{MainDashboard.latestPostsTitle}</h2>

      <div className="row">
        {staticPosts.map(post => (
          <div className="col-md-3 mb-3" key={post._id}>
            <CardItem
              title={post.title}
              category={post.category}
              image={post.coverImage}
              date={format(new Date(post.publishedAt), 'PPP')}
              link={
                post.slug?.current
                  ? { href: `/blogs/${post.slug.current}` }
                  : undefined
              }
              theme={theme}
            />
          </div>
        ))}
      </div>

      {carouselPosts.length > 0 && (
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{ padding: '1rem 0' }}
        >
          {carouselPosts.map(post => (
            <SwiperSlide key={post._id}>
              <CardItem
                title={post.title}
                category={post.category}
                image={post.coverImage}
                date={format(new Date(post.publishedAt), 'PPP')}
                link={
                  post.slug?.current
                    ? { href: `/blogs/${post.slug.current}` }
                    : undefined
                }
                theme={theme}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
