// utils/newsStorage.ts
import fs from 'fs';
import path from 'path';

const NEWS_CACHE_PATH = path.resolve('./data', 'tech_news.json');

export async function saveOrCacheArticles(articles: any[]) {
  try {
    const payload = {
      updatedAt: new Date().toISOString(),
      articles,
    };

    // Ensure the data directory exists
    const dir = path.dirname(NEWS_CACHE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(NEWS_CACHE_PATH, JSON.stringify(payload, null, 2));
    console.log(`✅ Saved ${articles.length} articles to tech_news.json`);
  } catch (error) {
    console.error('❌ Failed to save news articles:', error);
    throw error;
  }
}

export function loadCachedArticles() {
  if (fs.existsSync(NEWS_CACHE_PATH)) {
    const data = fs.readFileSync(NEWS_CACHE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.articles || [];
  }
  return [];
}
