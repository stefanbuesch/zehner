<script lang="ts">
  // Tavo Footer - The Info Hub
</script>

<footer class="bg-[#050505] border-t border-white/10 pt-24 pb-12 px-6 w-full relative overflow-hidden">
  
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16 relative z-10">
    
    <!-- Column 1: Location & Contact -->
    <div class="flex flex-col items-start">
      <div class="mb-8">
        <span class="block text-[#FFB800] text-sm font-bold uppercase tracking-[0.2em] mb-4">Location</span>
        <h3 class="font-condensed font-bold text-3xl text-white uppercase leading-none">
          TAVO <br/> Wiesbaden
        </h3>
      </div>
      
      <address class="not-italic text-gray-400 font-light leading-relaxed mb-8">
        Taunusstraße 41 <br/>
        65183 Wiesbaden <br/>
        Deutschland
      </address>
      
      <a href="mailto:info@tavo.restaurant" class="text-white hover:text-[#FFB800] transition-colors border-b border-white/20 hover:border-[#FFB800] pb-1">
        info@tavo.restaurant
      </a>
    </div>

    <!-- Column 2: Hours -->
    <div class="flex flex-col items-start md:items-center text-left md:text-center">
      <span class="block text-[#FFB800] text-sm font-bold uppercase tracking-[0.2em] mb-8">Öffnungszeiten</span>
      
      <div class="space-y-4 text-gray-400 font-light">
        <div class="flex flex-col">
          <span class="text-white font-bold uppercase text-sm tracking-wider">Di — Do</span>
          <span>17:00 — 23:00</span>
        </div>
        <div class="flex flex-col">
          <span class="text-white font-bold uppercase text-sm tracking-wider">Fr & Sa</span>
          <span>17:00 — 01:00</span>
        </div>
        <div class="flex flex-col">
          <span class="text-white font-bold uppercase text-sm tracking-wider">So</span>
          <span>12:00 — 20:00</span>
        </div>
      </div>
    </div>

    <!-- Column 3: Service Links -->
    <div class="flex flex-col items-start md:items-start text-left">
       <span class="block text-[#FFB800] text-sm font-bold uppercase tracking-[0.2em] mb-8">Service</span>
       <div class="flex flex-col gap-4">
         <a href="/speisekarte" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm transition-colors border-b border-white/10 pb-1 w-fit">Speisekarte (PDF)</a>
         <a href="/getraenke" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm transition-colors border-b border-white/10 pb-1 w-fit">Getränkekarte</a>
         <a href="/gutschein" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm transition-colors border-b border-white/10 pb-1 w-fit">Gutschein Shop</a>
         <a href="/kundenkarte" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm transition-colors border-b border-white/10 pb-1 w-fit">Member Card</a>
       </div>
    </div>

    <!-- Column 4: Social & Payment -->
    <div class="flex flex-col items-start md:items-end text-left md:text-right">
      
      <!-- Payment Badge -->
      <div class="mb-12">
        <span class="block text-[#FFB800] text-sm font-bold uppercase tracking-[0.2em] mb-4">No Cash</span>
        <div class="flex items-center gap-3 text-gray-400 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          <span>Card Only</span>
        </div>
      </div>

      <!-- Socials -->
      <div class="flex flex-col gap-4">
        <a href="https://instagram.com/tavo.restaurant" target="_blank" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm flex items-center justify-end gap-2 group">
          Instagram <span class="transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <a href="https://youtube.com/@BerndZehner" target="_blank" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm flex items-center justify-end gap-2 group">
          YouTube <span class="transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <a href="https://tiktok.com/@bernd_zehner" target="_blank" class="text-white hover:text-[#FFB800] font-bold uppercase tracking-widest text-sm flex items-center justify-end gap-2 group">
          TikTok <span class="transform group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

    </div>

  </div>

  <!-- Bottom Bar -->
  <div class="border-t border-white/5 pt-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-600 uppercase tracking-widest relative z-10">
      <div class="flex gap-6">
        <a href="/impressum" class="hover:text-white transition-colors">Impressum</a>
        <a href="/datenschutz" class="hover:text-white transition-colors">Datenschutz</a>
        <a href="/agb" class="hover:text-white transition-colors">AGB</a>
      </div>
      <div>
        &copy; 2026 TAVO Wiesbaden
      </div>
    </div>
  </div>

  <!-- Background Ambience -->
  <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 translate-x-1/2"></div>
</footer>
