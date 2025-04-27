'use server';
/**
 * @fileOverview Genkit configuration.
 */
import { } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
export const config = {
  models: {
    main: {
      providers: [googleAI()],
    },
  },
};
