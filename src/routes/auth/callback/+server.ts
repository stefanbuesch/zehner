import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals }) => {
    const supabase = locals.supabase;
    const code = url.searchParams.get('code')
    const next = url.searchParams.get('next') ?? '/'

    if (code && supabase) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            throw redirect(303, next)
        }
    }

    // return the user to an error page with instructions
    throw redirect(303, '/auth/auth-code-error')
}
