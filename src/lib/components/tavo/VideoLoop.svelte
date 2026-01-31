<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  
  export let videoId: string;
  export let startSeconds: number;
  export let endSeconds: number;
  export let className: string = "";
  export let scale: number = 1.15;

  let player: any;
  let loopInterval: any;
  let playerElement: HTMLIFrameElement;
  let isVideoPlaying = false;
  
  // Construct the Embed URL for immediate rendering
  // playlist={videoId} is required for loop=1 to work in embed URL
  $: embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=${videoId}&start=${startSeconds}&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`;

  const dispatch = createEventDispatcher();

  function initPlayer() {
     if (player) return;
     if (!window.YT || !window.YT.Player) return;
     
     try {
         // Attach to existing iframe
         player = new window.YT.Player(playerElement, {
           events: {
             'onReady': onPlayerReady,
             'onStateChange': onPlayerStateChange
           }
         });
     } catch(e) {
         console.error("YT Init Error", e);
     }
  }

  onMount(() => {
    // 1. Script Loader (Robust)
    if (!window.YT) {
        if (!document.getElementById('yt-api-script')) {
            const tag = document.createElement('script');
            tag.id = 'yt-api-script';
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
        }
    }

    // 2. Poll for API
    const checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
            clearInterval(checkInterval);
            initPlayer();
        }
    }, 100);

    function onPlayerReady(event: any) {
      if(event && event.target) {
          event.target.mute();
          event.target.seekTo(startSeconds);
          event.target.playVideo();
      }

      // Loop Logic (Manual override for precise segments)
      loopInterval = setInterval(() => {
        if (player && player.getCurrentTime) {
          try {
              const currentTime = player.getCurrentTime();
              if (currentTime >= endSeconds || currentTime < startSeconds - 2) {
                player.seekTo(startSeconds);
              }
          } catch (e) { /* ignore */ }
        }
      }, 500);
    }
    
    function onPlayerStateChange(event: any) {
        if (event.data === 1) { // PLAYING
            isVideoPlaying = true;
            dispatch('playing');
        }
    }

    return () => {
      clearInterval(checkInterval);
      if (loopInterval) clearInterval(loopInterval);
      if (player && player.destroy) {
          try { player.destroy(); } catch (e) {}
      }
    };
  });
</script>

<div class="relative w-full h-full overflow-hidden bg-transparent {className}">
    <div class="absolute inset-0 w-full h-full pointer-events-none" 
         style="transform: scale({scale}); transform-origin: center;">
         <!-- HARDCODED IFRAME FOR IMMEDIATE RENDER -->
         <iframe 
            bind:this={playerElement}
            src={embedUrl}
            title="Loop Video"
            class="w-full h-full object-cover"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
         ></iframe>
    </div>
    <div class="absolute inset-0 bg-transparent pointer-events-none z-30"></div>
</div>
