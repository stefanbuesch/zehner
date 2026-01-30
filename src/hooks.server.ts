import { createServerClient } from '@supabase/ssr'
import { type Handle } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const DEMO_PASSWORD = 'bernd2026';

export const handle: Handle = async ({ event, resolve }) => {
    // 0. Password Gate (Demo Protection)
    const pwQuery = event.url.searchParams.get('pw');
    const pwCookie = event.cookies.get('demo_access');

    if (pwQuery === DEMO_PASSWORD) {
        // Set cookie for 7 days so they don't have to re-enter
        event.cookies.set('demo_access', 'granted', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7
        });
    } else if (pwCookie !== 'granted') {
        // Block access with a simple password form
        return new Response(`
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Demo Access</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        min-height: 100vh; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        background: #0a0a0a; 
                        font-family: system-ui, sans-serif;
                    }
                    .card {
                        background: #111;
                        border: 1px solid #222;
                        border-radius: 16px;
                        padding: 48px;
                        max-width: 400px;
                        text-align: center;
                    }
                    h1 { color: #FFB800; font-size: 1.5rem; margin-bottom: 8px; }
                    p { color: #666; font-size: 0.875rem; margin-bottom: 24px; }
                    form { display: flex; gap: 12px; }
                    input {
                        flex: 1;
                        padding: 12px 16px;
                        border: 1px solid #333;
                        border-radius: 8px;
                        background: #0a0a0a;
                        color: white;
                        font-size: 1rem;
                    }
                    input:focus { outline: none; border-color: #FFB800; }
                    button {
                        padding: 12px 24px;
                        background: #FFB800;
                        color: black;
                        border: none;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    button:hover { background: #e6a600; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>🔒 Demo Access</h1>
                    <p>This is a private preview. Enter the password to continue.</p>
                    <form method="GET">
                        <input type="password" name="pw" placeholder="Password" autofocus required>
                        <button type="submit">Enter</button>
                    </form>
                </div>
            </body>
            </html>
        `, {
            status: 401,
            headers: { 'Content-Type': 'text/html' }
        });
    }

    // 1. Tenant Detection
    const host = event.url.hostname;
    let subdomain = host.split('.')[0];

    // Handle localhost port if present in hostname (unlikely purely in hostname, but good safety)
    if (subdomain.includes(':')) {
        subdomain = subdomain.split(':')[0];
    }

    // Debugging
    console.log(`[HOOKS] Host: ${host}, Subdomain: ${subdomain}, Path: ${event.url.pathname}`);

    if (subdomain === 'bernd' || subdomain === 'tavo') {
        event.locals.tenant = subdomain;
        console.log(`[HOOKS] Tenant detected: ${subdomain}`);
    } else {
        event.locals.tenant = null;
    }

    // 2. Supabase Logic
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, {
                        ...options,
                        path: '/',
                        domain: host.includes('localhost') ? '.localhost' : undefined
                    })
                })
            },
        },
    })

    const {
        data: { user },
    } = await event.locals.supabase.auth.getUser()

    event.locals.user = user

    // 3. Routing is now handled by src/hooks.ts (reroute)
    // We don't need to mutate event.url.pathname here anymore
    // event.locals.tenant is already set above which is enough for the app to know context.

    // 4. Resolve with caching headers
    const response = await resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    });

    // 5. Add Cache-Control headers based on route type
    const pathname = event.url.pathname;

    // Routes that should NOT be cached (authenticated/dynamic)
    const noCacheRoutes = ['/profile', '/login', '/register', '/auth', '/api'];
    const isNoCache = noCacheRoutes.some(route => pathname.startsWith(route)) || user;

    // Static/public pages that can be cached
    const publicCacheRoutes = ['/', '/tavo', '/bernd', '/menu', '/about', '/impressum', '/datenschutz'];
    const isPublicCacheable = publicCacheRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

    if (isNoCache) {
        // No caching for authenticated users or sensitive routes
        response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    } else if (isPublicCacheable) {
        // CDN cache for 1 hour, browser cache for 5 minutes, stale-while-revalidate for smooth UX
        response.headers.set('Cache-Control', 'public, s-maxage=3600, max-age=300, stale-while-revalidate=86400');
    }

    return response;
}
