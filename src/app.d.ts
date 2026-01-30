import { SupabaseClient, Session, User, AuthError } from '@supabase/supabase-js'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			session: Promise<{ data: { session: Session }; error: null; } | { data: { session: null }; error: AuthError } | { data: { session: null }; error: null; }>
			user: User | null
			tenant: 'bernd' | 'tavo' | null
			cookies: import('@sveltejs/kit').Cookies
		}
		interface PageData {
			supabase: SupabaseClient
			session: Session | null
			user: User | null
		}
		// interface Platform {}
	}
}

export { }
