    // services/supabase/index.ts
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    console.log(`supabaseUrl: ${supabaseUrl}`);
    console.log(`supabaseServiceKey: ${supabaseServiceKey}`);

    export const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
