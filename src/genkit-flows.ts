'use server';
/**
 * @fileOverview Genkit flow for polishing code.
 *
 * - polishCodeFlow - A function that handles the code polishing process.
 * - PolishCodeInput - The input type for the polishCodeFlow function.
 * - PolishCodeOutput - The return type for the polishCodeFlow function.
 */

import { ai } from './ai/ai-instance';
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


const codePolishingPrompt = ai.definePrompt({
    name: 'codePolishingPrompt',
    input: {
        schema: z.object({
            code: z.string().describe('The code to be polished.'),
        }),
    },
    output: {
        schema: z.object({
            polishedCode: z.string().describe('The polished code.'),
        }),
    },
    prompt: `Polish the following code, correct any errors and ensure it is well-formatted and efficient:\n\`\`\`{{code}}\`\`\``,
});


const codePolishingFlow = ai.defineFlow<
    typeof PolishCodeInputSchema,
    typeof PolishCodeOutputSchema
>(
    {
        name: 'codePolishingFlow',
        inputSchema: PolishCodeInputSchema,
        outputSchema: PolishCodeOutputSchema,
    },
    async (input) => {
        const { output } = await codePolishingPrompt(input);
        return output!;
    }
);

export async function polishCodeFlow(input: PolishCodeInput): Promise<PolishCodeOutput> {
    return codePolishingFlow(input);
}
