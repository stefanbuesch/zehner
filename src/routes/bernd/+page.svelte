<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Footer from '$lib/components/bernd/Footer.svelte';
  import VideoCarousel from '$lib/components/bernd/VideoCarousel.svelte';
  import VideoPlayerModal from '$lib/components/bernd/VideoPlayerModal.svelte';
  import VideoCategoryRows from '$lib/components/bernd/VideoCategoryRows.svelte';

  let heroSection: HTMLElement | undefined = undefined;
  let heroTitle: HTMLElement | undefined = undefined;
  let heroDescription: HTMLElement | undefined = undefined;
  let heroButtons: HTMLElement | undefined = undefined;
  let episodeCards: HTMLElement | undefined = undefined;
  let diagonalMask: HTMLElement | undefined = undefined;

  // Video Modal State
  let showModal = $state(false);
  let activeVideo = $state<any>(null);

  function openVideo(video: any) {
    activeVideo = video;
    showModal = true;
  }

  onMount(() => {
    if (!heroSection) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.from(heroSection!, { opacity: 0, scale: 1.1, duration: 2 });
    tl.from(diagonalMask!, { xPercent: 100, duration: 1.5 }, "-=1.5");
    tl.from(heroTitle!, { 
      x: -100, 
      opacity: 0, 
      duration: 1.2,
      stagger: 0.1
    }, "-=1");
    tl.from(heroDescription!, { 
      y: 30, 
      opacity: 0, 
      duration: 1
    }, "-=0.8");
    tl.from(heroButtons!, { 
      y: 20, 
      opacity: 0, 
      duration: 0.8
    }, "-=0.6");
    tl.from(episodeCards!, { 
      x: 50, 
      opacity: 0, 
      duration: 1,
      stagger: 0.1
    }, "-=0.8");
  });
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (showModal = false)} />

