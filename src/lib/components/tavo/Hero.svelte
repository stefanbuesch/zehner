<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import VideoLoop from '$lib/components/tavo/VideoLoop.svelte';

  // Element Refs
  let heroContainer: HTMLElement;
  let title: HTMLElement;
  let subtext: HTMLElement;
  let mainDish: HTMLElement;
  // floatingElements selector handled by gsap.utils.toArray

  onMount(() => {
    // --- GSAP ANIMATIONS ---
    const tl = gsap.timeline();

    // 1. Text reveals
    if (title) {
        tl.from(title.querySelectorAll('.word'), {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
        });
    }

    if (subtext) {
        tl.from(subtext, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
        }, "-=0.5");
    }

    // 2. Main Dish Scale/Rotate pop
    if (mainDish) {
        tl.from(mainDish, {
        scale: 0.8,
        rotation: -5,
        duration: 1.2,
        ease: "elastic.out(1, 0.7)"
        }, "-=0.8");
    }

    // 3. Floating elements entrance
    gsap.utils.toArray('.floating-item').forEach((el: any, i) => {
      gsap.from(el, {
        y: gsap.utils.random(50, 100),
        opacity: 0,
        duration: 1.5,
        delay: 0.5 + (i * 0.1),
        ease: "power3.out"
      });
      
      // Continuous float
      gsap.to(el, {
        y: '+=20',
        rotation: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 2)
      });
    });

  });
</script>

  <section bind:this={heroContainer} class="relative w-full pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
  
  <!-- Background Noise/Stars -->
  <div class="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

  <!-- Decorative Color Blurs -->
  <div class="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none"></div>
  <div class="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

  <!-- Content -->
  <div class="relative z-10 text-center max-w-7xl mx-auto w-full">
    <!-- Title -->
    <h1 bind:this={title} class="font-condensed font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tighter uppercase mb-8">
      <span class="block word">Essen, das</span>
      <span class="block word relative inline-block text-[#FFB800]">
        Geschichten erzählt.
        <!-- Leaf Accent on Text -->
        <img src="https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=100&q=80" 
             class="floating-item absolute -top-8 -right-8 w-16 md:w-20 object-contain rotate-12 opacity-90" alt="" />
      </span>
    </h1>

    <!-- Subtext -->
    <p bind:this={subtext} class="text-gray-400 text-lg md:text-xl font-light max-w-[50ch] mx-auto leading-relaxed mb-16 font-sans">
      Kein Fine Dining, sondern echtes Handwerk. Die besten Gerichte meiner Reisen um die Welt – jetzt endlich bei uns in Wiesbaden.
    </p>

    <!-- Main Dish Visualization -->
    <div bind:this={mainDish} class="relative w-full max-w-[600px] mx-auto z-20">
      
      <!-- MAIN LOOP: 29:38 - 30:08 (Duration 30s) -->
      <div class="relative aspect-video w-full mx-auto rounded-2xl overflow-hidden shadow-2xl z-20 bg-transparent">
         <VideoLoop videoId="TbcFhw9uJmI" startSeconds={1778} endSeconds={1808} scale={1.15} />
      </div>

      <!-- Shadow -->
      <div class="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-black/60 blur-[40px] z-10 rounded-full"></div>


      <!-- Floating Video Loops -->
      
      <!-- Left Card (Menu Item) - LOOP 2 -->
      <div class="floating-item absolute top-[15%] -left-12 md:-left-52 w-28 md:w-44 aspect-[4/3] rounded-2xl shadow-2xl transform -rotate-12 z-10 hover:scale-105 transition-transform duration-500 overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-1.5 md:p-2">
        <div class="w-full h-full rounded-xl overflow-hidden relative grayscale-[20%] hover:grayscale-0 transition-all duration-500 shadow-inner">
           <VideoLoop videoId="TbcFhw9uJmI" startSeconds={1441} endSeconds={1456} scale={1.4} />
           <!-- Subtle inner vignette -->
           <div class="absolute inset-0 pointer-events-none border border-white/5 rounded-xl"></div>
        </div>
      </div>

      <!-- Right Card (Menu Item) - LOOP 3 -->
      <div class="floating-item absolute top-[5%] -right-10 md:-right-48 w-24 md:w-40 aspect-square rounded-2xl shadow-2xl transform rotate-6 z-10 hover:scale-105 transition-transform duration-500 overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-md p-1.5 md:p-2">
         <div class="w-full h-full object-cover rounded-xl overflow-hidden relative grayscale-[20%] hover:grayscale-0 transition-all duration-500 shadow-inner">
             <VideoLoop videoId="TbcFhw9uJmI" startSeconds={1680} endSeconds={1695} scale={1.5} />
             <!-- Subtle inner vignette -->
             <div class="absolute inset-0 pointer-events-none border border-white/5 rounded-xl"></div>
         </div>
      </div>

      <!-- Scattered Spices -->
      <div class="floating-item absolute bottom-[10%] left-[10%] w-3 h-3 bg-red-500 rounded-full blur-[1px]"></div>
      <div class="floating-item absolute top-[40%] right-[15%] w-2 h-2 bg-yellow-400 rounded-full"></div>
    </div>

  </div>

  <!-- Bottom Fog -->
  <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20"></div>
</section>
