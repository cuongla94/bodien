import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseClient } from 'services/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { error } = await supabaseClient.rpc('delete_old_tech_news');

    if (error) throw error;
    res.status(200).json({ message: 'Old tech news deleted' });
  } catch (err: any) {
    console.error('Cleanup failed:', err.message);
    res.status(500).json({ error: err.message });
  }
}
