<script lang="ts">
  // Netflix-style Video Carousel - Enhanced UX
  import { onMount, tick } from 'svelte';
  import { gsap } from 'gsap';
  import { createEventDispatcher } from 'svelte';
  
  let activeFilter = $state('all');
  let scrollProgress = $state(0);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(true);
  let hoveredCard = $state<number | null>(null);
  
  let sectionEl: HTMLElement;
  let headerEl: HTMLElement;
  let filtersEl: HTMLElement;
  let carouselEl: HTMLElement;
  
  const dispatch = createEventDispatcher();
  
  const filters = [
    { id: 'all', label: 'Alle' },
    { id: 'mexico', label: 'Mexiko' },
    { id: 'streetfood', label: 'Street Food' },
    { id: 'rezepte', label: 'Rezepte' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'reisen', label: 'Reisen' },
  ];
  
  /* VALID VIDEO DATA TO PREVENT BROKEN THUMBNAILS */
  const videos = [
    { id: 't2JjwN-O1bs', title: 'Street Food Mexico', category: 'streetfood', type: 'SERIE', top10: true, duration: '45 MIN', year: '2024' },
    { id: 'P3Tmvx1C_c4', title: 'Berlin Döner Guide', category: 'streetfood', type: 'EPISODE', top10: false, duration: '32 MIN', year: '2024' },
    { id: 'i9E_Blai8vk', title: 'Tacos in CDMX', category: 'mexico', type: 'EPISODE', top10: false, duration: '28 MIN', year: '2023' },
    { id: 'Ur_w5w_Jpjs', title: 'Perfect Steak', category: 'rezepte', type: 'REZEPT', top10: false, duration: '15 MIN', year: '2024' },
    { id: '0SPwwpCZw38', title: 'Taco Al Pastor', category: 'rezepte', type: 'REZEPT', top10: true, duration: '12 MIN', year: '2024' },
    { id: 'OQ5zF48rC90', title: 'Best Pizza Naples', category: 'restaurants', type: 'GUIDE', top10: false, duration: '38 MIN', year: '2023' },
    { id: 'W2Z7fbqG-V0', title: 'Japan Street Food', category: 'reisen', type: 'SERIE', top10: false, duration: '52 MIN', year: '2024' },
    { id: 'ysz5S6PUM-U', title: 'Oaxaca Food Tour', category: 'mexico', type: 'EPISODE', top10: false, duration: '41 MIN', year: '2024' },
  ];
  
  const filteredVideos = $derived(
    activeFilter === 'all' ? videos : videos.filter(v => v.category === activeFilter)
  );
  
  let isDown = false;
  let startX = 0;
  let scrollLeftInitial = 0;
  let isDragging = false;

  function handleImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    // Fallback to hqdefault if maxresdefault fails
    if (img.src.includes('maxresdefault')) {
      img.src = img.src.replace('maxresdefault', 'hqdefault');
    }
  }

  function updateScrollState() {
    if (!carouselEl) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselEl;
    const maxScroll = scrollWidth - clientWidth;
    scrollProgress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    canScrollLeft = scrollLeft > 10;
    canScrollRight = scrollLeft < maxScroll - 10;
  }
  
  function scrollCarousel(direction: 'left' | 'right') {
    if (!carouselEl) return;
    const cardWidth = 320; 
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    carouselEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  
  // Drag to Scroll Logic
  function handleMouseDown(e: MouseEvent) {
    isDown = true;
    isDragging = false;
    startX = e.pageX - carouselEl.offsetLeft;
    scrollLeftInitial = carouselEl.scrollLeft;
    carouselEl.style.cursor = 'grabbing';
    carouselEl.style.scrollBehavior = 'auto'; // Disable smooth scroll for direct drag
  }
  
  function handleMouseLeave() {
    isDown = false;
    if (carouselEl) {
      carouselEl.style.cursor = 'grab';
      carouselEl.style.scrollBehavior = 'smooth';
    }
  }
  
  function handleMouseUp() {
    isDown = false;
    if (carouselEl) {
      carouselEl.style.cursor = 'grab';
      carouselEl.style.scrollBehavior = 'smooth';
    }
    // Small delay to allow click event to fire if it wasn't a drag
    setTimeout(() => isDragging = false, 50);
  }
  
  function handleMouseMove(e: MouseEvent) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselEl.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    carouselEl.scrollLeft = scrollLeftInitial - walk;
    
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }
  }

  function handleCardClick(video: any) {
    if (isDragging) return;
    dispatch('openVideo', video);
  }

  async function handleFilterChange(filterId: string) {
    activeFilter = filterId;
    await tick();
    updateScrollState();
    if (carouselEl) carouselEl.scrollTo({ left: 0, behavior: 'smooth' });
  }

  onMount(() => {
    // GSAP entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(headerEl, { x: -60, opacity: 0, duration: 1 });
    
    updateScrollState();
    if (carouselEl) carouselEl.style.cursor = 'grab';
  });
