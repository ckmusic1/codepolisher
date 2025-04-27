'use server';
/**
 * @fileOverview Genkit instance.
 */
import {Genkit} from 'genkit';

declare global {
  var ai: Genkit;
}

// This ensures that the 'ai' object is reused during hot reloads.
if (!global.ai) {
  global.ai = new Genkit();
}

export const ai = global.ai;
export type AI = typeof ai;
