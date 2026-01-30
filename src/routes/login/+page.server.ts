import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!email || !password) {
            return fail(400, { error: 'Missing email or password' })
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            return fail(400, { error: error.message })
        }

        const next = new URL(request.url).searchParams.get('next') ?? '/'
        const openBooking = new URL(request.url).searchParams.get('openBooking')

        let redirectUrl = next;
        if (openBooking) {
            const url = new URL(next, request.url);
            url.searchParams.set('openBooking', 'true');
            redirectUrl = url.pathname + url.search;
        }

        throw redirect(303, redirectUrl)
    },
}
