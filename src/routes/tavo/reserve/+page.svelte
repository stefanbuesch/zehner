<script lang="ts">
  // @ts-ignore
  import { Chat } from '@ai-sdk/svelte';
  import { onMount } from 'svelte';

  /** @type {any} */
  let chat;
  
  let input = $state('');
  let chatContainer: HTMLDivElement;

  onMount(() => {
    // @ts-ignore
    chat = new Chat({
        api: '/api/chat',
    });
  });

  // Auto-scroll to bottom on new messages
  $effect(() => {
    // @ts-ignore
    if (chatContainer && chat?.messages?.length) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  const quickActions = [
    { label: "Book a Table", prompt: "I'd like to book a table for dinner" },
    { label: "Check Availability", prompt: "Is there availability this Saturday evening for 4 people?" },
    { label: "Cancel Reservation", prompt: "I need to cancel my reservation" },
  ];

  function sendQuickAction(prompt: string) {
    if (!chat) return;
    input = prompt;
    handleSubmit();
  }

  async function handleSubmit(e?: Event) {
    if (e) e.preventDefault();
    if (!input.trim() || !chat) return; // @ts-ignore
    
    const content = input;
    input = '';
    
    // @ts-ignore
    await chat.sendMessage({ role: 'user', content });
  }
</script>

<div class="min-h-screen bg-tavo-black text-white">
  <!-- Hero Header -->
  <div class="pt-28 pb-8 px-6 text-center border-b border-stone-800">
    <h1 class="font-condensed text-5xl md:text-6xl text-white mb-4 tracking-wide">
      BOOK A TABLE
    </h1>
    <p class="font-sans text-stone-400 text-lg max-w-xl mx-auto">
      Chat with our AI Host to check availability and make your reservation.
    </p>
  </div>

  <!-- Chat Container -->
  <div class="max-w-2xl mx-auto px-4 py-8">
    <!-- Messages -->
    <div 
      bind:this={chatContainer}
      class="bg-stone-900/50 border border-stone-800 rounded-lg p-4 mb-6 h-[400px] overflow-y-auto scroll-smooth"
    >
      {#if !chat || !chat.messages || chat.messages.length === 0}
        <div class="text-center text-stone-500 py-16">
          <div class="text-4xl mb-4">🎩</div>
          <p class="font-sans">Welcome to TAVO. How may I assist you?</p>
        </div>
      {:else}
        {#each chat.messages as message}
          <div class="mb-4 {message.role === 'user' ? 'text-right' : 'text-left'}">
            <div class="inline-block max-w-[80%] px-4 py-3 rounded-lg {message.role === 'user' 
              ? 'bg-tavo-gold text-tavo-black' 
              : 'bg-stone-800 text-white border border-stone-700'}">
              <p class="font-sans text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        {/each}
        {#if chat.status === 'streaming' || chat.status === 'submitted'}
          <div class="text-left">
            <div class="inline-block px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-tavo-gold rounded-full animate-pulse"></span>
                <span class="w-2 h-2 bg-tavo-gold rounded-full animate-pulse delay-100"></span>
                <span class="w-2 h-2 bg-tavo-gold rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          </div>
        {/if}
      {/if}
    </div>

    <!-- Quick Actions -->
    {#if !chat || !chat.messages || chat.messages.length === 0}
      <div class="flex flex-wrap gap-3 justify-center mb-6">
        {#each quickActions as action}
          <button
            onclick={() => sendQuickAction(action.prompt)}
            class="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-full text-sm font-sans text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            {action.label}
          </button>
        {/each}
      </div>
    {/if}

    <!-- Input Form -->
    <form onsubmit={handleSubmit} class="flex gap-3">
      <input
        bind:value={input}
        placeholder="Ask about reservations, availability, or the menu..."
        class="flex-1 px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white placeholder-stone-500 font-sans focus:outline-none focus:border-tavo-gold transition-colors"
        disabled={!chat || chat.status === 'streaming' || chat.status === 'submitted'}
      />
      <button
        type="submit"
        disabled={!chat || chat.status === 'streaming' || chat.status === 'submitted' || !input.trim()}
        class="px-6 py-3 bg-tavo-gold text-tavo-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Send
      </button>
    </form>

    <!-- Info Footer -->
    <p class="text-center text-stone-600 text-xs font-sans mt-8">
      TAVO • Wiesbaden • Wed–Sun from 18:00
    </p>
  </div>
</div>

<style>
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
</style>
