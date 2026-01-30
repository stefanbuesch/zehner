// @ts-nocheck
import { createBrowserClient, isBrowser, parse, serialize } from '@supabase/ssr'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
    depends('supabase:auth')

    // If we land here with a code but not on the callback route, redirect to it
    const code = url.searchParams.get('code')
    if (code && url.pathname !== '/auth/callback') {
        const next = url.searchParams.get('next') ?? '/'
        throw redirect(303, `/auth/callback?code=${code}&next=${encodeURIComponent(next)}`)
    }

    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch,
        },
        cookies: {
            getAll() {
                return data.cookies
            },
            setAll(cookiesToSet) {
                if (!isBrowser()) return

                cookiesToSet.forEach(({ name, value, options }) => {
                    document.cookie = serialize(name, value, options)
                })
            }
        },
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session, user: data.user }
}
