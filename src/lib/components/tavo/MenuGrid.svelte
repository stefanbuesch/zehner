<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const menuItems = [
    {
      id: 1,
      title: "Texas Chili",
      price: "18€",
      origin: "Austin, TX",
      category: "Signature",
      image: "https://images.unsplash.com/photo-1594970047706-96d837050d4b?w=600&q=80",
      story: "Authentisches Texas Chili hat keine Bohnen. Punkt. Pures Rindfleisch, 12 Stunden geschmort."
    },
    {
      id: 2,
      title: "Hot Chicken",
      price: "22€",
      origin: "Nashville, TN",
      category: "Heat",
      image: "https://images.unsplash.com/photo-1626645738198-5be432770838?w=600&q=80",
      story: "Es schmerzt, aber du kannst nicht aufhören. Originale Cayenne-Öl-Paste. Nichts für schwache Nerven."
    },
    {
      id: 3,
      title: "NYC Pastrami",
      price: "24€",
      origin: "New York",
      category: "Sandwich",
      image: "https://images.unsplash.com/photo-1553659971-f01207815844?w=600&q=80",
      story: "Inspiriert von Katz's Deli. 14 Tage gepökelt, 10 Stunden geräuchert. Zart wie Butter."
    },
    {
      id: 4,
      title: "Dry Aged Ribeye",
      price: "65€",
      origin: "Nebraska",
      category: "Steak",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80",
      story: "Fleisch-Konfekt. 45 Tage im Salzraum gereift. Nussig, intensiv, perfekt."
    },
    {
      id: 5,
      title: "Smash Burger",
      price: "19€",
      origin: "Wiesbaden",
      category: "Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
      story: "Kein Turm. Nur Kruste, Käse und Fleisch. Maillard-Reaktion pur."
    },
    {
      id: 6,
      title: "Truffle Mac",
      price: "16€",
      origin: "USA Soul",
      category: "Side",
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&q=80",
      story: "Komfort-Essen für Erwachsene. Gruyère, Cheddar, Parmesan und frischer Trüffel."
    },
    {
      id: 7,
      title: "Buffalo Wings",
      price: "14€",
      origin: "Buffalo, NY",
      category: "Starter",
      image: "https://images.unsplash.com/photo-1527477396000-6489b5816963?w=600&q=80",
      story: "Das Originalrezept von 1964. Frank's RedHot und Butter. Knusprig, sauer, scharf."
    },
    {
      id: 8,
      title: "Cheesecake",
      price: "12€",
      origin: "New York",
      category: "Dessert",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80",
      story: "Dicht, cremig, mächtig. Genau so muss er sein. Keine Spielereien."
    }
  ];

  function handleSelect(item: any) {
    dispatch('select', item);
  }
</script>

<section class="py-40 px-6 w-full bg-[#0a0a0a]">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-24 flex flex-col items-start w-full border-l-4 border-[#FFB800] pl-8">
      <span class="text-[#FFB800] text-sm font-bold uppercase tracking-widest mb-2 font-sans">Entdecke die Karte</span>
      <h2 class="font-condensed font-bold text-6xl md:text-8xl text-white uppercase tracking-tighter leading-none">Unsere<br/>Mission</h2>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each menuItems as item}
        <button 
          class="group cursor-pointer relative text-left w-full border-none p-0 bg-transparent block" 
          onclick={() => handleSelect(item)}
          type="button"
        >
          
          <!-- Card Container -->
          <div class="relative w-full aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out bg-stone-900">
            <!-- Image -->
            <img src={item.image} alt={item.title} class="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000" />
            
            <!-- Dark Gradient Overlay -->
            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
            
            <!-- Content -->
            <div class="absolute inset-0 p-6 flex flex-col justify-end items-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <span class="text-[#FFB800] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 border border-[#FFB800] px-2 py-1">{item.origin}</span>
               <h3 class="font-serif text-3xl text-white mb-1 group-hover:text-[#FFB800] transition-colors">{item.title}</h3>
               <p class="text-white/60 text-sm font-light mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.story}</p>
               <span class="text-xl font-serif text-white">{item.price}</span>
            </div>
          </div>

        </button>
      {/each}
    </div>
  </div>
</section>
