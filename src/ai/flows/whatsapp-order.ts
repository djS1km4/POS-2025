'use server';
/**
 * @fileOverview An AI agent to process WhatsApp orders.
 *
 * - whatsAppOrder - A function that handles the WhatsApp order process.
 * - WhatsAppOrderInput - The input type for the whatsAppOrder function.
 * - WhatsAppOrderOutput - The return type for the whatsAppOrder function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { createOrder, getOrderStatus, OrderItem } from '@/services/order-service';

const createOrderTool = ai.defineTool(
  {
    name: 'createOrder',
    description: 'Use this to create a new order once all details (items, name, phone, address) are collected and confirmed by the customer. Returns the new order ID.',
    inputSchema: z.object({
      customerName: z.string(),
      customerPhone: z.string(),
      customerAddress: z.string(),
      items: z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        notes: z.string().optional(),
      })),
    }),
    outputSchema: z.string(),
  },
  async (input) => createOrder(input)
);

const getOrderStatusTool = ai.defineTool(
  {
    name: 'getOrderStatus',
    description: 'Check the status of an existing order using the order ID.',
    inputSchema: z.object({ orderId: z.string() }),
    outputSchema: z.string(),
  },
  async ({ orderId }) => getOrderStatus(orderId)
);


const WhatsAppOrderInputSchema = z.object({
  customerMessage: z.string().describe('The message from the customer.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).describe('The history of the conversation so far.'),
  currentStock: z.string().describe('The current stock level of each product.'),
  businessName: z.string().describe('The name of the restaurant.'),
});
export type WhatsAppOrderInput = z.infer<typeof WhatsAppOrderInputSchema>;

const WhatsAppOrderOutputSchema = z.object({
  response: z.string().describe('The response to the customer.'),
  orderItems: z.array(z.object({
    productId: z.string(),
    productName: z.string(),
    quantity: z.number(),
    notes: z.string().optional().describe('Special notes or requests for the item.'),
  })).describe('The items identified in the order.'),
  customerName: z.string().optional().describe("The customer's name."),
  customerPhone: z.string().optional().describe("The customer's phone number."),
  customerAddress: z.string().optional().describe("The customer's delivery address."),
  orderComplete: z.boolean().describe('Whether the order is considered complete and ready for confirmation.'),
});
export type WhatsAppOrderOutput = z.infer<typeof WhatsAppOrderOutputSchema>;

export async function whatsAppOrder(
  input: WhatsAppOrderInput
): Promise<WhatsAppOrderOutput> {
  return whatsAppOrderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'whatsAppOrderPrompt',
  input: { schema: WhatsAppOrderInputSchema },
  output: { schema: WhatsAppOrderOutputSchema },
  tools: [createOrderTool, getOrderStatusTool],
  prompt: `You are an AI assistant for a restaurant called "{{businessName}}", taking an order via WhatsApp. Your goal is to create a complete order for delivery or to check an order's status.

Conversation Context:
- This is the conversation history: {{{json conversationHistory}}}

Your instructions:
1.  **Initial Interaction**: If the conversation history is empty, greet the customer warmly, introduce yourself as the AI assistant for {{businessName}}, and ask if they want to place a new order or check the status of an existing one. Do not repeat the greeting in subsequent messages.
2.  **Order Status Check**: If the user wants to check their order status, ask for their order ID. Once they provide it, use the 'getOrderStatus' tool to retrieve the status and inform the customer. Handle cases where the order ID is invalid.
3.  **Placing a New Order**: If the user wants to place an order, analyze their message to extract product names, quantities, and any special notes (e.g., "sin cebolla", "extra picante"). Be smart about variations (e.g., "dos tintos" means 2 "Tinto Campesino").
4.  **Stock & Confirmation**: For each item, check availability against the current stock. If an item is out of stock or the quantity is too high, politely inform the customer. Once the customer seems finished, list the items back to them for confirmation.
5.  **Collect Customer Info**: After items are confirmed, ask for their full name, phone number, and delivery address. Do not ask for this before item confirmation.
6.  **Create the Order**: Once you have the items AND all customer details (name, phone, address), use the 'createOrder' tool to finalize the order. Inform the customer that their order has been created and provide them with their new order ID from the tool's output.
7.  **Completion**: Only when the order has been successfully created using the tool, set 'orderComplete' to true. In all other intermediate steps, 'orderComplete' must be false.
8.  **Clarity**: If any message is unclear, ask for clarification. Your responses should be friendly, concise, and in Spanish.

Available Products (use for order creation):
{{{currentStock}}}

Customer's Latest Message:
"{{customerMessage}}"`,
});

const whatsAppOrderFlow = ai.defineFlow(
  {
    name: 'whatsAppOrderFlow',
    inputSchema: WhatsAppOrderInputSchema,
    outputSchema: WhatsAppOrderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
