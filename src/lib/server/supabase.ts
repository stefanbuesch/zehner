import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

// Admin client for server-side operations (booking, checking availability)
// Uses lazy initialization to avoid build-time env access issues
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      env.PUBLIC_SUPABASE_URL ?? '',
      env.SUPABASE_SERVICE_ROLE_KEY ?? ''
    );
  }
  return _supabaseAdmin;
}

// For backwards compatibility - getter that initializes lazily
export const supabaseAdmin = {
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabaseAdmin().from(...args),
  rpc: (...args: Parameters<SupabaseClient['rpc']>) => getSupabaseAdmin().rpc(...args),
};
