import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

// Initialize OpenAI provider (or compatible)
// Assuming OPENAI_API_KEY is available in env
const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY ?? '',
});

export const POST: RequestHandler = async ({ request }) => {
    const { messages, loginState } = await request.json();

    const systemPrompt = `
    You are the "Tavo Concierge", a digital gatekeeper for an exclusive, high-end restaurant and members club called Tavo.
    Your tone is polite, professional, slightly mysterious, and very exclusive. You speak German.
    
    Current User State: ${loginState || 'IDLE'}
    
    Instructions based on State:
    - IDLE / GREETING: Welcome the user to the "Inner Circle". Ask them to identify themselves (Email).
    - AWAITING_PASSWORD: Accknowledge they are on the list (pretend to check). Ask for their "Key" or "Passcode" (Password).
    - LOGIN_SUCCESS: Welcome them back warmly. "Your table is waiting."
    - LOGIN_FAILURE: Politely decline entry. "That key does not turn the lock." Ask to try again.
    - REGISTER_FLOW: Guide them through providing Name, Email, Password one by one.

    Keep responses short (under 2 sentences). Do not break character.
  `;

    const result = await streamText({
        model: openai('gpt-4o'),
        system: systemPrompt,
        messages: messages,
    });

    return result.toTextStreamResponse();
};