</script>

<section bind:this={sectionEl} class="group/section relative py-20 px-6 md:px-12 lg:px-20 bg-[#0a0a0a] select-none">
  
  <!-- FILM GRAIN -->
  <div class="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
       style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
  
  <!-- TOP GRADIENT -->
  <div class="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
  
  <div class="max-w-[1920px] mx-auto relative z-10">
    
    <!-- HEADER -->
    <div bind:this={headerEl} class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <span class="text-[#FFB800] font-black text-2xl">B</span>
          <span class="text-white/40 font-bold text-[10px] tracking-[0.4em] uppercase">ORIGINALS</span>
        </div>
        <div class="w-px h-8 bg-white/10"></div>
        <h2 class="font-oswald text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
            style="text-shadow: 0 4px 20px rgba(0,0,0,0.5);">
          Meine <span class="text-[#FFB800]">Videos</span>
        </h2>
      </div>
      
      <!-- ALLE ANSEHEN LINK -->
      <a href="/videos" class="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold group">
        <span>Alle ansehen</span>
        <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
    
    <!-- FILTER PILLS -->
    <div bind:this={filtersEl} class="flex flex-wrap gap-3 mb-12 relative z-20">
      {#each filters as filter}
        <button
          type="button"
          onclick={() => handleFilterChange(filter.id)}
          class="relative px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer overflow-hidden
                 {activeFilter === filter.id 
                   ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                   : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-sm'}"
        >
          {filter.label}
          {#if activeFilter === filter.id}
            <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFB800]"></span>
          {/if}
        </button>
      {/each}
    </div>
    
    <!-- VIDEO CAROUSEL WRAPPER -->
    <div class="group/carousel relative">
      
      <!-- LEFT NAVIGATION ARROW (Always visible on desktop hover, opaque bg) -->
      <button
        type="button"
        onclick={() => scrollCarousel('left')}
        class="absolute left-0 top-0 bottom-6 z-30 w-16 bg-gradient-to-r from-black/80 to-transparent
               flex items-center justify-center -ml-4 pl-4
               opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer
               {canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'}"
        aria-label="Scroll left"
      >
        <svg class="w-10 h-10 text-white drop-shadow-md transform hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <!-- RIGHT NAVIGATION ARROW -->
      <button
        type="button"
        onclick={() => scrollCarousel('right')}
        class="absolute right-0 top-0 bottom-6 z-30 w-16 bg-gradient-to-l from-black/80 to-transparent
               flex items-center justify-center -mr-4 pr-4
               opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer
               {canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'}"
        aria-label="Scroll right"
      >
        <svg class="w-10 h-10 text-white drop-shadow-md transform hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      <!-- SCROLL CONTAINER -->
      <div 
        bind:this={carouselEl} 
        onscroll={updateScrollState}
        onmousedown={handleMouseDown}
        onmouseleave={handleMouseLeave}
        onmouseup={handleMouseUp}
        onmousemove={handleMouseMove}
        class="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      >
        {#if filteredVideos.length === 0}
          <!-- EMPTY STATE -->
          <div class="flex-shrink-0 w-full h-[400px] flex items-center justify-center">
            <p class="text-white/40 text-lg">Keine Videos in dieser Kategorie</p>
          </div>
        {:else}
          {#each filteredVideos as video, i}
            <button
              type="button"
              onclick={() => handleCardClick(video)}
              onmouseenter={() => hoveredCard = i}
              onmouseleave={() => hoveredCard = null}
              class="video-card group relative flex-shrink-0 w-[220px] md:w-[260px] lg:w-[300px] aspect-[2/3] rounded-2xl overflow-hidden 
                     transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] snap-start select-none text-left
                     shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                     {hoveredCard === i ? 'scale-125 z-50 shadow-[0_30px_100px_rgba(0,0,0,1)]' : 'z-10'}"
              style="transform-origin: {i === 0 ? 'left' : (i === filteredVideos.length - 1 ? 'right' : 'center')};"
            >
              <!-- THUMBNAIL -->
              <img 
                src="https://img.youtube.com/vi/{video.id}/maxresdefault.jpg" 
                onerror={handleImgError}
                alt={video.title}
                class="w-full h-full object-cover transition-all duration-700
                       {hoveredCard === i ? 'scale-110 brightness-[0.4] blur-[1px]' : 'scale-105 grayscale-[0.3]'}"
              />
              
              <!-- TOP 10 BADGE -->
              {#if video.top10}
                <div class="absolute top-4 right-4 bg-[#FFB800] text-black text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-wider shadow-lg z-20 transition-all duration-300 {hoveredCard === i ? 'scale-75 translate-x-1 -translate-y-1' : ''}">
                  Top 10
                </div>
              {/if}
              
              <!-- CENTERAL CONTENT (Hover Only) -->
              <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-0 transition-all duration-300"
                   class:opacity-100={hoveredCard === i}>
                 
                 <!-- Play Pulse Button (Matches Category Row) -->
                 <div class="w-16 h-16 rounded-full bg-[#FFB800] text-black flex items-center justify-center mb-6 transform scale-50 opacity-0 transition-all duration-500 delay-100 group-hover:scale-100 group-hover:opacity-100 shadow-[0_0_40px_rgba(255,184,0,0.6)]">
                    <svg class="w-8 h-8 ml-1 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>

                 <!-- Title Section -->
                 <div class="space-y-2 transform translate-y-4 transition-all duration-500 delay-200 group-hover:translate-y-0">
                    <h3 class="font-oswald text-white font-black text-3xl leading-[0.85] uppercase tracking-tighter drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">
                       {video.title}
                    </h3>
                    <div class="flex items-center justify-center gap-2 text-[10px] font-bold text-[#FFB800] tracking-[0.2em] uppercase">
                        <span>{video.type}</span>
                        <span class="w-1 h-1 bg-white/30 rounded-full"></span>
                        <span class="text-white/60">{video.year}</span>
                    </div>
                 </div>

                 <!-- Bottom Metadata -->
                 <div class="absolute bottom-8 w-full px-6 flex flex-col items-center gap-2 opacity-0 transform translate-y-2 transition-all duration-500 delay-300 group-hover:opacity-100 group-hover:translate-y-0 text-white">
                    <div class="flex items-center gap-4 text-[11px] font-black">
                        <span class="text-[#46d369]">98% Match</span>
                        <span class="px-2 py-0.5 border border-white/40 rounded-[2px]">{video.duration}</span>
                        <span class="border border-white/40 px-1 rounded-[2px] uppercase">HD</span>
                    </div>
                 </div>
              </div>

              <!-- STATIC CONTENT (Default View) -->
              <div class="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start transition-opacity duration-300"
                   class:opacity-0={hoveredCard === i}>
                <div class="flex items-center gap-2 mb-1">
                   <div class="w-1 h-3 bg-[#FFB800]"></div>
                   <span class="text-white/40 text-[9px] font-bold tracking-widest uppercase">{video.type}</span>
                </div>
                <h3 class="font-oswald text-2xl font-black text-white uppercase tracking-tight line-clamp-2">{video.title}</h3>
              </div>

            </button>
          {/each}
        {/if}
      </div>

    </div>
    
    <!-- PROGRESS BAR (Dynamic) -->
    <div class="mt-8 flex items-center gap-4">
      <div class="w-32 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-[#FFB800] to-[#FFB800]/60 rounded-full transition-all duration-150"
          style="width: {Math.max(10, scrollProgress)}%"
        ></div>
      </div>
      <span class="text-white/30 text-[10px] font-bold tracking-wider uppercase">
        {filteredVideos.length} Videos
      </span>
    </div>
    
  </div>
  
  <!-- AMBIENT GLOW -->
  <div class="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none"></div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&display=swap');
  .font-oswald { font-family: 'Oswald', sans-serif; }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>
