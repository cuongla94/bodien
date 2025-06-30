import { Dashboard } from 'components/Dashboard';
import PreviewAlert from 'components/PreviewAlert';
import PageLayout from 'layouts/PageLayout';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { getPaginatedBlogs } from 'apis';
import { fetchLatestNews } from 'apis/news/fetchNews';

export default function HomePage({ blogs, preview, latestNews }) {
  const { theme } = useThemeProvider();

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <Dashboard
        mode="public"
        theme={theme}
        preview={preview}
        initialBlogs={blogs}
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
    revalidate: 60 * 60, // every hour
  };
}
