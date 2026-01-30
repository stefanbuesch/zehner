<script lang="ts">
  import { gsap } from 'gsap';
  
  let isModalOpen = false;
  let modalContainer: HTMLElement;
  
  function openStory() {
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Animate In
    setTimeout(() => {
        if(modalContainer) {
            gsap.fromTo(modalContainer, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            );
        }
    }, 10);
  }

  function closeStory() {
    gsap.to(modalContainer, { opacity: 0, y: 50, duration: 0.4, onComplete: () => {
        isModalOpen = false;
        document.body.style.overflow = '';
    }});
  }
</script>

<section class="py-32 px-6 w-full bg-[#0a0a0a] relative overflow-hidden">
  
  <!-- Teaser Content -->
  <div class="max-w-4xl mx-auto relative z-10 text-center">
    
    <span class="block text-[#FFB800] text-sm font-bold uppercase tracking-[0.2em] mb-6">Der Ursprung</span>
    
    <h2 class="font-condensed font-bold text-5xl md:text-7xl text-white uppercase leading-none tracking-tighter mb-12">
      Mein Restaurant. <br/> <span class="text-stone-500">Meine Geschichte.</span>
    </h2>

    <p class="text-xl md:text-2xl font-light text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
      "Nach einer langen Reise, vielen Drehs und unzähligen Probe-Gerichten ist es endlich soweit..."
    </p>

    <button on:click={openStory} class="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer">
      <span class="text-white font-bold uppercase tracking-widest text-sm">Die ganze Story lesen</span>
      <div class="w-8 h-8 rounded-full bg-[#FFB800] text-black flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </div>
    </button>

  </div>

  <!-- Background Ambience -->
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#FFB800]/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

</section>

<!-- IMMERSIVE MODAL -->
{#if isModalOpen}
<div class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
    
    <div bind:this={modalContainer} class="relative w-full max-w-3xl h-[90vh] bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        <!-- Header -->
        <div class="p-8 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] z-20">
            <span class="text-[#FFB800] font-bold uppercase tracking-widest text-xs">Mission Manifesto</span>
            <button on:click={closeStory} class="text-white/50 hover:text-white transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 overscroll-contain">
            <div class="space-y-8 text-lg md:text-xl font-light text-gray-300 leading-relaxed font-sans text-left">
                
                <p>
                    <span class="text-[#FFB800] font-bold text-4xl mr-2 float-left leading-[0.8] font-serif">N</span>ach einer langen Reise, vielen Drehs, Gesprächen, Ideen und unzähligen Probe-Gerichten ist es endlich soweit: Mit <span class="text-white font-bold">TAVO</span> habe ich ein Restaurant eröffnet, in dem all das zusammenkommt, was mich in den letzten Jahren begleitet hat – gutes Essen, echte Geschichten und die Leidenschaft für Geschmack.
                </p>
        
                <p>
                    Viele von euch kennen mich als <span class="text-white">Bernd Zehner</span> von YouTube und aus der Serie <em>Mission Restaurant</em>. In den Videos habe ich besondere Gerichte und ikonische Foodspots kennengelernt – und genau diese Gerichte wollte ich nicht nur zeigen, sondern euch auch wirklich servieren.
                </p>
        
                <div class="py-8 border-y border-white/5 my-8">
                    <p class="font-serif text-2xl md:text-3xl text-white leading-tight text-center italic">
                    "Wir versuchen, sie so nah wie möglich an den Original-Rezepten nachzukochen."
                    </p>
                </div>
        
                <p>
                    Im TAVO setze ich auf ehrliche Küche, gute Produkte und Aromen, die mich unterwegs begeistert haben. Manche Gerichte sind mutiger, manche vertraut – aber jedes einzelne trägt seine Geschichte in sich. Wichtig ist mir, dass es entspannt bleibt: kein steifes Fine Dining, sondern modern, locker, mit Herz und Handwerk.
                </p>
        
                <p>
                    Ich werde so oft wie möglich selbst im Restaurant sein, mitkochen, erklären, ausprobieren und mit euch sprechen. Aber ich sage es ganz offen: Ich kann nicht jeden Tag da sein. Mein Team kocht nach meinen Vorstellungen und mit dem gleichen Anspruch – und TAVO soll auch dann ein großartiges Erlebnis sein, wenn ich gerade drehe oder unterwegs bin.
                </p>
                
                <p>
                    Ich freue mich riesig, dass dieser Traum jetzt Realität ist. Kommt vorbei, bringt Freunde mit, probiert die Gerichte aus der Serie – und findet vielleicht euren ganz persönlichen <span class="text-[#FFB800]">„Perfect Bite“</span>.
                </p>

                <!-- Signature -->
                <div class="mt-16 flex flex-col items-center opacity-80">
                    <div class="text-white font-graffiti text-4xl transform -rotate-6 mb-2">Bernd Zehner</div>
                    <div class="text-stone-500 text-sm uppercase tracking-widest font-bold">Founder & Content Creator</div>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}
