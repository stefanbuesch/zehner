<script lang="ts">
  const logoUrl = "/tavo_gold_logo.png";
  
  let { user = null, openBooking = () => {}, openAuth = () => {} } = $props();
</script>

<nav class="fixed top-0 left-0 right-0 z-50 py-6 bg-gradient-to-b from-black via-black/80 to-transparent transition-all duration-300">
  <!-- Desktop Layout: Perfectly Centered Logo -->
  <div class="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 relative">
    
    <!-- Left Section (Balanced) -->
    <div class="flex-1 flex justify-end items-center gap-12">
      <a href="/menu" class="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#FFB800] hover:text-white transition-colors hover:underline underline-offset-8">
        Menü
      </a>
      <a href="/about" class="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#FFB800] hover:text-white transition-colors hover:underline underline-offset-8">
        Über uns
      </a>
    </div>

    <!-- Center Logo (Absolute target for eye) -->
    <div class="px-8 flex-shrink-0">
      <a href="/" class="hover:opacity-80 transition-opacity duration-300">
        <img src={logoUrl} alt="TAVO" class="h-24 object-contain filter drop-shadow-[0_0_15px_rgba(255,184,0,0.3)]" />
      </a>
    </div>

    <!-- Right Section (Balanced) -->
    <div class="flex-1 flex justify-start items-center gap-10">
      <a href="/events" class="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#FFB800] hover:text-white transition-colors hover:underline underline-offset-8">
        Events
      </a>

      <!-- Auth / Profile -->
      {#if user}
         <div class="flex items-center gap-3">
            <a href="/profile" class="text-xs font-sans font-bold text-white tracking-widest hover:text-[#FFB800] transition-colors whitespace-nowrap">
              {user.email?.split('@')[0]}
            </a>
            <form action="/auth/logout" method="POST" class="flex">
               <button type="submit" class="text-[10px] font-sans font-bold uppercase tracking-[0.1em] text-white/30 hover:text-white transition-colors">Logout</button>
            </form>
         </div>
      {:else}
         <button onclick={openAuth} class="text-xs font-sans font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors cursor-pointer">
           Login
         </button>
      {/if}

      <!-- Reserve Button -->
      <button onclick={openBooking} 
         class="bg-[#FFB800] text-black px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,184,0,0.4)] cursor-pointer whitespace-nowrap">
        Reservieren
      </button>
    </div>

  </div>

  <!-- Mobile Layout (Simplified) -->
  <div class="md:hidden flex justify-between items-center px-6">
    <a href="/">
      <img src={logoUrl} alt="TAVO" class="h-16" />
    </a>
    <button onclick={openBooking} class="bg-[#FFB800] text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
      Reserve
    </button>
  </div>
</nav>
