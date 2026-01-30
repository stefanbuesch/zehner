<script lang="ts">
  // Featured Dish Component
</script>

<section class="py-40 px-6 w-full bg-[#0a0a0a] relative overflow-hidden">
  
  <!-- Background Ambience -->
  <div class="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
    
    <!-- Left: Cinematic Image (The Hero) -->
    <div class="relative group">
      <!-- Glow Effect -->
      <div class="absolute inset-0 bg-[#FFB800] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
      
      <!-- Main Image Container -->
      <div class="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-white/5">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        <img src="https://images.unsplash.com/photo-1626645738198-5be432770838?w=800&q=90" 
             alt="Nashville Hot Chicken" 
             class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
        
        <!-- Floating Badge (Integrated) -->
        <div class="absolute top-6 left-6 z-20 bg-[#FFB800] text-black font-bold uppercase tracking-widest text-xs px-3 py-1">
          Neu
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-[#FFB800]/30 hidden md:block"></div>
    </div>

    <!-- Right: The Mission Content -->
    <div class="flex flex-col items-start text-left">
      
      <!-- Power Line Anchor -->
      <div class="border-l-4 border-[#FFB800] pl-8 mb-12">
        <span class="block text-[#FFB800] font-bold uppercase tracking-[0.2em] text-sm mb-4">Mission Menü 01</span>
        <h2 class="font-condensed font-bold text-6xl md:text-8xl text-white leading-[0.9] uppercase tracking-tighter">
          Nashville <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-500">Hot Chicken</span>
        </h2>
      </div>
      
      <!-- Description (Triadic Rule: 40-60 chars) -->
      <p class="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-[45ch]">
        Kein Chichi. 24h mariniertes Hähnchen, doppelt frittiert. Serviert mit unserer Signatur Cayenne-Öl-Paste und hausgemachten Pickles auf weißem Brot.
      </p>

      <!-- Action Block -->
      <div class="flex items-center gap-8">
        <!-- Price Display -->
        <div class="flex flex-col">
          <span class="text-xs text-stone-500 uppercase tracking-widest mb-1">Preis</span>
          <span class="font-serif text-4xl text-[#FFB800]">22€</span>
        </div>

        <!-- Primary CTA -->
        <button class="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden">
          <span class="relative z-10 group-hover:text-white transition-colors duration-300">Probieren</span>
          <div class="absolute inset-0 bg-[#FFB800] transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
        </button>
      </div>

    </div>

  </div>
</section>
