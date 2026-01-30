import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = ({ url }) => {
    const hostname = url.hostname;

    // Handle "tavo.localhost" or "bernd.localhost"
    // In dev: tavo.localhost -> subdomain 'tavo'
    // In prod: tavo.zehner.dev -> subdomain 'tavo'

    let subdomain: string | null = null;
    const parts = hostname.split('.');

    // Safety check for simple localhost
    if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
        subdomain = null;
    } else if (parts.length >= 2) {
        subdomain = parts[0];
    }

    console.log(`[REROUTE] Host: ${hostname}, Subdomain: ${subdomain}, Path: ${url.pathname}`);

    if (subdomain === 'tavo' || subdomain === 'bernd') {
        // Exclude API, Assets, and Auth routes from rewriting
        // We want /api/concierge to stay /api/concierge
        const ignoredPrefixes = ['/api', '/login', '/register', '/auth', '/logout', '/_app', '/_vercel', '/favicon.ico'];

        if (ignoredPrefixes.some(p => url.pathname.startsWith(p))) {
            return url.pathname;
        }

        // Rewrite logic
        // URL / -> /tavo
        // URL /menu -> /tavo/menu
        const newPath = `/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
        console.log(`[REROUTE] Rewriting to: ${newPath}`);
        return newPath;
    }

    return url.pathname;
};
