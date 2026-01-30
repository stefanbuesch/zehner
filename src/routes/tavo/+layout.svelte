<script>
  let { children } = $props();
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#FFB800] selection:text-black">
  {@render children()}
</div>
