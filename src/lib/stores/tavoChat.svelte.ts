import { Chat } from '@ai-sdk/svelte';

export const tavoChat = new Chat({
    api: '/api/chat',
    initialMessages: [
        { id: '1', role: 'system', content: 'You are the TAVO Host. Be professional, friendly, and helpful. You are talking to a restaurant customer.' },
        { id: '2', role: 'assistant', content: "Willkommen im TAVO. Ich bin dein Host.\n\nSchön, dass du da bist. Möchtest du einen Tisch reservieren oder kann ich dir bei etwas anderem behilflich sein?" }
    ]
});
