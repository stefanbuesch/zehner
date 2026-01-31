import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        session: locals.supabase ? locals.supabase.auth.getSession() : null,
        user: locals.user,
        tenant: locals.tenant
    }
}
