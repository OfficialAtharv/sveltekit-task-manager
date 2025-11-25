// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';

let supabase = null;

if (browser) {
    supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
}

export { supabase };
