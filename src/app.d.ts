import { SupabaseClient, Session, User } from '@supabase/supabase-js'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			user: User | null
			tenant: 'bernd' | 'tavo' | null
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
