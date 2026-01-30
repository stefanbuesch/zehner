<script>
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';

    // Props
    let { isOpen = false, onClose = () => {}, initialMode = 'login' } = $props();

    let mode = $state(initialMode); // 'login' or 'register'
    let modalContainer;
    let formElement;

    // Toggle Mode
    function toggleMode() {
        mode = mode === 'login' ? 'register' : 'login';
    }

    // Animation Toggle
    $effect(() => {
        if (isOpen && modalContainer) {
            gsap.fromTo(modalContainer, 
                { opacity: 0, scale: 0.95, y: 20 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    });

    function handleClose() {
        if(modalContainer) {
            gsap.to(modalContainer, { opacity: 0, scale: 0.95, y: 20, duration: 0.3, onComplete: onClose });
        } else {
            onClose();
        }
    }

    function handleKeydown(e) {
        if (e.key === 'Escape') handleClose();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
<div class="fixed inset-0 z-[210] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
    
    <div bind:this={modalContainer} class="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
        
        <!-- Premium Decor -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-50"></div>
        
        <!-- Close Button -->
        <button onclick={handleClose} class="absolute top-6 right-6 text-white/30 hover:text-white transition-colors z-20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div class="p-8 md:p-10">
            
            <div class="text-center mb-10">
                <h2 class="font-graffiti text-5xl text-[#FFB800] mb-2">{mode.toUpperCase()}</h2>
                <p class="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">
                    {mode === 'login' ? 'Welcome Back to the Circle' : 'Join the inner circle'}
                </p>
            </div>

            <!-- Unified Form Handling -->
            <form 
                action={mode === 'login' ? '/login' : '/register'} 
                method="POST" 
                use:enhance={() => {
                    return async ({ result, update }) => {
                        if (result.type === 'redirect' || result.type === 'success') {
                            onClose();
                        }
                        await update();
                    };
                }} 
                class="flex flex-col gap-5"
            >
                
                {#if mode === 'register'}
                <div class="space-y-1">
                    <label class="block text-[10px] uppercase tracking-widest text-white/40 ml-1" for="fullName">Full Name</label>
                    <input type="text" name="fullName" id="fullName" placeholder="Bernd Zehner" required 
                        class="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/10 text-sm" />
                </div>
                {/if}

                <div class="space-y-1">
                    <label class="block text-[10px] uppercase tracking-widest text-white/40 ml-1" for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="bernd@tavo.de" required 
                        class="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/10 text-sm" />
                </div>

                {#if mode === 'register'}
                <div class="space-y-1">
                    <label class="block text-[10px] uppercase tracking-widest text-white/40 ml-1" for="phone">Phone Number</label>
                    <input type="tel" name="phone" id="phone" placeholder="+49 123 456789" required 
                        class="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/10 text-sm" />
                </div>
                {/if}

                <div class="space-y-1">
                    <label class="block text-[10px] uppercase tracking-widest text-white/40 ml-1" for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" required 
                        class="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/10 text-sm" />
                </div>

                {#if mode === 'register'}
                <div class="flex items-start gap-3 mt-2 px-1">
                    <input type="checkbox" name="gdpr" id="gdpr_modal" required 
                        class="mt-1 w-4 h-4 rounded border-white/10 bg-black/50 text-[#FFB800] focus:ring-[#FFB800] focus:ring-offset-black" />
                    <label class="text-[9px] text-white/30 leading-relaxed uppercase tracking-tighter" for="gdpr_modal">
                        I agree to the <a href="/datenschutz" class="text-[#FFB800] hover:underline">Privacy Policy</a>
                    </label>
                </div>
                {/if}

                <button type="submit" class="mt-4 bg-[#FFB800] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,184,0,0.2)]">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
            </form>

            <div class="mt-8 text-center">
                <button onclick={toggleMode} class="text-[10px] uppercase tracking-widest text-white/40 hover:text-[#FFB800] transition-colors">
                    {mode === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
                </button>
            </div>

        </div>

        <!-- Nashville Texture Overlay -->
        <div class="absolute inset-0 z-[-1] opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
</div>
{/if}

<style>
    .font-marker {
        font-family: 'Permanent Marker', cursive;
    }
</style>
