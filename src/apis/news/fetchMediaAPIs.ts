// utils/fetchTechNews.ts

import axios from 'axios';

const BASE_URL = 'https://api.mediastack.com/v1/news';
const ACCESS_KEY = process.env.NEXT_PUBLIC_MEDIASTACK_ACCESS_KEY;

console.log(`ACCESS_KEY: ${ACCESS_KEY}`);

interface NewsArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image?: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

export async function fetchTechNews(): Promise<NewsArticle[]> {
  const params = {
    access_key: ACCESS_KEY,
    categories: 'technology,business',
    languages: 'en',
    sort: 'published_desc',
    limit: 100, // increase to the max allowed by free tier
  };

  const resp = await axios.get(BASE_URL, { params });

  const keywords = [
    'gadget',
    'smartphone',
    'ai',
    'hardware',
    'software',
    'device',
    'tool',
    'app',
    'robot',
    'wearable',
    'technology',
    'electronics',
    'tech',
    'laptop',
    'tablet',
    'product',
  ];

  const allArticles = resp.data.data as NewsArticle[];

  const filteredArticles = allArticles.filter(article =>
    keywords.some(keyword =>
      (article.title + article.description).toLowerCase().includes(keyword)
    )
  );

  console.log(`Mediastack returned: ${allArticles.length} articles`);
  console.log(`Filtered down to: ${filteredArticles.length} tech/product articles`);

  return filteredArticles;
}

