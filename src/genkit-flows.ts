'use server';

/**
 * @fileOverview Genkit flow for polishing code.
 *
 * - polishCodeFlow - A function that handles the code polishing process.
 * - PolishCodeInput - The input type for the polishCodeFlow function.
 * - PolishCodeOutput - The return type for the polishCodeFlow function.
 */

import { AIInstance } from './ai/ai-instance'; // Correction : AIInstance (classe en PascalCase)
import { z } from 'zod';

//Schemas
const PolishCodeInputSchema = z.object({
  code: z.string().describe('The code to be polished.'),
});
export type PolishCodeInput = z.infer<typeof PolishCodeInputSchema>;

const PolishCodeOutputSchema = z.object({
  polishedCode: z.string().describe('The polished code.'),
});
export type PolishCodeOutput = z.infer<typeof PolishCodeOutputSchema>;

// Création d'une instance de AIInstance
const aiInstance = new AIInstance();

// Création du prompt
const codePolishingPrompt = AIInstance.definePrompt({
    prompt: `Polish this code:\n\`\`\`{{{code}}}\`\`\``,
});

// Définition du flow
export const codePolishingFlow = AIInstance.defineFlow({
    name: "codePolishingFlow",
    input: { schema: PolishCodeInputSchema },
    output: { schema: PolishCodeOutputSchema },
    prompt: codePolishingPrompt,
});

// Fonction principale exportée
export async function polishCodeFlow(input: PolishCodeInput): Promise<PolishCodeOutput> {
    return {polishedCode: codePolishingFlow(input.code)};
}
