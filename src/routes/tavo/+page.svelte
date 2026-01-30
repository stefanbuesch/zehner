<script lang="ts">
  import Hero from '$lib/components/tavo/Hero.svelte';
  import MissionManifesto from '$lib/components/tavo/MissionManifesto.svelte';
  import FeaturedDish from '$lib/components/tavo/FeaturedDish.svelte';
  import MenuGrid from '$lib/components/tavo/MenuGrid.svelte';
  import Services from '$lib/components/tavo/Services.svelte';
  import RecipeSection from '$lib/components/tavo/RecipeSection.svelte';
  import Testimonials from '$lib/components/tavo/Testimonials.svelte';
  import FoodStoryModal from '$lib/components/tavo/FoodStoryModal.svelte';

  // Modal State
  let isModalOpen = false;
  let selectedDish: any = null;

  function openDishStory(event: CustomEvent) {
    selectedDish = event.detail;
    isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  function closeDishStory() {
    isModalOpen = false;
    setTimeout(() => { selectedDish = null; }, 500); // Clear after animation
    document.body.style.overflow = ''; // Unlock scroll
  }
</script>

<Hero />
<MissionManifesto />
<FeaturedDish />
<MenuGrid on:select={openDishStory} />
<Services />
<RecipeSection />
<Testimonials />

<!-- Immersive Story Modal -->
<FoodStoryModal 
  isOpen={isModalOpen} 
  dish={selectedDish} 
  onClose={closeDishStory} 
/>



