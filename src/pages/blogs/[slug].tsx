import { useEffect, useState } from 'react';
import PageLayout from 'layouts/PageLayout';
import { BlogHeader, BlogContent } from 'components/Blog';
import { getBlogBySlug, getAllBlogs, onBlogUpdate } from 'apis';
import { Row, Col } from 'react-bootstrap'
import { urlFor } from 'apis';
import moment from 'moment';
import { useRouter } from 'next/router';
import PreviewAlert from 'components/PreviewAlert';

const BlogDetail = ({blog: initialBlog, preview}) => {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);

  useEffect(() => {
    let sub;
    if (preview) {
      sub = onBlogUpdate(blog.slug)
        .subscribe(update => {
          setBlog(update.result)
        })
    }

    return () => sub && sub.unsubscribe()
  }, [])

  if (router.isFallback) {
    return (
      <PageLayout className="blog-detail-page">
        Loading...
      </PageLayout>
    )
  }

  // Helper function to safely get cover image URL
  const getCoverImageUrl = () => {
    if (blog.coverImage && blog.coverImage.asset) {
      return urlFor(blog.coverImage).height(600).url();
    }
    return null; // or return a default image URL
  };

  return (
    <PageLayout className="blog-detail-page">
      { preview && <PreviewAlert /> }
      <BlogHeader
        title={blog.title}
        subtitle={blog.subtitle}
        coverImage={getCoverImageUrl()}
        date={moment(blog.date || blog.publishedAt).format('LL')}
      />
      <hr/>
      { blog.content &&
        <BlogContent content={blog.content} />
      }
    </PageLayout>
  )
}

// Default export is required for Next.js pages
export default BlogDetail;

export async function getStaticProps({params, preview = false, previewData}) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map(b => ({params: {slug: b.slug}}));
  return {
    paths,
    fallback: true
  }
};