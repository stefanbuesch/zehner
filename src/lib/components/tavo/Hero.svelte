<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let heroContainer: HTMLElement;
  let title: HTMLElement;
  let subtext: HTMLElement;
  let mainDish: HTMLElement;
  let floatingElements: NodeListOf<Element>;

  onMount(() => {
    const tl = gsap.timeline();

    // 1. Text reveals
    tl.from(title.querySelectorAll('.word'), {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    });

    tl.from(subtext, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    // 2. Main Dish Scale/Rotate pop
    tl.from(mainDish, {
      scale: 0.8,
      rotation: -5,
      opacity: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.7)"
    }, "-=0.8");

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

  // Helper to split text for animation would be complex in Svelte markup, 
  // so we'll just animate the blocks or lines.
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
    <div bind:this={mainDish} class="relative w-full max-w-[800px] mx-auto z-20">
      <!-- Dish Image -->
      <div class="relative aspect-square w-[80%] md:w-[60%] mx-auto">
        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=90" 
             alt="Healthy Bowl" 
             class="w-full h-full object-contain drop-shadow-2xl scale-110 relative z-20" />
        
        <!-- Shadow -->
        <div class="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[70%] h-[20%] bg-black/60 blur-3xl z-10 rounded-full"></div>
      </div>

      <!-- Floating Polaroid/Card Decorations -->
      <!-- Left Card (Menu Item) -->
      <div class="floating-item absolute top-[20%] left-0 w-32 md:w-48 bg-white p-2 md:p-3 rounded shadow-xl transform -rotate-12 z-10">
        <img src="https://images.unsplash.com/photo-1603133872878-684f10842741?w=300&q=80" class="w-full aspect-[4/3] object-cover rounded mb-2" alt="Dish" />
        <div class="h-2 w-3/4 bg-gray-200 rounded mb-1"></div>
        <div class="h-2 w-1/2 bg-gray-200 rounded"></div>
      </div>

      <!-- Right Card (Menu Item) -->
      <div class="floating-item absolute top-[10%] right-0 md:-right-10 w-28 md:w-40 bg-[#f4f4f4] p-2 md:p-3 shadow-xl transform rotate-6 z-10">
        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" class="w-full aspect-square object-cover mb-2" alt="Dish" />
      </div>

      <!-- Scattered Spices -->
      <div class="floating-item absolute bottom-[10%] left-[10%] w-3 h-3 bg-red-500 rounded-full blur-[1px]"></div>
      <div class="floating-item absolute top-[40%] right-[15%] w-2 h-2 bg-yellow-400 rounded-full"></div>
    </div>

  </div>

  <!-- Bottom Fog -->
  <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20"></div>
</section>
