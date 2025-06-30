import { useEffect, useState } from 'react';
import PageLayout from 'layouts/PageLayout';
import { BlogHeader } from 'components/BlogDetails';
import { getBlogBySlug, getAllBlogs, onBlogUpdate } from 'apis';
import { urlFor } from 'apis';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useTrackBlogView } from 'hooks';
import BlogSections from 'components/BlogDetails/BlogSections';
import { Spinner } from 'common/Spinner';

const BlogDetail = ({ blog: initialBlog, preview }) => {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(true);

  useTrackBlogView(initialBlog?.slug);

  useEffect(() => {
    let sub;

    if (preview) {
      sub = onBlogUpdate(initialBlog.slug).subscribe((update) => {
        setBlog(update.result);
        setLoading(false);
      });
    } else {
      if (initialBlog) setLoading(false);
    }

    return () => sub && sub.unsubscribe();
  }, [preview, initialBlog]);

  const getCoverImageUrl = () =>
    blog?.coverImage?.asset ? urlFor(blog.coverImage).height(600).url() : null;

  if (router.isFallback || loading) {
    return <PageLayout className="blog-detail-page"><Spinner /></PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <div className='mt-5'>
        <BlogHeader
          title={blog.title}
          subtitle={blog.subtitle}
          coverImage={getCoverImageUrl()}
          date={moment(blog.date || blog.publishedAt).format('LL')}
          updatedAt={moment(blog._updatedAt).format('LL')}
        />
        {blog.sections && <BlogSections sections={blog.sections} />}
      </div>
    </PageLayout>
  );
};

export default BlogDetail;

export async function getStaticProps({ params, preview = false }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } })) || [];
  return {
    paths,
    fallback: true,
  };
}
