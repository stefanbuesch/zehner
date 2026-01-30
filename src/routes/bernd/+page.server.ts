// @ts-nocheck
// ISR Configuration for Bernd landing page
// Revalidates every 60 seconds on Vercel Edge
export const config = {
    isr: {
        expiration: 60, // Revalidate after 60 seconds
    }
};
