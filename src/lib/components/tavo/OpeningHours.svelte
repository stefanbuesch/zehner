<script lang="ts">
  const hours = [
    { day: "Monday", time: "Closed", closed: true },
    { day: "Tuesday", time: "17:00 – 23:00" },
    { day: "Wednesday", time: "17:00 – 23:00" },
    { day: "Thursday", time: "17:00 – 23:00" },
    { day: "Friday", time: "17:00 – 01:00" },
    { day: "Saturday", time: "12:00 – 01:00" },
    { day: "Sunday", time: "12:00 – 20:00" },
  ];
</script>

<div class="relative p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-sm max-w-md mx-auto transform hover:scale-105 transition-transform duration-500 group">
  <!-- Neon Corner Accents -->
  <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
  <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>

  <h3 class="font-condensed text-2xl text-white uppercase tracking-widest text-center mb-8 border-b border-white/10 pb-4">
    Opening Hours
  </h3>

  <div class="space-y-4 font-sans text-sm tracking-wide">
    {#each hours as { day, time, closed }}
      <div class="flex justify-between items-center group/row">
        <span class="text-stone-400 uppercase font-semibold group-hover/row:text-white transition-colors">{day}</span>
        <span class="{closed ? 'text-neon-pink' : 'text-tavo-gold'} font-mono">
          {time}
        </span>
      </div>
    {/each}
  </div>

  <!-- "Open Now" Status (Mockup logic) -->
  <div class="mt-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-900/30 border border-green-500/30">
      <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      <span class="text-xs text-green-400 uppercase tracking-widest font-bold">Open Today</span>
    </div>
  </div>
</div>
