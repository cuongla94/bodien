// utils/fetchTechNews.ts

import axios from 'axios';

const BASE_URL = 'https://api.mediastack.com/v1/news';
const ACCESS_KEY = process.env.MEDIASTACK_ACCESS_KEY; // secure env var

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
    categories: 'technology,business',  // tech + product/business related
    languages: 'en',
    keywords: 'AI,artificial intelligence,software,hardware,product,tech gadget,consumer electronics',
    sort: 'published_desc',
    limit: 50
  };

  const resp = await axios.get(BASE_URL, { params });
  return resp.data.data as NewsArticle[];
}
