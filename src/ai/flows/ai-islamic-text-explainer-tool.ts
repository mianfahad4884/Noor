
/**
 * @fileOverview This file implements a Genkit flow for an AI Islamic Text Explainer Tool.
 * It provides contextual explanations, deeper insights, and historical background for Quranic verses or Hadiths.
 *
 * - aiIslamicTextExplainerTool - A function that handles the explanation process for Islamic texts.
 * - AiIslamicTextExplainerToolInput - The input type for the aiIslamicTextExplainerTool function.
 * - AiIslamicTextExplainerToolOutput - The return type for the aiIslamicTextExplainerTool function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiIslamicTextExplainerToolInputSchema = z.object({
  text: z.string().describe('The Islamic text (Quranic verse or Hadith) to be explained.'),
  textType: z.enum(['Quranic Verse', 'Hadith']).describe('The type of Islamic text provided (Quranic Verse or Hadith).'),
  reference: z.string().optional().describe('Optional: Reference for the text, e.g., "Surah Al-Baqarah, Ayah 2:255" or "Sahih Bukhari, Hadith 1".'),
});
export type AiIslamicTextExplainerToolInput = z.infer<typeof AiIslamicTextExplainerToolInputSchema>;

const AiIslamicTextExplainerToolOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the provided Islamic text.'),
  insights: z.string().describe('Deeper spiritual and contextual insights derived from the text.'),
  historicalBackground: z.string().describe('The historical background and context relevant to the text.'),
});
export type AiIslamicTextExplainerToolOutput = z.infer<typeof AiIslamicTextExplainerToolOutputSchema>;

export async function aiIslamicTextExplainerTool(input: AiIslamicTextExplainerToolInput): Promise<AiIslamicTextExplainerToolOutput> {
  return islamicTextExplainerFlow(input);
}

const explainerPrompt = ai.definePrompt({
  name: 'islamicTextExplainerPrompt',
  input: { schema: AiIslamicTextExplainerToolInputSchema },
  output: { schema: AiIslamicTextExplainerToolOutputSchema },
  prompt: `You are an expert Islamic scholar and theologian. Your task is to provide a comprehensive analysis of the given Islamic text.
Please provide:
1. A detailed explanation of the text.
2. Deeper spiritual and contextual insights.
3. Relevant historical background.

Format your response as a JSON object with the following fields: "explanation", "insights", and "historicalBackground".

Islamic Text Type: {{{textType}}}
Islamic Text: {{{text}}}
{{#if reference}}
Reference: {{{reference}}}
{{/if}}`,
});

const islamicTextExplainerFlow = ai.defineFlow(
  {
    name: 'islamicTextExplainerFlow',
    inputSchema: AiIslamicTextExplainerToolInputSchema,
    outputSchema: AiIslamicTextExplainerToolOutputSchema,
  },
  async (input) => {
    const { output } = await explainerPrompt(input);
    return output!;
  }
);
