// pages/api/cron/tech-news.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchTechNews } from 'apis/news';
import { saveArticlesToSupabase } from 'utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const articles = await fetchTechNews();
    await saveArticlesToSupabase(articles);
    res.status(200).json({ message: 'Tech news fetched and stored', count: articles.length, data: articles });
  } catch (error: any) {
    console.error('CRON fetch tech news failed', error);
    res.status(500).json({ error: error.message });
  }
}
