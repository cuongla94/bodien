import { useEffect } from 'react';
import axios from 'axios';
import { AppApis } from 'config/apis-config';

export function useTrackBlogView(slug: string) {
  useEffect(() => {
    if (!slug) return;

    axios
      .post(`${AppApis.blog.trackView}`, { blogSlug: slug })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('View tracking failed:', err);
        }
      });
  }, [slug]);
}
