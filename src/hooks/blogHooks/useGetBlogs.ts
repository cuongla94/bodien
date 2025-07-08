import { AppApis } from 'config/apis-config';
import useSWR, { SWRConfiguration } from 'swr';
import { IBlogPost } from 'types/blog';

const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const getBlogs = async (url: string) => {
  return fetcher(url);
};

interface UseGetBlogsParams {
  offset?: number;
  filter: {
    date: {
      asc: boolean;
    };
  };
}

interface BlogsResponse {
  blogs: IBlogPost[];
  total: number;
}

export const useGetBlogs = (
  { offset, filter }: UseGetBlogsParams,
  initialData?: BlogsResponse
) => {
  const key = `${AppApis.blogs.default}?offset=${offset || 0}&date=${filter.date.asc ? 'asc' : 'desc'}`;

  const config: SWRConfiguration<BlogsResponse> = initialData
    ? { fallbackData: initialData }
    : {};

  return useSWR<BlogsResponse>(key, fetcher, config);
};

export const useGetBlogsTyped = (
  params: UseGetBlogsParams,
  options?: {
    initialData?: BlogsResponse;
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
  }
) => {
  const { offset, filter } = params;
  const key = `${AppApis.blogs.default}?offset=${offset || 0}&date=${filter.date.asc ? 'asc' : 'desc'}`;

  const config: SWRConfiguration<BlogsResponse> = {
    fallbackData: options?.initialData,
    revalidateOnFocus: options?.revalidateOnFocus ?? true,
    revalidateOnReconnect: options?.revalidateOnReconnect ?? true,
  };

  return useSWR<BlogsResponse>(key, fetcher, config);
};
