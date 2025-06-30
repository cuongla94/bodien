// utils/news/newsStorage.ts (or wherever this lives)

import { supabaseClient } from 'services/supabase';

export interface TechNewsRow {
  title: string;
  description?: string;
  author?: string;
  url: string;
  source?: string;
  image?: string;
  category?: string;
  language?: string;
  country?: string;
  published_at: string; // ISO format
  created_at?: string;
}

export async function saveArticlesToSupabase(articles: TechNewsRow[]) {
  try {
    const inserts = articles.map((article) => ({
      ...article,
      published_at: new Date(article.published_at).toISOString(),
    }));

    const { data, error } = await supabaseClient
      .from('tech_news')
      .upsert(inserts, { onConflict: 'url' });

    if (error) {
      console.error('❌ Supabase insert failed:', error);
    } else if (Array.isArray(data)) {
      console.log(`✅ Upserted ${(data as any).length} articles to Supabase`);
    } else {
      console.log('✅ Upsert succeeded (no rows returned)');
    }
  } catch (error) {
    console.error('❌ Failed to save news articles:', error);
    throw error;
  }
}

export async function fetchArticlesFromSupabase(): Promise<TechNewsRow[]> {
  const { data, error } = await supabaseClient
    .from('tech_news')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('❌ Failed to fetch articles from Supabase:', error);
    return [];
  }

  return data ?? [];
}
