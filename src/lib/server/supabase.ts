import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

// Admin client for server-side operations (booking, checking availability)
// Uses lazy initialization to avoid build-time env access issues
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = env.PUBLIC_SUPABASE_URL;
    const key = env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      console.warn('[SUPABASE] Admin keys missing. Admin client disabled.');
      // Return a dummy client or throw a more descriptive error when used
      // For now, we'll create a client with dummy values but it will fail on calls
      _supabaseAdmin = createClient(url ?? 'http://missing', key ?? 'missing');
    } else {
      _supabaseAdmin = createClient(url, key);
    }
  }
  return _supabaseAdmin;
}

// For backwards compatibility - getter that initializes lazily
export const supabaseAdmin = {
  from: (...args: Parameters<SupabaseClient['from']>) => getSupabaseAdmin().from(...args),
  rpc: (...args: Parameters<SupabaseClient['rpc']>) => getSupabaseAdmin().rpc(...args),
};
