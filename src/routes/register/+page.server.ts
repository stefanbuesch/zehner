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

        const fullName = formData.get('fullName') as string
        const phone = formData.get('phone') as string

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
                data: {
                    full_name: fullName,
                    phone: phone,
                }
            }
        })

        if (error) {
            return fail(400, { error: error.message })
        }

        return { message: 'Registration successful! Please check your email to confirm.' }
    },
}
