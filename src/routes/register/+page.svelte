<script lang="ts">
  import { enhance } from '$app/forms';
  
  export let form;
</script>

<div class="min-h-screen bg-black flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
    
    <!-- Decor -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-50"></div>
    
    <div class="text-center mb-8">
       <h1 class="font-graffiti text-4xl text-white mb-2">REGISTER</h1>
       <p class="text-white/50 text-sm tracking-widest uppercase">Join the inner circle</p>
    </div>

    <form method="POST" use:enhance class="flex flex-col gap-6">
       <div>
         <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="fullName">Full Name</label>
         <input type="text" name="fullName" id="fullName" placeholder="Bernd Zehner" required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/20" />
       </div>

       <div>
         <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="email">Email</label>
         <input type="email" name="email" id="email" placeholder="bernd@tavo.de" required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/20" />
       </div>

       <div>
         <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="phone">Phone Number</label>
         <input type="tel" name="phone" id="phone" placeholder="+49 123 456789" required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors placeholder:text-white/20" />
       </div>
       
       <div>
         <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="password">Password</label>
         <input type="password" name="password" id="password" required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
       </div>

       <div class="flex items-start gap-3 mt-2">
         <input type="checkbox" name="gdpr" id="gdpr" required class="mt-1 w-4 h-4 rounded border-white/10 bg-black/50 text-[#FFB800] focus:ring-[#FFB800] focus:ring-offset-black" />
         <label class="text-[10px] text-white/50 leading-relaxed" for="gdpr">
           I agree that my data will be processed according to the <a href="/datenschutz" class="text-[#FFB800] hover:underline">Privacy Policy</a>. 
           This is required for booking management and service updates.
         </label>
       </div>

       {#if form?.error}
         <div class="text-red-500 text-xs text-center">{form.error}</div>
       {/if}
       {#if form?.message}
         <div class="text-green-500 text-xs text-center">{form.message}</div>
       {/if}

       <button type="submit" class="bg-[#FFB800] text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors">
         Create Account
       </button>
    </form>
    
    <div class="mt-6 text-center text-xs text-white/30">
       Already have an account? <a href="/login" class="text-[#FFB800] hover:underline">Login</a>
    </div>
  </div>
</div>
