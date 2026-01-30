<script lang="ts">
  // Netflix-style Video Carousel for Bernd - with GSAP & Hero Design
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { createEventDispatcher } from 'svelte';
  
  let activeFilter = $state('all');
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
  
  const videos = [
    { id: 'RQMhwkAhcHU', title: 'Street Story Mexiko', category: 'mexico', type: 'SERIE', top10: false },
    { id: '5_wWq1nLqgU', title: 'Berlin Wedding', category: 'streetfood', type: 'EPISODE', top10: true },
    { id: 'H_9Vp6b_JzI', title: 'Game Over', category: 'mexico', type: 'EPISODE', top10: false },
    { id: 'H7H4z_uB0k0', title: 'Anatomy Lesson', category: 'rezepte', type: 'REZEPT', top10: false },
    { id: 'dQw4w9WgXcQ', title: 'Taco Perfection', category: 'rezepte', type: 'REZEPT', top10: true },
    { id: 'dQw4w9WgXcQ', title: 'Best Taquerias', category: 'restaurants', type: 'GUIDE', top10: false },
  ];
  
  const filteredVideos = $derived(
    activeFilter === 'all' ? videos : videos.filter(v => v.category === activeFilter)
  );
  
  function openVideo(videoId: string) {
    dispatch('openVideo', videoId);
  }

  onMount(() => {
    // GSAP Timeline - matching hero animation style
    const tl = gsap.timeline({ 
      defaults: { ease: "power4.out" }
    });
    
    // Animate header
    tl.from(headerEl, { 
      x: -60, 
      opacity: 0, 
      duration: 1 
    });
    
    // Animate filter pills with stagger
    tl.from(filtersEl.children, { 
      y: 20, 
      opacity: 0, 
      duration: 0.6,
      stagger: 0.08
    }, "-=0.6");
  });
</script>

<section bind:this={sectionEl} class="relative py-20 px-6 md:px-12 lg:px-20 bg-[#0a0a0a] overflow-hidden">
  
  <!-- FILM GRAIN (matching hero) -->
  <div class="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
       style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>
  
  <!-- TOP GRADIENT (cinematic transition from hero) -->
  <div class="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
  
  <div class="max-w-[1920px] mx-auto relative z-10">
    
    <!-- HEADER (matching hero typography) -->
    <div bind:this={headerEl} class="flex items-center gap-4 mb-8">
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
    
    <!-- FILTER PILLS (cinematic style) -->
    <div bind:this={filtersEl} class="flex flex-wrap gap-3 mb-12">
      {#each filters as filter}
        <button
          type="button"
          onclick={() => activeFilter = filter.id}
          class="px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer
                 {activeFilter === filter.id 
                   ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                   : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-sm'}"
        >
          {filter.label}
        </button>
      {/each}
    </div>
    
    <!-- VIDEO CAROUSEL -->
    <div class="relative">
      <!-- SCROLL CONTAINER -->
      <div bind:this={carouselEl} class="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
        {#each filteredVideos as video, i}
          <button
            type="button"
            onclick={() => openVideo(video.id)}
            class="video-card group relative flex-shrink-0 w-[220px] md:w-[260px] lg:w-[300px] aspect-[2/3] rounded-2xl overflow-hidden 
                   hover:scale-[1.08] hover:z-20 transition-all duration-500 cursor-pointer snap-start
                   shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(255,184,0,0.15)]"
          >
            <!-- THUMBNAIL -->
            <img 
              src="https://img.youtube.com/vi/{video.id}/maxresdefault.jpg" 
              alt={video.title}
              class="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700"
            />
            
            <!-- TOP 10 BADGE -->
            {#if video.top10}
              <div class="absolute top-4 right-4 bg-[#FFB800] text-black text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-wider shadow-lg">
                Top 10
              </div>
            {/if}
            
            <!-- CINEMATIC GRADIENT OVERLAY -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
            
            <!-- DIAGONAL ACCENT (Netflix style) -->
            <div class="absolute bottom-0 left-0 w-2 h-full bg-gradient-to-t from-[#FFB800] via-[#FFB800]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            <!-- CONTENT -->
            <div class="absolute inset-x-0 bottom-0 p-5 flex flex-col">
              <!-- TYPE BADGE -->
              <div class="flex items-center gap-2 mb-3">
                <span class="text-[#FFB800] font-black text-lg">B</span>
                <span class="text-white/40 text-[8px] font-bold tracking-[0.3em] uppercase">{video.type}</span>
              </div>
              
              <!-- TITLE -->
              <h3 class="font-oswald text-2xl md:text-3xl font-black text-white leading-[0.95] uppercase tracking-tight"
                  style="text-shadow: 0 2px 10px rgba(0,0,0,0.8);">
                {video.title}
              </h3>
              
              <!-- DURATION (on hover) -->
              <div class="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span class="text-white/50 text-[10px] font-bold">45 MIN</span>
                <span class="text-white/30">•</span>
                <span class="text-white/50 text-[10px] font-bold">2024</span>
              </div>
            </div>
            
            <!-- HOVER PLAY BUTTON -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 
                          transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent translate-x-1"></div>
              </div>
            </div>
          </button>
        {/each}
      </div>
      
      <!-- FADE EDGES -->
      <div class="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>
      <div class="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10"></div>
    </div>
    
    <!-- PROGRESS BAR (Netflix style) -->
    <div class="mt-8 flex items-center gap-4">
      <div class="w-32 h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-[#FFB800] to-[#FFB800]/60 rounded-full" style="width: 30%"></div>
      </div>
      <span class="text-white/30 text-[10px] font-bold tracking-wider">SCROLL FOR MORE</span>
    </div>
    
  </div>
  
  <!-- AMBIENT GLOW -->
  <div class="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none"></div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&display=swap');
  .font-oswald { font-family: 'Oswald', sans-serif; }
  
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
</style>
