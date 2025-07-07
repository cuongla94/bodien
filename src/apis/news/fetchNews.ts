import { supabaseClient } from 'services/supabase';
import type { TechNewsRow } from 'utils/news';

export async function fetchTechNewsFromDB(): Promise<TechNewsRow[]> {
  const { data, error } = await supabaseClient
    .from('tech_news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('❌ Error fetching tech news:', error);
    return [];
  }

  return data || [];
}

export async function fetchLatestNews(limit: number = 18) {
  const { data, error } = await supabaseClient
    .from('tech_news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch tech news:', error.message);
    return [];
  }

  return data || [];
}
