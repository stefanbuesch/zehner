<script>
  // @ts-nocheck
  import { tavoChat } from '$lib/stores/tavoChat.svelte.ts';
  import { onMount, tick } from 'svelte';
  import { gsap } from 'gsap';

  // Svelte 5 Runes Props
  let { isOpen = false, onClose = () => {} } = $props();

  /** @type {HTMLDivElement | undefined} */
  let takeoverContainer;
  /** @type {HTMLDivElement | undefined} */
  let chatArea;
  /** @type {HTMLDivElement | undefined} */
  let stardustContainer;
  /** @type {HTMLInputElement | undefined} */
  let inputEl;

  /** @type {any[]} */
  let messageRefs = $state([]);
  let inputValue = $state('');

  onMount(() => {
    if (!isOpen && takeoverContainer) {
        gsap.set(takeoverContainer, { y: '100%', opacity: 0 });
    }
  });

  async function handleSubmit(e) {
      if (e) e.preventDefault();
      if (!inputValue.trim()) return;
      
      const content = inputValue;
      inputValue = ''; // Clear input immediately
      
      // Use the global chat instance
      await tavoChat.append({ role: 'user', content });
  }

  // Watch for open/close to trigger animations
  $effect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed'; // Robust scroll lock
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100vw';
      }

      if (takeoverContainer) {
          gsap.fromTo(takeoverContainer, 
            { y: '100%', opacity: 0 }, 
            { y: '0%', opacity: 1, duration: 1, ease: "expo.out" }
          );
          
          if (stardustContainer) {
              gsap.to(stardustContainer, {
                  backgroundPosition: '150px 150px',
                  duration: 120,
                  repeat: -1,
                  ease: "none"
              });
          }
      }
      
      // Focus input
      setTimeout(() => inputEl?.focus(), 500);

    } else {
       // Cleanup Scroll Lock
       if (typeof window !== 'undefined' && document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top;
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
       }
       
       if (takeoverContainer && !isOpen) {
           // Ensure hidden logic is handled by handleClose calls usually, but valid constraint
       }
    }
  });

  // CINEMATIC FLOATING STORY LOGIC
  $effect(() => {
    if (tavoChat.messages && tavoChat.messages.length) {
        // @ts-ignore
        const currentMessages = tavoChat.messages.filter(m => m.role !== 'system');
        const latestIndex = currentMessages.length - 1;

        tick().then(() => {
            messageRefs.forEach((el, i) => {
                if (!el) return;
                
                const distance = latestIndex - i;
                
                if (distance === 0) {
                    gsap.to(el, {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 0.6,
                        ease: "power2.out"
                    });
                } else {
                    const scale = Math.max(0.85, 1 - (distance * 0.05));
                    const opacity = Math.max(0.1, 1 - (distance * 0.3));
                    const y = - (distance * 60);
                    const blur = Math.min(4, distance * 1);

                    gsap.to(el, {
                        scale,
                        opacity,
                        y,
                        filter: `blur(${blur}px)`,
                        duration: 1,
                        ease: "expo.out",
                        overwrite: true
                    });
                }
            });

            if (chatArea) {
                // @ts-ignore
                chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
            }
        });
    }
  });

  function handleClose() {
    if(takeoverContainer) {
        // @ts-ignore
        gsap.to(takeoverContainer, { 
            y: '100%', 
            opacity: 0,
            duration: 0.8, 
            ease: "expo.in", 
            onComplete: onClose 
        });
    } else {
        onClose();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && isOpen) handleClose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div 
  bind:this={takeoverContainer} 
  class="fixed inset-0 z-[500] bg-black flex flex-col overflow-hidden"
  class:pointer-events-none={!isOpen}
  class:opacity-0={!isOpen}
>
  <!-- ATMOSPHERIC BACKGROUND -->
  <div bind:this={stardustContainer} class="absolute inset-0 z-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#FFB800]/5 via-transparent to-black pointer-events-none"></div>
  <div class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80 pointer-events-none"></div>

  <!-- HEADER -->
  <header class="relative z-20 flex items-center justify-between p-8 md:px-16 md:py-10">
    <div class="flex items-center gap-4">
        <div class="w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.5)]"></div>
        <div>
            <h2 class="font-graffiti text-4xl md:text-5xl text-white leading-none">TAVO HOST</h2>
            <p class="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold mt-1.5">Wiesbaden · Nashville</p>
        </div>
    </div>
    <button onclick={handleClose} aria-label="Close modal" class="group p-4 rounded-full border border-white/5 hover:bg-white/5 transition-all duration-500 cursor-pointer">
        <svg class="w-8 h-8 text-white/20 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
  </header>

  <!-- CHAT CANVAS -->
  <main class="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full overflow-hidden">
    
    <div bind:this={chatArea} class="flex-1 overflow-y-auto px-6 py-20 md:px-20 space-y-6 no-scrollbar scroll-smooth">
        {#if tavoChat.messages}
            {#each tavoChat.messages.filter((/** @type {any} */ m) => m.role !== 'system') as message, i (message.id)}
                <div 
                    bind:this={messageRefs[i]}
                    class="flex {message.role === 'user' ? 'justify-end' : 'justify-center text-center'} py-4"
                >
                    <div class="max-w-[100%] md:max-w-[90%] relative">
                        {#if message.role === 'assistant'}
                            <div class="py-4">
                                <p class="font-serif text-3xl md:text-5xl text-white/95 leading-[1.2] whitespace-pre-line italic">
                                    {message.content}
                                </p>
                            </div>
                        {:else}
                            <div class="bg-[#FFB800] text-black rounded-full px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold shadow-xl">
                                {message.content}
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}

            {#if tavoChat.status === 'streaming' || tavoChat.status === 'submitted'}
                <div class="flex justify-center py-8">
                    <div class="flex gap-2.5 opacity-40">
                        <div class="w-2 h-2 bg-[#FFB800] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div class="w-2 h-2 bg-[#FFB800] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div class="w-2 h-2 bg-[#FFB800] rounded-full animate-bounce"></div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>

    <!-- INPUT CONSOLE -->
    <div class="p-10 md:p-16 relative z-20 bg-gradient-to-t from-black via-black to-transparent">
        <form onsubmit={handleSubmit} class="relative w-full max-w-3xl mx-auto flex flex-col items-center">
            <div class="w-full relative">
                <input 
                    bind:this={inputEl}
                    bind:value={inputValue}
                    placeholder="Deine Nachricht..." 
                    class="w-full bg-transparent border-b border-white/20 py-8 md:py-10 text-3xl md:text-4xl text-white text-center font-sans focus:outline-none focus:border-[#FFB800] transition-all placeholder:text-white/10"
                />
                <button 
                    type="submit" 
                    aria-label="Send message"
                    disabled={tavoChat.status === 'streaming' || tavoChat.status === 'submitted'} 
                    class="mt-10 mx-auto w-20 h-20 md:w-24 md:h-24 bg-[#FFB800] text-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(255,184,0,0.3)] disabled:opacity-0 disabled:scale-90 cursor-pointer"
                >
                    <svg class="w-8 h-8 md:w-10 md:h-10 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
            </div>
        </form>
    </div>

  </main>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .font-serif {
    font-family: 'Playfair Display', serif;
  }
  .font-graffiti {
    font-family: 'Permanent Marker', cursive;
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); }
    40% { transform: scale(1.2); }
  }
</style>
