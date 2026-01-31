<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { gsap } from 'gsap';

  const dispatch = createEventDispatcher();

  // --- 1. PREMIUM CONTENT DATA (Unsplash Covers + Real YT Data) ---
  const categories = [
    {
      title: "MISSION TAVO",
      subtitle: "Der Weg zum eigenen Restaurant",
      videos: [
        { id: '1u4kQ4O_xCw', title: 'Eröffnungstag im TAVO', year: '2024', duration: '45m', rating: '12+', type: 'DOKU', views: '98% Match', cover: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop' },
        { id: 'OQ5zF48rC90', title: 'Pizza-Test Neapel', year: '2023', duration: '38m', rating: '6+', type: 'REISE', views: 'New', cover: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop' },
        { id: 'P3Tmvx1C_c4', title: 'Döner Guide Berlin', year: '2024', duration: '32m', rating: '12+', type: 'GUIDE', views: 'Trending', cover: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop' },
        { id: '5_wWq1nLqgU', title: 'Hinter den Kulissen', year: '2024', duration: '22m', rating: '0+', type: 'BTS', views: '95% Match', cover: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop' },
        { id: 'reU16MvF-_c', title: 'Menu Tasting TAVO', year: '2024', duration: '18m', rating: '6+', type: 'VLOG', views: 'Top 10', cover: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop' },
      ]
    },
    {
      title: "FOOD TOURS WORLDWIDE",
      subtitle: "Die besten Geschmäcker der Welt",
      videos: [
        { id: 't2JjwN-O1bs', title: 'Street Food Mexico', year: '2024', duration: '45m', rating: '18+', type: 'SERIE', views: 'New', cover: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop' },
        { id: 'W2Z7fbqG-V0', title: 'Japan Food Trip', year: '2024', duration: '52m', rating: '12+', type: 'SERIE', views: '99% Match', cover: 'https://images.unsplash.com/photo-1580822184713-fc54006efa4e?q=80&w=600&auto=format&fit=crop' },
        { id: 'ysz5S6PUM-U', title: 'Oaxaca Specials', year: '2023', duration: '41m', rating: '12+', type: 'DOKU', views: 'Awarded', cover: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop' },
        { id: 'i9E_Blai8vk', title: 'Tacos in CDMX', year: '2023', duration: '28m', rating: '12+', type: 'GUIDE', views: '90% Match', cover: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop' },
        { id: 'USk_0rE-l2M', title: 'New York Pizza', year: '2022', duration: '35m', rating: '6+', type: 'VLOG', views: 'Classic', cover: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop' },
      ]
    },
    {
      title: "KITCHEN SECRETS",
      subtitle: "Rezepte & The Perfect Bite",
      videos: [
        { id: 'Ur_w5w_Jpjs', title: 'Das Perfekte Steak', year: '2024', duration: '15m', rating: '6+', type: 'TUTORIAL', views: 'Must Watch', cover: 'https://images.unsplash.com/photo-1600891965052-25ae4121b6ee?q=80&w=600&auto=format&fit=crop' },
        { id: '0SPwwpCZw38', title: 'Tacos Al Pastor', year: '2024', duration: '12m', rating: '0+', type: 'REZEPT', views: 'Quick', cover: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=600&auto=format&fit=crop' },
        { id: 'H7H4z_uB0k0', title: 'Saucen Masterclass', year: '2023', duration: '25m', rating: '0+', type: 'MASTER', views: 'Expert', cover: 'https://images.unsplash.com/photo-1472476443507-c7a392dd12c7?q=80&w=600&auto=format&fit=crop' },
        { id: 'dQw4w9WgXcQ', title: 'Kitchen Hacks #1', year: '2024', duration: '08m', rating: '0+', type: 'HACKS', views: 'Trending', cover: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop' },
        { id: 'RQMhwkAhcHU', title: 'Echtes BBQ', year: '2023', duration: '40m', rating: '12+', type: 'GUIDE', views: 'Hot', cover: 'https://images.unsplash.com/photo-1529193591184-b1d580690dd0?q=80&w=600&auto=format&fit=crop' },
      ]
    }
  ];

  let hoveredCategoryIndex = $state(-1);
  let hoveredVideoIndex = $state(-1);
  let hoverTimeout: ReturnType<typeof setTimeout>;

  function animateHover(cIndex: number, vIndex: number, isEnter: boolean) {
    const cardId = `card-${cIndex}-${vIndex}`;
    const externalTitle = document.querySelector(`#ext-title-${cIndex}-${vIndex}`);
    const internalTitle = document.querySelector(`#int-title-${cIndex}-${vIndex}`);
    const metadata = document.querySelector(`#meta-${cIndex}-${vIndex}`);

    if (isEnter) {
        // ENTER ANIMATION
        // 1. External Title moves UP and fades OUT
        if (externalTitle) {
            gsap.to(externalTitle, { y: -20, opacity: 0, duration: 0.3, ease: 'power2.out' });
        }
        // 2. Internal Title moves UP (from below) and fades IN
        if (internalTitle) {
            gsap.fromTo(internalTitle, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.2)' }
            );
        }
        // 3. Metadata fades in
        if (metadata) {
            gsap.fromTo(metadata, 
                { opacity: 0, y: 10 }, 
                { opacity: 1, y: 0, duration: 0.3, delay: 0.2 }
            );
        }
    } else {
        // LEAVE ANIMATION (Quick Reset)
        if (externalTitle) {
            gsap.to(externalTitle, { y: 0, opacity: 1, duration: 0.3, delay: 0.1 });
        }
        if (internalTitle) {
             gsap.to(internalTitle, { opacity: 0, duration: 0.2 });
        }
        if (metadata) {
             gsap.to(metadata, { opacity: 0, duration: 0.2 });
        }
    }
  }

  function handleCardEnter(cIndex: number, vIndex: number) {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      hoveredCategoryIndex = cIndex;
      hoveredVideoIndex = vIndex;
      animateHover(cIndex, vIndex, true);
    }, 400); // 400ms delay to prevent flickering scroll
  }

  function handleCardLeave() {
    // Only animate out if we actually were hovering something
    if (hoveredCategoryIndex !== -1) {
        animateHover(hoveredCategoryIndex, hoveredVideoIndex, false);
    }
    clearTimeout(hoverTimeout);
    hoveredCategoryIndex = -1;
    hoveredVideoIndex = -1;
  }

  function openVideo(video: any) {
    dispatch('openVideo', video);
  }

  function scrollRow(catIndex: number, direction: 'left' | 'right') {
    const row = document.getElementById(`row-${catIndex}`);
    if (row) {
      const scrollAmount = row.clientWidth * 0.75;
      row.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  }
</script>

<div class="py-12 bg-[#0a0a0a] space-y-8 overflow-x-hidden md:overflow-visible relative z-20">
  
  {#each categories as category, catIndex}
    <div class="group/category px-6 md:px-12 lg:px-20 relative z-10">
      
      <!-- HEADER COMPACT WITH CONTROLS -->
      <div class="flex items-center justify-between mb-3 group/header cursor-pointer select-none">
        <div>
          <div class="flex items-center gap-2 mb-0.5">
             <div class="w-1 h-5 bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.6)]"></div>
             <h3 class="font-oswald text-white text-lg md:text-xl font-bold tracking-wide uppercase group-hover/header:text-[#FFB800] transition-colors duration-300">
               {category.title}
             </h3>
             <span class="hidden md:inline-block text-white/40 text-xs font-bold uppercase tracking-wider ml-3 opacity-0 group-hover/header:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover/header:translate-x-0">
               {category.subtitle}
             </span>
          </div>
        </div>

        <!-- Right Controls: Arrows + See All Button -->
        <div class="flex items-center gap-4">
           
           <!-- Arrows (Desktop Only, fade in/out could be ok here, but let's keep them always visible for consistency or apply hover only to arrows if needed. 
                User said "Alle anzeigen" specifically. 
                Let's make controls always visible for now, it's safer for UX. -->
           <div class="hidden md:flex items-center gap-1 opacity-0 group-hover/category:opacity-100 transition-opacity duration-300">
              <button onclick={(e) => { e.stopPropagation(); scrollRow(catIndex, 'left'); }} class="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onclick={(e) => { e.stopPropagation(); scrollRow(catIndex, 'right'); }} class="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
              </button>
           </div>

           <!-- See All Button (ALWAYS VISIBLE, NO ANIMATION) -->
           <div class="flex items-center justify-center bg-[#333]/80 hover:bg-[#555] text-white px-3 py-1 rounded gap-1 transition-colors">
              <span class="text-[10px] font-bold uppercase tracking-wide">Alle anzeigen</span>
              <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
           </div>
        </div>
      </div>
      
      <!-- SCROLL ROW -->
      <div class="relative -mx-6 md:-mx-12 lg:-mx-20"> 
        <div 
          id="row-{catIndex}"
          class="flex gap-2 overflow-x-auto px-6 md:px-12 lg:px-20 pb-14 pt-4 scrollbar-hide snap-x snap-mandatory items-center scroll-smooth"
        >
          
          {#each category.videos as video, vidIndex}
            <!-- CARD WRAPPER -->
            <div 
              class="relative flex-none w-[200px] md:w-[240px] aspect-video z-10 transition-all duration-300"
              style="z-index: {hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex ? 50 : 1};"
            >
              <!-- INTERACTIVE CARD -->
              <div
                id="card-{catIndex}-{vidIndex}"
                class="absolute inset-0 w-full h-full bg-[#141414] rounded shadow-md overflow-hidden transition-all duration-300 ease-out origin-center focus:outline-none group/inner cursor-pointer"
                class:scale-[1.5]={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}
                class:z-50={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}
                class:shadow-[0_20px_60px_rgba(0,0,0,0.95)]={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}
                class:rounded-lg={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}
                onclick={() => openVideo(video)}
                onmouseenter={() => handleCardEnter(catIndex, vidIndex)}
                onmouseleave={handleCardLeave}
              >
                <!-- COVER IMAGE -->
                <div class="relative w-full h-full">
                  <img src={video.cover} alt={video.title} class="w-full h-full object-cover transition-transform duration-700 {hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex ? 'scale-110 brightness-75' : 'scale-100'}" />
                  
                  <!-- HOVER UI CONTAINER -->
                  <div class="absolute inset-0 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300"
                       class:opacity-100={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}>
                     
                     <!-- TOP: Series/Episode Info -->
                     <div class="transform -translate-y-2 transition-transform duration-300 delay-100"
                          class:translate-y-0={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}>
                        <h5 class="text-white font-bold text-[8px] uppercase tracking-widest drop-shadow-md">
                           {video.type} <span class="text-white/60">#1</span>
                        </h5>
                     </div>

                     <!-- MIDDLE: Big Title (Centered/Left) -->
                     <div class="flex-grow flex items-center transform scale-90 transition-transform duration-300 delay-150"
                          class:scale-100={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}>
                        <h3 class="font-oswald text-white font-black text-xl leading-[0.9] uppercase tracking-tighter drop-shadow-xl text-left line-clamp-3">
                           {video.title}
                        </h3>
                     </div>

                     <!-- BOTTOM: Controls & Meta -->
                     <div class="transform translate-y-2 transition-transform duration-300 delay-200"
                          class:translate-y-0={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}>
                        
                        <!-- Buttons Row -->
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                               <svg class="w-4 h-4 ml-0.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <!-- "Add" Button -->
                            <div class="w-8 h-8 rounded-full border-2 border-white/50 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition-all">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                            </div>
                        </div>

                        <!-- Meta Info Row -->
                        <div class="flex items-center gap-3 text-[10px] font-bold">
                            <!-- Match Score (Green) -->
                            <span class="text-[#46d369]">{video.views}</span> <!-- Using views prop for match score/trending -->
                            
                            <span class="border border-white/40 text-white/90 px-1 rounded-[2px]">{video.rating}</span>
                            <span class="text-white/60">{video.duration}</span>
                            <span class="border border-white/40 text-[8px] px-1 rounded-[2px] uppercase">HD</span>
                        </div>
                        
                        <!-- Genre Tags -->
                        <div class="flex gap-2 mt-1.5 text-[9px] text-white/50 font-medium">
                            <span>Kochen</span>
                            <span class="bg-white/30 w-1 h-1 rounded-full self-center"></span>
                            <span>{video.type}</span>
                            <span class="bg-white/30 w-1 h-1 rounded-full self-center"></span>
                            <span>Lifestyle</span>
                        </div>

                     </div>
                  </div>
                </div>
              </div>

              <!-- EXTERNAL LABEL (Only visible in 'Chips' mode / Normal state) -->
              <div id="ext-title-{catIndex}-{vidIndex}" 
                   class="absolute top-[105%] left-0 w-full flex flex-col items-start px-1 transition-all duration-300 pointer-events-none origin-top"
                   class:opacity-0={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}
                   class:scale-90={hoveredCategoryIndex === catIndex && hoveredVideoIndex === vidIndex}>
                  
                  <h4 class="font-oswald text-white font-bold text-sm uppercase tracking-wide truncate w-full mb-0.5 leading-tight">{video.title}</h4>
                  
                  <div class="flex items-center gap-2 text-[10px] text-white/40 font-bold">
                    <span>{video.year}</span>
                    <span>•</span>
                    <span class="border border-white/10 px-1 rounded text-white/30">{video.rating}</span>
                  </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    
    </div>
  {/each}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&display=swap');
  .font-oswald { font-family: 'Oswald', sans-serif; }

  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
  .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
</style>
