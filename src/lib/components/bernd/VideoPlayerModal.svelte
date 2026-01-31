<script lang="ts">
  // Bernflix Immersive Video Player Modal - True Fullscreen
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  interface Props {
    videoId: string;
    videoTitle?: string;
    videoType?: string;
    videoDuration?: string;
    videoYear?: string;
    onClose: () => void;
  }
  
  // Using $props() rune for props in Svelte 5
  let { videoId, videoTitle = 'Untitled', videoType = 'VIDEO', videoDuration = '', videoYear = '', onClose }: Props = $props();
  
  let modalEl: HTMLElement;
  let overlayEl: HTMLElement;
  let playerContainerEl: HTMLElement;
  let controlsEl: HTMLElement;
  let isIdle = $state(false);
  let idleTimer: ReturnType<typeof setTimeout>;
  
  function resetIdleTimer() {
    isIdle = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      isIdle = true;
    }, 3000);
  }
  
  function handleMouseMove() {
    resetIdleTimer();
  }
  
  function handleKeydown(e: KeyboardEvent) {
    resetIdleTimer();
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  
  function closeModal() {
    // Quick exit
    gsap.to(modalEl, { opacity: 0, duration: 0.3, onComplete: onClose });
  }
  
  onMount(() => {
    document.body.style.overflow = 'hidden';
    resetIdleTimer();

    // Entrance Animation
    const tl = gsap.timeline();
    tl.from(modalEl, { opacity: 0, duration: 0.5 });
    tl.from(playerContainerEl, { scale: 0.95, duration: 0.8, ease: "power2.out" }, 0);
    tl.from(controlsEl.children, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.3);
    
    return () => {
      document.body.style.overflow = '';
      clearTimeout(idleTimer);
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- FULLSCREEN WRAPPER -->
<div 
  bind:this={modalEl}
  class="fixed inset-0 z-[9999] bg-black text-white overflow-hidden flex flex-col"
  onmousemove={handleMouseMove}
  role="dialog"
  aria-modal="true"
>

  <!-- VIDEO BACKGROUND AREA -->
  <!-- We make the video container fill the screen, but maintain aspect ratio via CSS or allow pillars -->
  <div bind:this={playerContainerEl} class="relative w-full h-full bg-black flex items-center justify-center">
    
    <!-- IFRAME -->
    <iframe
      class="w-full h-full absolute inset-0 object-contain"
      src="https://www.youtube.com/embed/{videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1"
      title={videoTitle}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    
    <!-- SUBTLE VIGNETTE for better UI contrast -->
    <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60 opacity-80"
         class:opacity-0={isIdle} 
         class:duration-500={true}
         class:transition-opacity={true}>
    </div>
  </div>

  <!-- TOP BAR (Back & Logo) -->
  <div bind:this={controlsEl}
       class="absolute top-0 inset-x-0 p-6 md:p-10 flex justify-between items-center z-50 transition-all duration-500"
       class:-translate-y-full={isIdle}
       class:opacity-0={isIdle}>
       
    <!-- BACK BUTTON -->
    <button 
      onclick={closeModal}
      class="group flex items-center gap-3 cursor-pointer"
    >
      <div class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all group-hover:scale-110">
         <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      </div>
      <span class="font-oswald uppercase text-lg hidden md:block opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">Zurück</span>
    </button>

    <!-- BRAND -->
    <div class="flex items-center gap-3">
        <span class="text-[#FFB800] font-black text-3xl font-oswald shadow-lg">B</span>
        <span class="text-white/80 font-bold text-xs tracking-[0.4em] uppercase shadow-black drop-shadow-md">ORIGINALS</span>
    </div>
  </div>

  <!-- BOTTOM INFO OVERLAY -->
  <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-40 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500"
       class:translate-y-full={isIdle}
       class:opacity-0={isIdle}>
    
    <div class="max-w-4xl">
       <div class="flex items-center gap-3 mb-2">
          <span class="bg-[#FFB800] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">{videoType}</span>
          <span class="text-white/60 text-sm font-bold">{videoYear} • {videoDuration}</span>
       </div>
       
       <h1 class="font-oswald text-4xl md:text-6xl font-black uppercase text-white mb-6 drop-shadow-xl leading-none">
         {videoTitle}
       </h1>
       
       <div class="flex gap-4">
         <button class="bg-white text-black px-8 py-3 rounded text-lg font-bold hover:bg-[#FFB800] hover:scale-105 transition-all flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Abspielen
         </button>
         <button class="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded text-lg font-bold hover:bg-white/30 transition-all flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Meine Liste
         </button>
       </div>
    </div>
  </div>

</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&display=swap');
  .font-oswald { font-family: 'Oswald', sans-serif; }
</style>
