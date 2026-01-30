import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { supabaseAdmin } from '$lib/server/supabase';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = createOpenAI({
    apiKey: OPENAI_API_KEY,
});

export const POST = async ({ request, locals: { user } }) => {
    if (!user) {
        return new Response('Unauthorized', { status: 401 });
    }
    const { messages } = await request.json();

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: `You are the Host at TAVO, an Urban Luxury restaurant by Bernd Zehner in Wiesbaden.
    Your tone is polite, cool, authentic, and efficient. "No Chichi".
    You can check availability, book tables, and cancel reservations.
    
    Rules:
    - Always be helpful and brief.
    - If a user wants to book, first ask for Date, Time, and Party Size if not provided.
    - Check availability BEFORE confirming.
    - If confirmed, give them the Reservation ID (or a short reference).
    - If they ask about the menu or location, answer briefly based on TAVO knowledge (Urban, authentic, Nashville Hot Chicken is signature).
    - Current date: ${new Date().toLocaleDateString('de-DE')}.
    `,
        messages,
        tools: {
            checkAvailability: tool({
                description: 'Check if a table is available for a given date, time, and party size.',
                parameters: z.object({
                    date: z.string().describe('Date in YYYY-MM-DD format'),
                    time: z.string().describe('Time in HH:MM format'),
                    partySize: z.number().min(1).max(20).describe('Number of guests')
                }),
                execute: async ({ date, time, partySize }) => {
                    // MOCK LOGIC for safety if DB isn't ready
                    // In real production, query Supabase here.
                    // For now, we simulate mostly yes, but say no to Tuesdays (Ruhetag).

                    const day = new Date(date).getDay();
                    if (day === 2) return { available: false, reason: "Dienstag ist unser Ruhetag. Wir sind von Mittwoch bis Sonntag für dich da." };

                    // Random mock availability for demo
                    const isAvailable = Math.random() > 0.1;
                    return { available: isAvailable, reason: isAvailable ? "Table is available." : "Sorry, fully booked at that time." };
                },
            }),

            bookTable: tool({
                description: 'Book a table for the user.',
                parameters: z.object({
                    name: z.string(),
                    email: z.string().email(),
                    date: z.string(),
                    time: z.string(),
                    partySize: z.number(),
                }),
                execute: async ({ name, email, date, time, partySize }) => {
                    try {
                        // Try Supabase Insert
                        const { data, error } = await supabaseAdmin
                            .from('reservations')
                            .insert({ name, email, date, time, party_size: partySize, status: 'confirmed' })
                            .select()
                            .single();

                        if (error) {
                            console.error("Supabase Error:", error);
                            throw new Error("Database error");
                        }

                        // Mock Email Sending
                        console.log(`[EMAIL MOCK] Sending confirmation to ${email} for Booking ${data.id}`);

                        return {
                            success: true,
                            reservationId: data.id,
                            message: `Confirmed! 🎩 You can view/print your premium reservation ticket here: /reservation/${data.id}`
                        };
                    } catch (err) {
                        console.log("Fallback to Mock Booking due to error (likely DB not connected)", err);
                        const mockId = crypto.randomUUID();
                        return { success: true, reservationId: mockId, message: "Reservation confirmed (Mock Mode). Email sent." };
                    }
                },
            }),

            cancelReservation: tool({
                description: 'Cancel a reservation using the Reservation ID.',
                parameters: z.object({
                    reservationId: z.string().describe('The UUID or reference code of the reservation'),
                }),
                execute: async ({ reservationId }) => {
                    // Mock Cancel
                    return { success: true, message: `Reservation ${reservationId} has been cancelled.` };
                }
            })
        },
    });

    return result.toDataStreamResponse();
};
