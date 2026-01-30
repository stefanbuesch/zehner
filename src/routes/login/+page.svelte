<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let form;
</script>

<div class="min-h-screen bg-black flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
    
    <!-- Decor -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-50"></div>
    
    <div class="text-center mb-8">
       <h1 class="font-graffiti text-4xl text-white mb-2">LOGIN</h1>
       <p class="text-white/50 text-sm tracking-widest uppercase">Welcome back</p>
    </div>

    <form method="POST" use:enhance class="flex flex-col gap-6">
       <div>
         <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="email">Email</label>
         <input type="email" name="email" id="email" required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
       </div>
       
       <div>
         <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="password">Password</label>
         <input type="password" name="password" id="password" required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
       </div>

       {#if form?.error}
         <div class="text-red-500 text-xs text-center">{form.error}</div>
       {/if}

       <button type="submit" class="bg-[#FFB800] text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors">
         Sign In
       </button>
    </form>
    
    <div class="mt-6 text-center text-xs text-white/30">
       Don't have an account? <a href="/register" class="text-[#FFB800] hover:underline">Register</a>
    </div>
  </div>
</div>
