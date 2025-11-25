import { redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

export async function handle({ event, resolve }) {
    const supabase = createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    const { data: { session } } = await supabase.auth.getSession();
    event.locals.session = session;

    const publicRoutes = ['/', '/login', '/signup'];
    const isPublic = publicRoutes.some(route =>
        event.url.pathname.startsWith(route)
    );

    if (!isPublic && !session) {
        throw redirect(303, '/login');
    }

    return resolve(event);
}
