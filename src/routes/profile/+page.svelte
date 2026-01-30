<script lang="ts">
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    
    let { data, form } = $props();
    let message = $state('');

    $effect(() => {
        if (form?.message) {
            message = form.message;
            setTimeout(() => { message = ''; }, 3000);
        }
    });

    function handleExport() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.profile, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "tavo_profile_data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
</script>

<div class="min-h-screen bg-black pt-32 pb-16 px-6">
    <div class="max-w-4xl mx-auto">
        
        <header class="mb-12">
            <h1 class="font-graffiti text-5xl text-white mb-4">PROFILE</h1>
            <p class="text-white/40 uppercase tracking-[0.3em] text-xs">Manage your Nashville Nashville credentials & data privacy</p>
        </header>

        {#if message}
            <div transition:fade class="bg-[#FFB800] text-black p-4 mb-8 rounded-lg font-bold text-center">
                {message}
            </div>
        {/if}

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <!-- Information Form -->
            <div class="lg:col-span-2 space-y-12">
                <section class="bg-[#111] border border-white/5 rounded-2xl p-8">
                    <h2 class="text-white font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-3">
                        <span class="w-1.5 h-1.5 bg-[#FFB800] rounded-full"></span>
                        Personal Information
                    </h2>

                    <form action="?/update" method="POST" use:enhance class="space-y-6">
                        <div>
                            <label class="block text-xs uppercase tracking-widest text-white/40 mb-2" for="email">Email Address</label>
                            <input type="email" value={data.email} disabled class="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white/50 cursor-not-allowed" />
                            <p class="text-[10px] text-white/20 mt-2 italic">Email cannot be changed online for security.</p>
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="fullName">Full Name</label>
                            <input type="text" name="fullName" value={data.profile?.full_name ?? ''} required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>

                        <div>
                            <label class="block text-xs uppercase tracking-widest text-[#FFB800] mb-2" for="phone">Phone Number</label>
                            <input type="tel" name="phone" value={data.profile?.phone ?? ''} required class="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FFB800] transition-colors" />
                        </div>

                        <button type="submit" class="bg-white text-black font-bold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-[#FFB800] transition-all">
                            Save Changes
                        </button>
                    </form>
                </section>

                <section class="bg-[#111] border border-white/5 rounded-2xl p-8">
                    <h2 class="text-white font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-3 text-red-500">
                        <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        Danger Zone
                    </h2>
                    <p class="text-[11px] text-white/30 uppercase tracking-widest mb-8">Delete your account and all associated data permanently.</p>
                    
                    <form action="?/delete" method="POST" onsubmit={(e) => { if(!confirm('Sicher? Diese Aktion kann nicht rückgängig gemacht werden.')) e.preventDefault(); }}>
                        <button type="submit" class="border border-red-500/30 text-red-500 font-bold uppercase tracking-widest py-3 px-6 text-xs hover:bg-red-500 hover:text-white transition-all">
                            Delete Account
                        </button>
                    </form>
                </section>
            </div>

            <!-- GDPR Sidebar -->
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-[#111] to-black border border-white/5 rounded-2xl p-8">
                    <h2 class="text-white font-bold uppercase tracking-widest text-xs mb-6">GDPR & Privacy</h2>
                    <p class="text-[11px] text-white/40 leading-relaxed mb-8">
                        At TAVO, we value your privacy. You have the right to request all data we have stored about you at any time.
                    </p>
                    
                    <button onclick={handleExport} class="w-full border border-[#FFB800] text-[#FFB800] font-bold uppercase tracking-widest py-4 text-xs hover:bg-[#FFB800] hover:text-black transition-all">
                        Export My Data (JSON)
                    </button>
                    
                    <div class="mt-8 pt-8 border-t border-white/5 space-y-4">
                        <a href="/datenschutz" class="block text-[10px] text-white/30 uppercase tracking-widest hover:text-[#FFB800] transition-colors">Privacy Policy</a>
                        <a href="/impressum" class="block text-[10px] text-white/30 uppercase tracking-widest hover:text-[#FFB800] transition-colors">Legal Notice</a>
                    </div>
                </div>

                <div class="bg-[#FFB800] p-8 rounded-2xl">
                    <h3 class="text-black font-bold uppercase tracking-widest text-xs mb-2">Host Tip</h3>
                    <p class="text-xs text-black/70 leading-relaxed">
                        Keeping your phone number updated ensures our AI Host can reach you for reservation changes.
                    </p>
                </div>
            </div>

        </div>
    </div>
</div>
