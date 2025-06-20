import { Dashboard } from 'components/Dashboard';
import { AuthorIntro } from 'components/AuthorIntro';
import PreviewAlert from 'components/PreviewAlert';
import PageLayout from 'layouts/PageLayout';
import { useThemeProvider } from 'hooks/useThemeProvider';
import { getPaginatedBlogs } from 'apis';

export default function HomePage({ blogs, preview }) {
  const { theme } = useThemeProvider();

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <Dashboard
        mode="public"
        theme={theme}
        preview={preview}
        initialBlogs={blogs}
      />
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
