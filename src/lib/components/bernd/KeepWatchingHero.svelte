<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  // Data simulating "Continue Watching" state
  const videos = [
    {
      id: 't2JjwN-O1bs',
      title: 'Skyscraper', // From reference, using placeholders
      subtitle: 'New • 16+ • 2h 06m',
      description: 'Will Sawyer is a former FBI Hostage Rescue Team leader. But now it evaluates the safety of skyscrapers. During his duty in China, when the longest and safest building in the world remains in fire, all crime is thrown on him.',
      progress: 65, // % watched
      timeLeft: '1:17:40',
      thumbnail: 'https://img.youtube.com/vi/t2JjwN-O1bs/maxresdefault.jpg'
    },
    {
      id: 'P3Tmvx1C_c4',
      title: 'Berlin Döner Guide',
      subtitle: 'Staffel 1 • Folge 3',
      description: 'Die Suche nach dem besten Döner der Hauptstadt geht weiter. Bernd testet die Legenden.',
      progress: 30,
      timeLeft: '22:15',
      thumbnail: 'https://img.youtube.com/vi/P3Tmvx1C_c4/maxresdefault.jpg'
    },
    {
      id: 'i9E_Blai8vk',
      title: 'Tacos in CDMX',
      subtitle: 'Staffel 2 • Folge 1',
      description: 'Mexico City ist ein Dschungel aus Aromen. Wir starten tief im Herzen der Stadt.',
      progress: 10,
      timeLeft: '45:00',
      thumbnail: 'https://img.youtube.com/vi/i9E_Blai8vk/maxresdefault.jpg'
    }
  ];

  let currentIndex = 0;
  let container: HTMLElement;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % videos.length;
  }
</script>

<section bind:this={container} class="relative w-full py-12 px-6 md:px-12 lg:px-20 bg-[#0a0a0a] overflow-hidden">
  
  <!-- Section Title -->
  <div class="flex items-center gap-4 mb-8">
      <div class="w-1 h-8 bg-[#FFB800] rounded-sm shadow-[0_0_10px_rgba(255,184,0,0.5)]"></div>
      <h2 class="font-oswald text-2xl md:text-3xl font-bold text-white tracking-wide">Keep watching</h2>
  </div>

  <!-- Carousel/Spotlight Container -->
  <div class="relative w-full flex items-stretch gap-6 md:gap-12">
    
    <!-- ACTIVE HIGHLIGHT (Left, Large) -->
    <div class="relative w-full md:w-[65%] lg:w-[70%] aspect-video rounded-xl overflow-hidden group shadow-2xl ring-1 ring-white/10">
       
        <!-- Background Image -->
        <img 
            src={videos[currentIndex].thumbnail} 
            alt={videos[currentIndex].title}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

        <!-- Content Overlay -->
        <div class="absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-start max-w-2xl">
            
            <div class="mb-2 flex items-center gap-3">
               <span class="text-xs font-bold tracking-widest text-gray-400 uppercase">Movies</span>
            </div>

            <h1 class="font-oswald text-4xl md:text-6xl font-black text-[#f5c518] mb-4 tracking-tight drop-shadow-xl">
                {videos[currentIndex].title}
            </h1>

            <div class="flex items-center gap-4 mb-6 text-sm font-bold text-white/90">
                <span class="text-[#FFB800]">New</span>
                <span class="border border-white/30 px-2 py-0.5 rounded text-[10px]">16+</span>
                <span>{videos[currentIndex].subtitle}</span>
            </div>

            <p class="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-lg line-clamp-3 md:line-clamp-none">
                {videos[currentIndex].description}
            </p>

            <div class="flex items-center gap-4">
                <button class="bg-[#FFB800] hover:bg-[#e6a600] text-black px-8 py-3 rounded-full font-black uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Keep watching
                </button>
                <button class="bg-transparent border border-white/30 hover:border-white text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all hover:bg-white/10">
                    Add list
                </button>
            </div>
        </div>

        <!-- Progress Bar (Bottom) -->
        <div class="absolute bottom-8 left-8 text-xs font-bold text-white z-20">
            {videos[currentIndex].timeLeft}
        </div>
        
        <div class="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div class="h-full bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.8)] relative" style="width: {videos[currentIndex].progress}%">
                <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
            </div>
        </div>
    </div>


    <!-- NEXT ITEMS PREVIEW (Right sidebar) -->
    <div class="hidden md:flex flex-col gap-4 w-[30%]">
        {#each videos as video, i}
            {#if i !== currentIndex}
                <button 
                    onclick={() => currentIndex = i}
                    class="relative w-full aspect-video rounded-lg overflow-hidden group/item cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-[1.02] ring-1 ring-white/10 hover:ring-white/30"
                >
                    <img src={video.thumbnail} alt={video.title} class="w-full h-full object-cover" />
                    <!-- Progress Overlay -->
                    <div class="absolute bottom-0 left-0 w-full h-1 bg-black/50">
                        <div class="h-full bg-[#FFB800]" style="width: {video.progress}%"></div>
                    </div>
                </button>
            {/if}
        {/each}
    </div>

  </div>

  <!-- Pagination Indicators (Bottom left relative to section) -->
  <div class="flex items-center gap-2 mt-8 md:ml-0">
      {#each videos as _, i}
         <div class="h-1 rounded-full transition-all duration-300 {i === currentIndex ? 'w-8 bg-[#FFB800]' : 'w-4 bg-white/20'}"></div>
      {/each}
  </div>

</section>
