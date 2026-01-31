import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    // 1. Validate inputs
    const { email, password } = await request.json();

    if (!email || !password) {
        return json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (!supabase) {
        return json({ error: 'Supabase client not initialized' }, { status: 500 });
    }

    // 2. Perform Login
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return json({ error: error.message }, { status: 401 }); // 401 Unauthorized for bad credentials
    }

    // 3. Return session (SvelteKit hooks handle cookie setting via response headers automatically injected by the Supabase helper)
    return json({ user: data.user, session: data.session });
};
