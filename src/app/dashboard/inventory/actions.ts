'use server';

import { suggestReorderQuantities, type InventoryReorderInput } from '@/ai/flows/inventory-reorder-suggestions';
import { products } from '@/lib/placeholder-data';
import { z } from 'zod';

const ReorderSchema = z.object({
    seasonality: z.string().min(1, 'Seasonality information is required.'),
    promotions: z.string().min(1, 'Promotions information is required.'),
    salesHistory: z.string().min(1, 'Sales history is required.'),
});

export async function getReorderSuggestions(prevState: any, formData: FormData) {
  const validatedFields = ReorderSchema.safeParse({
    seasonality: formData.get('seasonality'),
    promotions: formData.get('promotions'),
    salesHistory: formData.get('salesHistory'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please fill out all fields.',
      data: null
    };
  }

  try {
    const currentStock = products.map(p => `${p.name}: ${p.stock} units`).join('\n');
    
    const input: InventoryReorderInput = {
      salesHistory: validatedFields.data.salesHistory,
      currentStock,
      seasonality: validatedFields.data.seasonality,
      promotions: validatedFields.data.promotions,
    };

    const result = await suggestReorderQuantities(input);

    return {
      message: 'success',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while getting suggestions from AI.',
      data: null
    };
  }
}
