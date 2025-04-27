'use server';
/**
 * @fileOverview Genkit flow for polishing code.
 *
 * - polishCodeFlow - A function that handles the code polishing process.
 * - PolishCodeInput - The input type for the polishCodeFlow function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'zod';

// Schemas
const PolishCodeInputSchema = z.object({
    code: z.string().describe('The code to be polished.'),
});
export type PolishCodeInput = z.infer<typeof PolishCodeInputSchema>;

const PolishCodeOutputSchema = z.object({
    polishedCode: z.string().describe('The polished code.'),
});
export type PolishCodeOutput = z.infer<typeof PolishCodeOutputSchema>;
export type CodePolishingPromptInput = z.infer<typeof PolishCodeInputSchema>
export type CodePolishingPromptOutput = z.infer<typeof PolishCodeOutputSchema>;


const codePolishingPrompt = ai.definePrompt({
    name: 'codePolishingPrompt',
    input: { schema: PolishCodeInputSchema },
    output: { schema: PolishCodeOutputSchema },
    prompt: `Polish the following code, correct any errors and ensure it is well-formatted and efficient:\n\`\`\`{{code}}\`\`\``,
});

// Flow definition for polishing the code
const codePolishingFlow = ai.defineFlow<PolishCodeInputSchema, PolishCodeOutputSchema>({
    name: 'codePolishingFlow',
    inputSchema: PolishCodeInputSchema,
    outputSchema: PolishCodeOutputSchema,
  },
    async (input) => {
        const { output } = await codePolishingPrompt(input);

        if (!output || !output.polishedCode) {
            throw new Error('Polished code could not be generated.');
        }

        return output;
    }
);

// Function to polish code using the defined flow
export async function polishCodeFlow(input: PolishCodeInput): Promise<PolishCodeOutput> {
  try {
    return await codePolishingFlow(input);
  } catch (error) {
    console.error('Error polishing the code:', error);
    throw new Error('An error occurred while polishing the code.');
  }
}
