'use server';
/**
 * @fileOverview Genkit instance.
 */
import {Genkit} from 'genkit';

declare global {
  var ai: Genkit | undefined;
}

// This ensures that the 'ai' object is reused during hot reloads.
// It also handles the case where it might not be initialized yet.
if (!global.ai) {
  global.ai = new Genkit();
}

export const ai = global.ai;
