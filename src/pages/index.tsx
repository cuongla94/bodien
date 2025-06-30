import { HomeDisplay } from 'components/HomeDisplay';
import PageLayout from 'layouts/PageLayout';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { getPaginatedBlogs } from 'apis';
import { fetchLatestNews } from 'apis/news/fetchNews';

export default function HomePage({ preview, latestNews }) {
  const { theme } = useThemeProvider();

  return (
    <PageLayout>
      <HomeDisplay
        theme={theme}
        latestNews={latestNews}
      />
    </PageLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: 'desc' });
  const publicBlogs = blogs.filter(blog => !blog.hidden);

  const latestNews = await fetchLatestNews();

  return {
    props: {
      blogs: publicBlogs,
      latestNews,
      preview,
    },
    revalidate: 60 * 60
  };
}
