// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const { data: reservation, error: err } = await supabaseAdmin
        .from('reservations')
        .select('*')
        .eq('id', id)
        .single();

    if (err || !reservation) {
        console.error('Reservation load error:', err);
        throw error(404, 'Reservation not found');
    }

    return {
        reservation
    };
};
