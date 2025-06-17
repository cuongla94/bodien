import { useEffect } from 'react';
import axios from 'axios';

export function useTrackBlogView(slug: string) {
  useEffect(() => {
    if (!slug) return;

    axios
      .post('/api/blog/track-view', { blogSlug: slug })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('View tracking failed:', err);
        }
      });
  }, [slug]);
}
