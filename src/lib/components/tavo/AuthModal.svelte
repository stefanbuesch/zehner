<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { gsap } from 'gsap';
    import { Chat } from '@ai-sdk/svelte';
    
    // Props
    let { isOpen = false, onClose = () => {} } = $props();

    // State
    let isRegistering = $state(false);
    /** @type {HTMLDivElement | undefined} */
    let modalContainer = $state(undefined);
    /** @type {HTMLInputElement | undefined} */
    let emailInput = $state(undefined);
    
    // Form Data
    let email = $state('');
    let password = $state('');
    let name = $state(''); // For registration
    
    let isLoading = $state(false);
    let errorMessage = $state('');
    let successMessage = $state('');

    // AI "Concierge" Observer
    // We treat it as a "Chat" but we only send system events, not user data.
    const concierge = new Chat({
        api: '/api/concierge',
        initialMessages: [],
        keepLastMessageOnly: true, // We only care about the latest "Status" comment
    });

    // Helper to signal AI
    function signalConcierge(eventCode) {
        // 'Chat' class uses sendMessage({ text: ... })
        // We simulate a user message hidden or just system signal
        try {
            // @ts-ignore
            concierge.sendMessage({ 
                role: 'user', 
                content: `EVENT: ${eventCode}`
            });
        } catch (e) {
            console.error(e);
        }
    }

    // Lifecycle
    $effect(() => {
        // Scroll Lock
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            // Animation In
            if (modalContainer) {
                gsap.fromTo(modalContainer, 
                    { opacity: 0, scale: 0.95, y: 20 }, 
                    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            }
            // Reset
            errorMessage = '';
            successMessage = '';
            
            // Trigger AI Greeting
             if (concierge.messages.length === 0) {
                 signalConcierge('OPENED_LOGIN');
             }

            // Focus
            setTimeout(() => emailInput?.focus(), 100);
        }

        return () => {
            document.body.style.overflow = '';
        };
    });

    function handleClose() {
        if (modalContainer) {
            gsap.to(modalContainer, { opacity: 0, scale: 0.95, y: 20, duration: 0.3, onComplete: onClose });
        } else {
            onClose();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (isLoading) return;
        
        isLoading = true;
        errorMessage = '';
        successMessage = '';

        try {
            if (isRegistering) {
                // Register via API
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name })
                });
                
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Registrierung fehlgeschlagen');
                
                successMessage = "Registrierung erfolgreich! Bitte überprüfe deine E-Mails.";
                signalConcierge('SUCCESS_REGISTER');
                isRegistering = false;
                
            } else {
                // Login via API
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Anmeldung fehlgeschlagen');

                successMessage = "Willkommen zurück.";
                signalConcierge('SUCCESS_LOGIN');
                
                // Close & Reload
                setTimeout(() => {
                    handleClose();
                    window.location.reload();
                }, 1000);
            }
        } catch (err) {
            console.error("Auth Error:", err);
            errorMessage = err.message || "Ein Fehler ist aufgetreten.";
            
            // Translate common errors & Signal AI
            if (errorMessage.includes("Invalid login credentials")) {
                errorMessage = "E-Mail oder Passwort falsch.";
                signalConcierge('ERROR_INVALID_CREDENTIALS');
            } else if (errorMessage.includes("already registered")) {
                signalConcierge('ERROR_USER_EXISTS');
            } else {
                 signalConcierge('ERROR_GENERIC');
            }
        } finally {
            isLoading = false;
        }
    }

    function toggleMode() {
        isRegistering = !isRegistering;
        errorMessage = '';
        successMessage = '';
        gsap.fromTo(modalContainer, {scale: 0.98}, {scale: 1, duration: 0.2});
        
        // Signal AI
        signalConcierge(isRegistering ? 'OPENED_REGISTER' : 'OPENED_LOGIN');
    }

    function handleKeydown(e) {
        if (e.key === 'Escape') handleClose();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
<div class="fixed inset-0 z-[210] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
    
    <div bind:this={modalContainer} class="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden transition-all duration-300">
        
        <!-- Header -->
        <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 relative z-20">
            <h2 class="text-[#FFB800] font-serif text-xl tracking-wide">
                {isRegistering ? 'MITGLIED WERDEN' : 'LOGIN'}
            </h2>
            <button onclick={handleClose} aria-label="Close dialog" class="text-white/30 hover:text-white transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <!-- AI Concierge Bubble -->
        <!-- Just show the LATEST message from Assistant if present -->
        {#if concierge.messages.length > 0}
            {@const lastMsg = concierge.messages[concierge.messages.length - 1]}
            {#if lastMsg.role === 'assistant'}
                <div class="px-8 pt-6 pb-2">
                    <div class="flex gap-4 items-start">
                         <div class="w-8 h-8 rounded-full bg-[#FFB800] flex-shrink-0 flex items-center justify-center pt-1 font-serif text-black font-bold text-xs shadow-[0_0_15px_rgba(255,184,0,0.4)]">
                            T
                         </div>
                         <div class="flex-1">
                             <div class="text-[#FFB800] text-[10px] uppercase tracking-widest mb-1 opacity-50">Tavo Concierge</div>
                             <p class="text-white text-sm leading-relaxed italic animate-in fade-in slide-in-from-bottom-2">
                                 "{lastMsg.content}"
                             </p>
                         </div>
                    </div>
                </div>
            {:else if concierge.isLoading} 
                 <!-- Typing indicator logic if desired -->
            {/if}
        {/if}

        <!-- Form -->
        <div class="p-8 space-y-6 relative z-10">
            
            {#if errorMessage}
                <div class="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded flex items-center gap-3">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {errorMessage}
                </div>
            {/if}

            {#if successMessage}
                <div class="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded flex items-center gap-3">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    {successMessage}
                </div>
            {/if}

            <form onsubmit={handleSubmit} class="space-y-4">
                
                {#if isRegistering}
                    <div class="space-y-1">
                        <label for="name" class="text-xs uppercase tracking-widest text-white/40 block">Name</label>
                        <input 
                            id="name"
                            type="text" 
                            bind:value={name}
                            placeholder="Dein Name"
                            class="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition-colors placeholder:text-white/10"
                            required
                        />
                    </div>
                {/if}

                <div class="space-y-1">
                    <label for="email" class="text-xs uppercase tracking-widest text-white/40 block">E-Mail</label>
                    <input 
                        bind:this={emailInput}
                        id="email"
                        type="email" 
                        bind:value={email}
                        placeholder="name@example.com"
                        class="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition-colors placeholder:text-white/10"
                        required
                        autocomplete="username"
                    />
                </div>

                <div class="space-y-1">
                    <label for="password" class="text-xs uppercase tracking-widest text-white/40 block">Passwort</label>
                    <input 
                        id="password"
                        type="password" 
                        bind:value={password}
                        placeholder="••••••••"
                        class="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition-colors placeholder:text-white/10"
                        required
                        autocomplete={isRegistering ? "new-password" : "current-password"}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    class="w-full bg-[#FFB800] text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-white transition-colors disabled:opacity-50 mt-6 shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)]"
                >
                    {isLoading ? 'Laden...' : (isRegistering ? 'Beitreten' : 'Anmelden')}
                </button>
            </form>

            <div class="text-center pt-4 border-t border-white/5">
                <button onclick={toggleMode} class="text-white/40 text-xs hover:text-[#FFB800] transition-colors uppercase tracking-widest">
                    {isRegistering ? 'Bereits Mitglied? Hier anmelden' : 'Noch kein Konto? Hier registrieren'}
                </button>
            </div>
        </div>

        <!-- Background FX -->
        <div class="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
</div>
{/if}
