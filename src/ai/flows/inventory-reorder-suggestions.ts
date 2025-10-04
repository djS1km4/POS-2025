'use server';

/**
 * @fileOverview An AI agent to suggest optimal inventory reorder quantities.
 *
 * - suggestReorderQuantities - A function that suggests reorder quantities based on sales data.
 * - InventoryReorderInput - The input type for the suggestReorderQuantities function.
 * - InventoryReorderOutput - The return type for the suggestReorderQuantities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryReorderInputSchema = z.object({
  salesHistory: z
    .string()
    .describe('Sales history data, including product, date, quantity.'),
  currentStock: z.string().describe('The current stock level of each product.'),
  seasonality: z.string().describe('Information about seasonal trends affecting sales.'),
  promotions: z.string().describe('Details of any ongoing or planned promotions.'),
});
export type InventoryReorderInput = z.infer<typeof InventoryReorderInputSchema>;

const InventoryReorderOutputSchema = z.object({
  reorderSuggestions: z
    .string()
    .describe(
      'Suggested reorder quantities for each product, taking into account sales history, current stock, seasonality and promotions.'
    ),
  rationale: z
    .string()
    .describe('A brief explanation of the factors influencing the reorder suggestions.'),
});
export type InventoryReorderOutput = z.infer<typeof InventoryReorderOutputSchema>;

export async function suggestReorderQuantities(
  input: InventoryReorderInput
): Promise<InventoryReorderOutput> {
  return inventoryReorderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'inventoryReorderPrompt',
  input: {schema: InventoryReorderInputSchema},
  output: {schema: InventoryReorderOutputSchema},
  prompt: `You are an experienced inventory manager. Analyze the provided data and suggest optimal reorder quantities for each product.

Consider the following factors:
- Sales History: {{{salesHistory}}}
- Current Stock: {{{currentStock}}}
- Seasonality: {{{seasonality}}}
- Promotions: {{{promotions}}}

Provide specific reorder quantities and a brief rationale for your suggestions.`,
});

const inventoryReorderFlow = ai.defineFlow(
  {
    name: 'inventoryReorderFlow',
    inputSchema: InventoryReorderInputSchema,
    outputSchema: InventoryReorderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
