<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  // State
  export let isOpen = false;
  export let dish: any = null;
  export let onClose: () => void;

  let modalContent: HTMLElement;
  let bgOverlay: HTMLElement;

  // Animations
  $: if (isOpen) {
    if (bgOverlay && modalContent) {
      gsap.to(bgOverlay, { opacity: 1, duration: 0.5, pointerEvents: 'auto' });
      gsap.fromTo(modalContent, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }
  } else if (bgOverlay && modalContent) {
    gsap.to(bgOverlay, { opacity: 0, duration: 0.4, pointerEvents: 'none' });
    gsap.to(modalContent, { y: 20, opacity: 0, scale: 0.95, duration: 0.4 });
  }
</script>

<div bind:this={bgOverlay} 
     class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md opacity-0 pointer-events-none flex items-center justify-center p-4 md:p-8"
     on:click={onClose}
>
  {#if dish}
    <div bind:this={modalContent} 
         class="relative w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-[#FFB800]/20 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl"
         on:click|stopPropagation
    >
      <!-- Close Button -->
      <button class="absolute top-6 right-6 z-50 text-white/50 hover:text-[#FFB800] transition-colors" on:click={onClose}>
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <!-- Left: Visual Immersion -->
      <div class="hidden md:block w-[45%] h-full relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] z-10"></div>
        <img src={dish.image} alt={dish.title} class="w-full h-full object-cover scale-110" />
        
        <!-- Region Badge -->
        <div class="absolute bottom-10 left-10 z-20">
          <span class="block text-[#FFB800] text-xs font-bold uppercase tracking-[0.2em] mb-2">Herkunft</span>
          <span class="font-serif text-5xl text-white">{dish.origin || 'Unbekannt'}</span>
        </div>
      </div>

      <!-- Right: The Story -->
      <div class="w-full md:w-[55%] h-full overflow-y-auto custom-scrollbar p-8 md:p-16 flex flex-col relative overscroll-contain">
        <!-- Background Texture -->
        <div class="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <!-- Header -->
        <div class="mb-12 relative z-10">
          <div class="flex items-center gap-4 mb-4">
            <span class="px-3 py-1 border border-[#FFB800] text-[#FFB800] text-[10px] font-bold uppercase tracking-widest rounded-full">
              {dish.category || 'Spezialität'}
            </span>
          </div>
          <h2 class="font-serif text-4xl md:text-6xl text-white leading-none mb-6">
            {dish.title}
          </h2>
          <div class="w-20 h-1 bg-[#FFB800]"></div>
        </div>

        <!-- Narrative Content -->
        <div class="space-y-8 relative z-10 text-gray-300 font-sans font-light leading-relaxed text-lg">
          <p class="first-letter:text-4xl first-letter:text-[#FFB800] first-letter:font-serif first-letter:mr-1">
            {dish.story || "Ein Gericht, das für sich selbst spricht. Keine Abkürzungen, nur Geschmack."}
          </p>
          
          <p>
            {dish.details || "Zubereitet mit traditionellen Techniken, neu interpretiert für hier und jetzt."}
          </p>

          <!-- Quote -->
          <blockquote class="border-l-2 border-[#FFB800] pl-6 italic text-white/60 my-8">
            "{dish.quote || 'Das ist nicht nur Essen. Das ist eine Erinnerung.'}"
          </blockquote>
        </div>

        <!-- Footer / Action -->
        <div class="mt-auto pt-12 border-t border-white/10 flex items-center justify-between relative z-10">
          <div class="flex flex-col">
            <span class="text-xs text-gray-500 uppercase tracking-widest mb-1">Preis</span>
            <span class="font-serif text-3xl text-[#FFB800]">{dish.price}</span>
          </div>
          
          <button class="bg-white text-black px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#FFB800] transition-colors flex items-center gap-3">
            <span>Probieren</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>

      </div>
    </div>
  {/if}
</div>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 184, 0, 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 184, 0, 0.5);
  }
</style>