<!-- BERND DASHBOARD / NETFLIX STYLE -->
<div class="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden font-sans selection:bg-[#FFB800] selection:text-black">

  <!-- FILM GRAIN -->
  <div class="absolute inset-0 z-[100] pointer-events-none opacity-[0.05]"
       style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');"></div>

  <!-- YOUTUBE BACKGROUND -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden grayscale-[0.2] opacity-40">
    <iframe
      title="Background Video"
      class="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2"
      src="https://www.youtube.com/embed/RQMhwkAhcHU?autoplay=1&mute=1&controls=0&loop=1&playlist=RQMhwkAhcHU&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
    ></iframe>
  </div>

  <!-- CINEMATIC OVERLAY (Lighter, No Diagonal Mask) -->
  <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-20 pointer-events-none"></div>

  <!-- CONTENT WRAPPER -->
  <div class="relative z-30 min-h-screen flex flex-col px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">

    <!-- NAVBAR (Aligned with grid) -->
    <nav class="pt-8 flex items-center justify-between">
      <div class="flex items-center gap-16">
        <a href="/" class="group flex flex-col">
            <span class="font-oswald text-2xl font-black text-white leading-none tracking-tight group-hover:text-[#FFB800] transition-colors">
                BERND <span class="text-[#FFB800] group-hover:text-white">ZEHNER</span>
            </span>
            <span class="text-[8px] font-bold text-white/30 tracking-[0.3em] uppercase mt-1">OFFICIAL CHANNEL</span>
        </a>

        <div class="hidden md:flex items-center gap-10">
          {#each ['VIDEOS', 'REZETTE', 'STORIES', 'SHOP'] as link}
            <a href="/" class="text-[10px] font-bold tracking-[0.2em] text-white/40 hover:text-white transition-all relative group py-2">
              {link}
              {#if link === 'VIDEOS'}
                <div class="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFB800]"></div>
              {:else}
                <div class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FFB800] group-hover:w-full transition-all duration-300"></div>
              {/if}
            </a>
          {/each}
        </div>
      </div>

      <div class="flex items-center gap-6">
          <a href="http://tavo.localhost:5173" class="hidden sm:flex items-center gap-4 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-md">
            <span class="text-[9px] font-bold text-white tracking-[0.2em] uppercase">Zu meinem Restaurant TAVO</span>
            <div class="w-5 h-5 rounded-full bg-[#FFB800] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg class="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </div>
          </a>
      </div>
    </nav>

    <!-- MAIN CONTENT (Reduced top whitespace) -->
    <main class="relative z-30 flex-1 flex flex-col lg:flex-row gap-24 pt-12 lg:pt-20 pb-20 items-center lg:items-center">

        <!-- LEFT: THE STORY (Hero) -->
        <div class="flex flex-col justify-center w-full lg:w-[50%]">
            <div class="flex items-center gap-3 mb-1 opacity-90">
                <span class="text-[#FFB800] font-black text-lg">B</span>
                <span class="text-white/60 font-bold text-[10px] tracking-[0.4em] uppercase">SERIES</span>
            </div>

            <h1 bind:this={heroTitle} class="font-oswald text-6xl md:text-[7.5rem] xl:text-[8.5rem] text-white font-black leading-[0.85] uppercase tracking-tighter mb-4"
                style="text-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                STREET<br>
                <span class="text-[#FFB800]">STORY</span><br>
                MEXIKO
            </h1>

            <div bind:this={heroDescription} class="flex flex-col gap-6">
                <div class="flex items-center gap-6 text-[11px] font-bold tracking-widest text-white/60">
                    <span class="text-[#FFB800]">2024</span>
                    <span class="px-2 py-0.5 border border-white/20 rounded-sm text-[9px]">18+</span>
                    <span>2 SEASONS</span>
                    <span class="px-2 py-0.5 bg-white/10 rounded-sm text-[8px] tracking-normal">ULTRA HD 4K</span>
                </div>

                <p class="text-base md:text-lg text-white/40 leading-[1.6] max-w-sm font-medium">
                    Ich bin in Mexiko unterwegs. Keine Touristen-Fallen. Nur der echte Geschmack der Straße, das Feuer der Garküchen und die besten Tacos der Welt.
                </p>
            </div>

            <div bind:this={heroButtons} class="flex flex-wrap items-center gap-4 mt-10">
                <button onclick={() => openVideo('RQMhwkAhcHU')}
                   type="button"
                   class="bg-white text-black px-10 py-3.5 rounded-full font-bold text-lg uppercase flex items-center gap-3 hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] group cursor-pointer inline-flex">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Play
                </button>
                <button class="bg-white/20 text-white backdrop-blur-md px-10 py-3.5 rounded-full font-bold text-lg uppercase flex items-center gap-3 hover:bg-white/30 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    More Info
                </button>
            </div>

            <!-- HERO NAVIGATION TABS (Transition) -->
            <div class="flex items-center gap-8 mt-16 border-b border-white/10 w-fit pb-4 md:mt-24">
               <div class="relative cursor-pointer group">
                  <span class="text-white font-bold text-sm uppercase tracking-wider">Overview</span>
                  <div class="absolute -bottom-[17px] left-0 w-full h-[3px] bg-[#FFB800] shadow-[0_-2px_10px_rgba(255,184,0,0.5)]"></div>
               </div>
               <div class="relative cursor-pointer group">
                  <span class="text-white/40 font-bold text-sm uppercase tracking-wider group-hover:text-white transition-colors">Episodes</span>
               </div>
               <div class="relative cursor-pointer group">
                  <span class="text-white/40 font-bold text-sm uppercase tracking-wider group-hover:text-white transition-colors">Details</span>
               </div>
            </div>
        </div>

        <!-- RIGHT: THE SIDECARD (Exact Money Heist Parity) -->
        <div bind:this={episodeCards} class="hidden lg:flex items-center gap-12 ml-auto h-full relative z-40">

            <!-- Season Selection (Left of Slider) -->
            <div class="flex flex-col gap-6 items-end opacity-60">
                {#each ['Season 04', 'Season 03', 'Season 02', 'Season 01'] as season, i}
                    <span class="text-[10px] font-bold {i === 0 ? 'text-white' : 'text-white/30'} uppercase whitespace-nowrap cursor-pointer hover:text-white transition-colors">
                        {season}
                    </span>
                {/each}
            </div>

            <!-- Vertical Season Slider (Netflix Style) -->
            <div class="flex flex-col items-center h-48 py-2 relative">
                <div class="w-[2px] h-full bg-white/10 rounded-full relative">
                    <!-- Red Progress Track -->
                    <div class="absolute top-0 inset-x-0 h-1/4 bg-[#E50914] rounded-full"></div>
                    <!-- White Thumb -->
                    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-white/20"></div>
                </div>
            </div>

            <!-- THE GALLERY CARDS (Scaled Down) -->
            <div class="flex flex-col gap-4 w-[280px] xl:w-[320px]">
                {#each [
                    { id: '01', title: 'Berlin Weeding', time: '52 min', videoId: '5_wWq1nLqgU', img: 'https://img.youtube.com/vi/5_wWq1nLqgU/hqdefault.jpg' },
                    { id: '02', title: 'Game Over', time: '44 min', videoId: 'H_9Vp6b_JzI', img: 'https://img.youtube.com/vi/H_9Vp6b_JzI/hqdefault.jpg' },
                    { id: '03', title: 'Anatomy Lesson', time: '42 min', videoId: 'H7H4z_uB0k0', img: 'https://img.youtube.com/vi/H7H4z_uB0k0/hqdefault.jpg' }
                ] as ep}
                <button onclick={() => openVideo(ep.videoId)}
                   type="button"
                   class="group relative block w-full aspect-video rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-500 text-left cursor-pointer">
                    <img src={ep.img} alt={ep.title} class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" />

                    <!-- Card Overlay content (Bottom-aligned) -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                        <div class="flex items-end justify-between">
                            <div class="flex flex-col">
                                <span class="text-[8px] font-bold text-white/50 mb-0.5">{ep.id}</span>
                                <h4 class="text-white font-bold text-sm tracking-tight leading-tight group-hover:text-white transition-colors">{ep.title}</h4>
                            </div>
                            <span class="text-[8px] font-bold text-white/30 mb-0.5">{ep.time}</span>
                        </div>
                    </div>

                    <!-- CENTRAL PLAY TRIGGER -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                            <div class="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-[#E50914] border-b-[5px] border-b-transparent translate-x-0.5"></div>
                        </div>
                    </div>
                </button>
                {/each}
            </div>
        </div>
    </main>
  </div>

  <!-- IMMERSIVE VIDEO MODAL -->
  <!-- IMMERSIVE VIDEO MODAL -->
  {#if showModal && activeVideo}
    <VideoPlayerModal
      videoId={activeVideo.id || activeVideo}
      videoTitle={activeVideo.title || 'Video'}
      videoType={activeVideo.type || 'VIDEO'}
      videoDuration={activeVideo.duration}
      videoYear={activeVideo.year}
      onClose={() => showModal = false}
    />
  {/if}

  <!-- BOTTOM GRADIENT FOR SUBJECT ISOLATION -->
  <div class="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none"></div>
</div>

<VideoCarousel on:openVideo={(e) => openVideo(e.detail)} />
<VideoCategoryRows on:openVideo={(e) => openVideo(e.detail)} />

<Footer />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700;900&display=swap');
  
  .font-oswald { font-family: 'Oswald', sans-serif; }
</style>
