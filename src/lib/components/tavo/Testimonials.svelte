<script lang="ts">
  const reviews = [
    {
      name: "Markus S.",
      role: "Stammgast",
      text: "Endlich ein Laden, der hält was er verspricht. Das Hot Chicken ist brutal, aber genau so muss es sein. Bernd hat nicht übertrieben."
    },
    {
      name: "Julia K.",
      role: "Wiesbaden",
      text: "Die Atmosphäre ist ganz anders als in den typischen schicken Restaurants hier. Viel lockerer, lauter, ehrlicher. Und das Essen ist eine 10/10."
    },
    {
      name: "Thomas B.",
      role: "Mission Fan",
      text: "Bin extra aus Köln angereist. Das Pastrami Sandwich ist jeden Kilometer wert. Danke an das ganze Team für diesen Abend."
    }
  ];
</script>

<section class="py-40 px-6 w-full bg-black relative overflow-hidden">
  <!-- Background decoration -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-[100px] pointer-events-none"></div>

  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {#each reviews as review}
        <div class="p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors relative group">
          <!-- Quote Icon -->
          <div class="text-[#FFB800] text-6xl font-condensed opacity-20 absolute top-4 left-4 group-hover:opacity-40 transition-opacity">"</div>
          
          <p class="text-gray-300 font-light text-lg leading-relaxed mb-8 relative z-10 pt-6 max-w-[35ch]">
            {review.text}
          </p>
          
          <div class="flex items-center gap-4">
            <div class="w-10 h-1 bg-[#FFB800]"></div>
            <div>
              <h4 class="text-white font-bold uppercase tracking-wider text-sm">{review.name}</h4>
              <span class="text-gray-500 text-xs uppercase">{review.role}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
