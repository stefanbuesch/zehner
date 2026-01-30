
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
    // Failsafe: If we are at the root path AND have a tenant detected,
    // but somehow the hook didn't rewrite us (or we want to be sure),
    // we should prevent the "Dual Landing Page" from showing.

    // However, hooks run *before* this. If hooks successfully rewrote to /tavo,
    // this load function (at /) check is tricky because `event.url.pathname` in hooks was mutable.
    // In ServerLoad, `url.pathname` should reflect the *rewritten* path if it was done in handle?
    // Actually, SvelteKit routing matches based on the rewritten URL. 
    // So if hooks rewrote `/` -> `/tavo`, then `routes/tavo/+page.server.ts` would load, NOT this file.

    // SO: If this file runs, it means we remain at `/` which means NO tenant was detected 
    // OR the rewrite failed.

    if (locals.tenant) {
        // We have a tenant, but we want to stay at / (root) while serving tenant content.
        // Hooks should have handled the rewrite.
        // If we are here, it means we are serving the rewritten content or the original root content transparently.
        // No redirect needed.
    }

    return {};
};
