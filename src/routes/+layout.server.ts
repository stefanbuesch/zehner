import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        session: locals.supabase.auth.getSession(),
        user: locals.user,
        tenant: locals.tenant
    }
}
