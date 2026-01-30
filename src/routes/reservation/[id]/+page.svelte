<script lang="ts">
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';
    
    let { data } = $props();
    let qrCanvas: HTMLCanvasElement;
    let reservation = $derived(data.reservation);

    onMount(async () => {
        if (qrCanvas) {
            // Generate QR code pointing to the reservation URL (for check-in)
            const url = window.location.href;
            await QRCode.toCanvas(qrCanvas, url, {
                width: 120,
                margin: 0,
                color: {
                    dark: '#FFB800',
                    light: '#00000000'
                }
            });
        }
    });

    function handlePrint() {
        window.print();
    }
</script>

<div class="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 sm:p-12 print:bg-white print:p-0">
    
    <!-- Action Bar (Hidden on print) -->
    <div class="fixed top-8 right-8 z-50 flex gap-4 print:hidden">
        <button onclick={handlePrint} class="bg-[#FFB800] text-black font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-white transition-all shadow-xl">
            Print Ticket
        </button>
        <a href="/tavo" class="bg-white/10 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-white/20 transition-all border border-white/5">
            Back to Tavo
        </a>
    </div>

    <!-- TICKET CONTAINER -->
    <div class="relative w-full max-w-2xl bg-black border border-[#FFB800]/30 rounded-3xl p-1 shadow-[0_0_50px_rgba(255,184,0,0.15)] overflow-hidden print:border-black print:rounded-none print:shadow-none print:max-w-none print:w-[15cm]">
        
        <!-- Premium Border Accents -->
        <div class="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#FFB800]/40 rounded-tl-3xl pointer-events-none print:border-black"></div>
        <div class="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#FFB800]/40 rounded-br-3xl pointer-events-none print:border-black"></div>

        <div class="bg-[#0a0a0a] rounded-[22px] p-8 md:p-12 print:bg-white">
            
            <!-- Logo & Title -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                <div>
                    <h1 class="font-graffiti text-5xl md:text-6xl text-[#FFB800] print:text-black">RESERVATION</h1>
                    <p class="text-white/40 uppercase tracking-[0.4em] text-[10px] mt-2 print:text-black/60">TAVO Wiesbaden · Urban Luxury</p>
                </div>
                <!-- Signature Space -->
                <div class="hidden md:block">
                     <p class="font-marker text-[#FFB800] text-3xl opacity-80 rotate-[-5deg] print:text-black">Bernd Zehner</p>
                     <p class="text-[8px] uppercase tracking-widest text-white/20 text-center print:text-black/40">Authorized Host</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                
                <!-- Guest Data -->
                <div class="space-y-8">
                    <div>
                        <span class="block text-[#FFB800] text-[10px] font-bold uppercase tracking-widest mb-2 print:text-black/60">GUEST</span>
                        <h2 class="font-serif text-3xl md:text-4xl text-white print:text-black leading-tight">{reservation.name}</h2>
                    </div>

                    <div class="grid grid-cols-2 gap-8">
                        <div>
                            <span class="block text-[#FFB800] text-[10px] font-bold uppercase tracking-widest mb-1 print:text-black/60">DATE</span>
                            <span class="font-sans font-bold text-xl text-white print:text-black">{new Date(reservation.date).toLocaleDateString('de-DE')}</span>
                        </div>
                        <div>
                            <span class="block text-[#FFB800] text-[10px] font-bold uppercase tracking-widest mb-1 print:text-black/60">TIME</span>
                            <span class="font-sans font-bold text-xl text-white print:text-black">{reservation.time}</span>
                        </div>
                    </div>
                </div>

                <!-- QR & Status -->
                <div class="flex flex-col items-center md:items-end justify-between">
                    <div class="bg-black p-4 rounded-xl border border-white/5 print:border-black print:p-2">
                        <canvas bind:this={qrCanvas} class="w-24 h-24 md:w-32 md:h-32"></canvas>
                    </div>
                    <div class="text-center md:text-right mt-6">
                        <span class="block text-white/20 text-[9px] uppercase tracking-widest mb-1 print:text-black/40">REF ID</span>
                        <span class="font-mono text-xs text-[#FFB800] print:text-black"># {reservation.id.slice(0,8).toUpperCase()}</span>
                    </div>
                </div>

            </div>

            <!-- Footer Message -->
            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-end gap-6 print:border-black">
                <div class="max-w-xs">
                    <p class="text-[11px] text-white/40 leading-relaxed print:text-black/60">
                        Please show this ticket upon arrival. We hold your table for 15 minutes. 
                        Soulfood awaits.
                    </p>
                </div>
                
                <!-- Signature (Mobile) -->
                <div class="md:hidden text-right">
                     <p class="font-marker text-[#FFB800] text-3xl opacity-80 print:text-black">Bernd Zehner</p>
                </div>

                <div class="text-right">
                    <p class="font-sans font-bold text-white text-sm print:text-black">Nashville Nashville</p>
                    <p class="text-[9px] text-white/30 uppercase tracking-[0.2em] print:text-black/50">Nashville Nashville Nashville</p>
                </div>
            </div>

        </div>

        <!-- Perforation Effect -->
        <div class="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-10 bg-[#050505] rounded-full border-r border-[#FFB800]/20 print:hidden"></div>
        <div class="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-10 bg-[#050505] rounded-full border-l border-[#FFB800]/20 print:hidden"></div>
    </div>

    <!-- Print Notice -->
    <p class="mt-8 text-white/20 text-[10px] uppercase tracking-widest print:hidden">
        Optimized for high-quality print & mobile display
    </p>

</div>

<style>
    :global(body) {
        background-color: #050505;
    }

    @media print {
        :global(body) {
            background-color: white !important;
            color: black !important;
        }

        :global(nav), :global(footer) {
            display: none !important;
        }
    }

    .font-marker {
        font-family: 'Permanent Marker', cursive;
    }

    .font-serif {
        font-family: 'Playfair Display', serif;
    }
</style>
