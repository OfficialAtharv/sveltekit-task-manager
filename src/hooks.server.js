import { redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

export async function handle({ event, resolve }) {
	const supabase = createClient(
		import.meta.env.SUPABASE_URL,
		import.meta.env.SUPABASE_ANON_KEY,
		{ auth: { persistSession: false } }
	);

	const { data: { session } } = await supabase.auth.getSession();
	event.locals.session = session;

	const publicRoutes = ['/login', '/signup', '/'];
	const isPublic = publicRoutes.some(route => event.url.pathname.startsWith(route));

	if (!isPublic && !session) {
		throw redirect(303, '/login');
	}
	return resolve(event);
}
