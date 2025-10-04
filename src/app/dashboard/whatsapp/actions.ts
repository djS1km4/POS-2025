'use server';

import { whatsAppOrder, WhatsAppOrderInput } from '@/ai/flows/whatsapp-order';
import { products } from '@/lib/placeholder-data';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export async function getWhatsAppResponse(customerMessage: string, businessName: string, conversationHistory: Message[]) {
  try {
    const currentStock = products.map(p => `ID: ${p.id}, Name: ${p.name}, Stock: ${p.stock} units`).join('\n');
    
    const input: WhatsAppOrderInput = {
      customerMessage,
      currentStock,
      businessName,
      conversationHistory,
    };
    
    const result = await whatsAppOrder(input);

    return {
      message: 'success',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while getting a response from the AI agent.',
      data: null
    };
  }
}

