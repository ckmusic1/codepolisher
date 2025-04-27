'use server';
/**
 * @fileOverview Genkit configuration.
 */
import { defineAuthProvider, defineModel, defineConfig } from 'genkit';
import { googleAi } from '@genkit-ai/googleai';

export const config = defineConfig({
  models: {
    main: defineModel({
      providers: [googleAi.vertexAi({ model: 'gemini-1.5-pro-002' })],
    }),
  },
  // Configure auth providers here.
  auth: {
    // This defines the Firebase Authentication auth provider.
    // firebase: defineAuthProvider.firebase(),
  },
});
