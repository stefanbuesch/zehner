<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { gsap } from 'gsap';

  // Refs
  let landingSection: HTMLElement;
  let heroText: HTMLElement;
  let tagline: HTMLElement;
  let videoContainer: HTMLElement;
  let vignette: HTMLElement;
  let altSlice: HTMLElement;
  let altContent: HTMLElement;
  let enterHint: HTMLElement;
  
  // State: which world is the MAIN (right/center), which is the ALT (left slice)
  // Start with Bernd as main, TAVO as alt (on left - first thing reader sees)
  let currentWorld: 'bernd' | 'tavo' = 'bernd';
  let slicePosition: 'left' | 'right' = 'left';
  let isTransitioning = false;

  // Video sources
  const videos = {
    bernd: 'https://www.youtube-nocookie.com/embed/hlwOvxjvh3U?autoplay=1&mute=1&controls=0&loop=1&playlist=hlwOvxjvh3U&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&start=10',
    tavo: 'https://www.youtube-nocookie.com/embed/1TtJdCmpp-4?autoplay=1&mute=1&controls=0&loop=1&playlist=1TtJdCmpp-4&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&start=45'
  };

  // Clip paths for the diagonal slice
  const clipPaths = {
    left: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)',
    right: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'
  };

  onMount(() => {
    // Entrance animation
    const tl = gsap.timeline();
    
    tl.from(videoContainer, { opacity: 0, scale: 1.15, duration: 2.5, ease: "power2.out" });
    tl.from(vignette, { opacity: 0, duration: 1.8 }, "-=2");
    tl.from(altSlice, { x: '-100%', duration: 1.2, ease: "power3.out" }, "-=1");
    tl.from(heroText, { y: 100, opacity: 0, scale: 0.9, duration: 1.6, ease: "elastic.out(1, 0.5)" }, "-=0.8");
    tl.from(tagline, { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    tl.from(altContent, { opacity: 0, x: -30, duration: 0.8, ease: "power2.out" }, "-=0.5");
    tl.from(enterHint, { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
  });

  function switchWorld() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const newWorld = currentWorld === 'bernd' ? 'tavo' : 'bernd';
    const newSlicePosition = slicePosition === 'left' ? 'right' : 'left';
    
    const tl = gsap.timeline({
      onComplete: () => { isTransitioning = false; }
    });
    
    // Slide the slice across the entire screen to the other side
    const slideDistance = slicePosition === 'left' ? 'calc(100vw - 20%)' : 'calc(-100vw + 20%)';
    
    tl.to(altSlice, {
      x: slideDistance,
      duration: 0.6,
      ease: "power2.inOut"
    });
    
    // Switch content at midpoint
    tl.call(() => { 
      currentWorld = newWorld;
      slicePosition = newSlicePosition;
    }, [], 0.3);
    
    // At end, reset position to new side
    tl.set(altSlice, { 
      x: 0,
      left: newSlicePosition === 'left' ? '0' : 'auto',
      right: newSlicePosition === 'right' ? '0' : 'auto',
      clipPath: clipPaths[newSlicePosition]
    });
  }

  function enterWorld() {
    if (isTransitioning) return;
    
    // Navigate to the current world's page
    const route = currentWorld === 'bernd' ? '/bernd' : '/tavo';
    
    // Animate out before navigation
    const tl = gsap.timeline({
      onComplete: () => { goto(route); }
    });
    
    tl.to(landingSection, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.in"
    });
  }

  // Helper to get the alt world
  $: altWorld = currentWorld === 'bernd' ? 'tavo' : 'bernd';
</script>

<div class="h-screen w-full bg-black relative overflow-hidden">
  
  <!-- LANDING SECTION -->
  <section 
    bind:this={landingSection}
    class="h-screen w-full relative overflow-hidden"
  >
    
    <!-- VIDEO BACKGROUND (current world) -->
    <div 
      bind:this={videoContainer}
      class="absolute inset-0 w-full h-full overflow-hidden z-0"
      style="will-change: transform, opacity;"
    >
      <iframe 
        src={videos[currentWorld]}
        class="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 scale-[1.5] pointer-events-none"
        allow="autoplay; encrypted-media"
        title={currentWorld === 'tavo' ? 'TAVO Restaurant' : 'Bernd Zehner'}
      ></iframe>
    </div>

    <!-- Base dark overlay -->
    <div class="absolute inset-0 bg-black/30 z-[5]"></div>
    
    <!-- Vignette -->
    <div 
      bind:this={vignette}
      class="absolute inset-0 pointer-events-none z-[15]" 
      style="box-shadow: inset 0 0 250px rgba(0,0,0,0.9);"
    ></div>

    <!-- DIAGONAL SLICE - Shows the ALT portal -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
      bind:this={altSlice}
      class="absolute top-0 h-full z-30 cursor-pointer overflow-hidden
             {slicePosition === 'left' ? 'left-0' : 'right-0'}"
      style="width: 20%; clip-path: {clipPaths[slicePosition]};"
      on:click={switchWorld}
    >
      <!-- Background for the alt world -->
      <div class="absolute inset-0 
                  {altWorld === 'tavo' 
                    ? 'bg-gradient-to-br from-tavo-gold/25 via-black/70 to-black/90' 
                    : 'bg-gradient-to-br from-white/15 via-black/70 to-black/90'}"></div>
      
      <!-- Diagonal edge glow -->
      <div class="absolute inset-0 pointer-events-none"
           style="background: linear-gradient({slicePosition === 'left' ? '100deg' : '80deg'}, 
                  transparent 85%, 
                  {altWorld === 'tavo' ? 'rgba(212,168,75,0.4)' : 'rgba(255,255,255,0.2)'} 95%, 
                  {altWorld === 'tavo' ? 'rgba(212,168,75,0.6)' : 'rgba(255,255,255,0.3)'} 100%);"></div>
      
      <!-- Content showing the ALT world -->
      <div 
        bind:this={altContent}
        class="absolute inset-0 flex flex-col justify-center
               {slicePosition === 'left' ? 'items-start pl-4 sm:pl-8 md:pl-12' : 'items-end pr-4 sm:pr-8 md:pr-12'}"
      >
        {#if altWorld === 'tavo'}
          <!-- TAVO as alt -->
          <span class="font-graffiti text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-tavo-gold -rotate-2"
                style="text-shadow: 0 0 40px rgba(212,168,75,0.6), 0 4px 25px rgba(0,0,0,0.9);">
            TAVO
          </span>
          <span class="font-sans text-[10px] sm:text-xs md:text-sm text-tavo-gold/70 uppercase tracking-widest mt-2 sm:mt-3">
            Restaurant
          </span>
          <span class="font-sans text-[8px] sm:text-[10px] text-tavo-gold/50 uppercase tracking-wider mt-0.5">
            Wiesbaden
          </span>
        {:else}
          <!-- Bernd as alt -->
          <span class="font-graffiti text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
                style="text-shadow: 0 0 25px rgba(255,255,255,0.3), 0 4px 25px rgba(0,0,0,0.9);">
            Bernd
          </span>
          <span class="font-graffiti text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/80 -mt-1"
                style="text-shadow: 0 2px 20px rgba(0,0,0,0.9);">
            Zehner
          </span>
          <span class="font-sans text-[10px] sm:text-xs md:text-sm text-white/60 uppercase tracking-widest mt-2 sm:mt-3">
            Videos & Rezepte
          </span>
        {/if}
      </div>
    </div>

    <!-- MAIN CONTENT AREA - Clickable to enter -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
      class="absolute inset-0 z-20 cursor-pointer"
      style="clip-path: {slicePosition === 'left' ? 'polygon(20% 0, 100% 0, 100% 100%, 15% 100%)' : 'polygon(0 0, 85% 0, 80% 100%, 0 100%)'};"
      on:click={enterWorld}
    >
      <!-- CENTRAL IDENTITY (Current World) -->
      <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
        {#if currentWorld === 'bernd'}
          <h1 
            bind:this={heroText}
            class="font-graffiti text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] text-white leading-[0.85] tracking-tight text-center"
            style="text-shadow: 0 0 40px rgba(0,0,0,1), 0 6px 80px rgba(0,0,0,0.95), 4px 4px 0 rgba(0,0,0,0.3);">
            BERND<br>ZEHNER
          </h1>
          <p 
            bind:this={tagline}
            class="font-sans text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.4em] text-stone-300 uppercase mt-4 sm:mt-6 md:mt-8"
            style="text-shadow: 0 2px 20px rgba(0,0,0,0.95);">
            Koch · Creator · Gastronom
          </p>
        {:else}
          <h1 
            bind:this={heroText}
            class="font-graffiti text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] text-tavo-gold leading-[0.85] tracking-tight text-center -rotate-2"
            style="text-shadow: 0 0 60px rgba(212,168,75,0.6), 0 6px 80px rgba(0,0,0,0.95), 4px 4px 0 rgba(0,0,0,0.3);">
            TAVO
          </h1>
          <p 
            bind:this={tagline}
            class="font-sans text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.4em] text-tavo-gold/80 uppercase mt-4 sm:mt-6 md:mt-8"
            style="text-shadow: 0 2px 20px rgba(0,0,0,0.95);">
            Soulfood · Wiesbaden
          </p>
        {/if}
        
        <!-- Enter hint -->
        <div 
          bind:this={enterHint}
          class="mt-12 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        >
          <span class="text-xs uppercase tracking-widest {currentWorld === 'tavo' ? 'text-tavo-gold/60' : 'text-white/60'}">
            Klicken zum Eintreten
          </span>
          <svg class="w-5 h-5 {currentWorld === 'tavo' ? 'text-tavo-gold/40' : 'text-white/40'} animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="absolute bottom-0 left-0 right-0 z-50 py-2 px-4">
      <div class="flex justify-center items-center gap-4 sm:gap-6 text-[7px] sm:text-[8px] text-stone-500 uppercase tracking-widest">
        <a href="/impressum" class="hover:text-stone-300 transition-colors pointer-events-auto">Impressum</a>
        <span class="text-stone-600">·</span>
        <a href="/datenschutz" class="hover:text-stone-300 transition-colors pointer-events-auto">Datenschutz</a>
      </div>
    </footer>
  </section>
</div>
