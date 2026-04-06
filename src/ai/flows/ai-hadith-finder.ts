
'use server';
/**
 * @fileOverview A specialized AI agent to find and verify any Hadith from major collections.
 * 
 * - findHadith - A function that searches for a specific Hadith by number, book, or topic.
 * - FindHadithInput - Input schema for search queries.
 * - FindHadithOutput - Output schema containing the verified Hadith details.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FindHadithInputSchema = z.object({
  query: z.string().describe('The search query, e.g., "Bukhari Hadith 1" or "Hadith about kindness to parents".'),
  bookPreference: z.string().optional().describe('Optional: Specific book to search in (e.g., Sahih Muslim).'),
});
export type FindHadithInput = z.infer<typeof FindHadithInputSchema>;

const FindHadithOutputSchema = z.object({
  hadith: z.object({
    text: z.string().describe('The English translation of the Hadith.'),
    arabic: z.string().describe('The Arabic text of the Hadith.'),
    source: z.string().describe('The collection name (e.g., Sahih al-Bukhari).'),
    narrator: z.string().describe('The narrator of the Hadith.'),
    reference: z.string().describe('Specific reference (e.g., Book 1, Hadith 1).'),
    grade: z.enum(['Sahih', 'Hasan', 'Da\'if']).describe('The authenticity grading.'),
    explanation: z.string().describe('A brief scholarly explanation of the context.'),
  }).nullable(),
  found: z.boolean(),
});
export type FindHadithOutput = z.infer<typeof FindHadithOutputSchema>;

export async function findHadith(input: FindHadithInput): Promise<FindHadithOutput> {
  return findHadithFlow(input);
}

const finderPrompt = ai.definePrompt({
  name: 'findHadithPrompt',
  input: { schema: FindHadithInputSchema },
  output: { schema: FindHadithOutputSchema },
  prompt: `You are an expert Hadith researcher. Your task is to find the most relevant and authentic Hadith based on the user's query.

If the user provides a specific reference (like "Bukhari 1"), retrieve that exact Hadith.
If the user provides a topic (like "honesty"), find a highly authentic (Sahih) Hadith about that topic from the Six Major Books (Kutub al-Sittah).

Query: {{{query}}}
{{#if bookPreference}}Preferred Book: {{{bookPreference}}}{{/if}}

Please ensure the Arabic text and English translation are accurate.`,
});

const findHadithFlow = ai.defineFlow(
  {
    name: 'findHadithFlow',
    inputSchema: FindHadithInputSchema,
    outputSchema: FindHadithOutputSchema,
  },
  async (input) => {
    const { output } = await finderPrompt(input);
    return output!;
  }
);
