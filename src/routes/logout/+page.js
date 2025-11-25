import { redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

export async function load() {
	const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
	await supabase.auth.signOut();
	throw redirect(303, '/login');
}
