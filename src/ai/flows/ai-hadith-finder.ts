
/**
 * @fileOverview A specialized AI agent to find and verify Hadiths from major collections.
 * 
 * - findHadiths - A function that searches for relevant Hadiths by number, book, or topic.
 * - FindHadithsInput - Input schema for search queries.
 * - FindHadithsOutput - Output schema containing a list of verified Hadith details.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HadithItemSchema = z.object({
  text: z.string().describe('The English translation of the Hadith.'),
  arabic: z.string().describe('The Arabic text of the Hadith.'),
  source: z.string().describe('The collection name (e.g., Sahih al-Bukhari).'),
  narrator: z.string().describe('The narrator of the Hadith.'),
  reference: z.string().describe('Specific reference (e.g., Book 1, Hadith 1).'),
  grade: z.enum(['Sahih', 'Hasan', 'Da\'if']).describe('The authenticity grading.'),
  explanation: z.string().describe('A brief scholarly explanation of the context.'),
});

const FindHadithsInputSchema = z.object({
  query: z.string().describe('The search query, e.g., "Hadith about mothers" or "Bukhari 1".'),
  bookPreference: z.string().optional().describe('Optional: Specific book to search in.'),
});
export type FindHadithsInput = z.infer<typeof FindHadithsInputSchema>;

const FindHadithsOutputSchema = z.object({
  results: z.array(HadithItemSchema).describe('A list of relevant and authentic Hadiths found.'),
  count: z.number().describe('The number of Hadiths returned.'),
});
export type FindHadithsOutput = z.infer<typeof FindHadithsOutputSchema>;

export async function findHadith(input: FindHadithsInput): Promise<FindHadithsOutput> {
  return findHadithsFlow(input);
}

const finderPrompt = ai.definePrompt({
  name: 'findHadithsPrompt',
  input: { schema: FindHadithsInputSchema },
  output: { schema: FindHadithsOutputSchema },
  prompt: `You are an expert Hadith researcher. Your task is to find the most relevant and authentic Hadiths (up to 5) based on the user's query.

If the user provides a topic (like "mother"), find multiple highly authentic (Sahih/Hasan) Hadiths about that topic from the Six Major Books (Kutub al-Sittah).
Ensure the Arabic text and English translation are accurate for every result.

Query: {{{query}}}
{{#if bookPreference}}Preferred Book: {{{bookPreference}}}{{/if}}

Format the output as a JSON object containing a "results" array of Hadith objects and a "count" of results.`,
});

const findHadithsFlow = ai.defineFlow(
  {
    name: 'findHadithsFlow',
    inputSchema: FindHadithsInputSchema,
    outputSchema: FindHadithsOutputSchema,
  },
  async (input) => {
    const { output } = await finderPrompt(input);
    return output!;
  }
);
