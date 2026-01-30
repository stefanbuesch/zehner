<script>
	  import '../app.css';
    import { page } from '$app/stores';
    import { goto, invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import Navbar from '$lib/components/tavo/Navbar.svelte';
    import BookingModal from '$lib/components/tavo/BookingModal.svelte';
    import AuthModal from '$lib/components/tavo/AuthModal.svelte';
    
    let { data, children } = $props();

    let isBookingOpen = $state(false);
    let isAuthOpen = $state(false);
    let authMode = $state('login');

    // Hide Navbar on certain routes
    const hiddenRoutes = ['/', '/auth/callback', '/bernd'];
    let showNavbar = $derived(!hiddenRoutes.includes($page.url.pathname));

    onMount(() => {
      const { data: { subscription } } = data.supabase.auth.onAuthStateChange((event, _session) => {
        if (_session?.expires_at !== data.session?.expires_at) {
          invalidate('supabase:auth');
        }
      });

      return () => subscription.unsubscribe();
    });

    // Auto-open modal if returning from login with the flag
    $effect(() => {
        if (data.user && $page.url.searchParams.get('openBooking') === 'true') {
            isBookingOpen = true;
            // Clean up the URL
            const newUrl = new URL($page.url);
            newUrl.searchParams.delete('openBooking');
            goto(newUrl.pathname + newUrl.search, { replaceState: true, noScroll: true });
        }
    });

    function toggleBooking() {
        if (!data.user) {
            // Instead of redirecting to a page, open the AuthModal
            authMode = 'login';
            isAuthOpen = true;
            return;
        }
        isBookingOpen = !isBookingOpen;
    }

    function openAuth(mode = 'login') {
        authMode = mode;
        isAuthOpen = true;
    }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Oswald:wght@400;500;700&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
</svelte:head>

{#if showNavbar}
  <Navbar openBooking={toggleBooking} openAuth={() => openAuth('login')} user={data.user} />
{/if}

<BookingModal isOpen={isBookingOpen} onClose={() => isBookingOpen = false} />
<AuthModal isOpen={isAuthOpen} onClose={() => isAuthOpen = false} initialMode={authMode} />
{@render children()}
