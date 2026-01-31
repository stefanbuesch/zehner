import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    // 1. Validate inputs
    const { email, password, name } = await request.json();

    if (!email || !password) {
        return json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (!supabase) {
        return json({ error: 'Supabase client not initialized' }, { status: 500 });
    }

    // 2. Perform Registration
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name
            }
        }
    });

    if (error) {
        return json({ error: error.message }, { status: 400 });
    }

    // 3. Return success
    return json({
        message: 'Registration successful. Please check your email.',
        user: data.user,
        session: data.session
    });
};
