'use server';

import { products, type Order, type Product } from '@/lib/placeholder-data';
import initialOrdersData from './orders.json';
import fs from 'fs';
import path from 'path';

export type OrderItem = {
    productId: string;
    quantity: number;
    notes?: string;
};

export type NewOrderInput = {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    userId?: string;
    tip?: number;
    paymentMethod?: 'Efectivo' | 'Tarjeta' | 'Transferencia';
    status?: Order['status'];
};

const ordersFilePath = path.join(process.cwd(), 'src/services', 'orders.json');

// Helper function to read orders from the JSON file
const readOrdersFromFile = (): Order[] => {
    try {
        if (fs.existsSync(ordersFilePath)) {
            const fileContent = fs.readFileSync(ordersFilePath, 'utf-8');
            const orders = JSON.parse(fileContent) as any[];
            return orders.map(order => {
                const items = order.items.map((item: any) => ({
                    ...item,
                    product: findProduct(item.product.id)
                })).filter((item: any) => item.product); // Filter out items where product wasn't found

                if (items.length !== order.items.length) {
                    console.warn(`Order ${order.id} contained items with missing products.`);
                }

                return {
                    ...order,
                    items: items
                };
            });
        }
    } catch (error) {
        console.error("Error reading from orders.json, falling back to initial data:", error);
    }
    return initialOrdersData.map(order => ({
        ...order,
        items: order.items.map((item: any) => ({
            ...item,
            product: findProduct(item.product.id)
        }))
    })) as Order[];
};

// Helper function to write orders to the JSON file
const writeOrdersToFile = (orders: Order[]) => {
    try {
        const ordersToStore = orders.map(order => ({
            ...order,
            items: order.items.map(item => ({
                quantity: item.quantity,
                product: { id: item.product.id }
            }))
        }));
        fs.writeFileSync(ordersFilePath, JSON.stringify(ordersToStore, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing to orders.json:", error);
    }
};

function findProduct(productId: string) : Product | undefined {
    return products.find(p => p.id === productId);
}

/**
 * Creates a new order and stores it.
 * @param orderInput The details for the new order.
 * @returns The ID of the newly created order.
 */
export async function createOrder(orderInput: NewOrderInput): Promise<string> {
    const inMemoryOrders = readOrdersFromFile();
    const orderId = `ORD-${String(Date.now()).slice(-4)}`;
    
    const processedItems = orderInput.items.map(item => {
        const product = findProduct(item.productId);
        if (!product) throw new Error(`Product with id ${item.productId} not found.`);
        return {
            product,
            quantity: item.quantity,
        };
    });

    const subtotal = processedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.19;
    const tip = orderInput.tip || 0;
    const total = subtotal + tax + tip;
    const profit = processedItems.reduce((acc, item) => acc + (item.product.price - item.product.cost) * item.quantity, 0);

    const type = orderInput.customerAddress === 'En local' ? 'En local' : 'A domicilio';

    const newOrder: Order = {
        id: orderId,
        customerName: orderInput.customerName,
        items: processedItems,
        total,
        subtotal,
        tax,
        tip,
        profit,
        status: orderInput.status || 'Pendiente',
        createdAt: new Date().toISOString(),
        type: type,
        userId: orderInput.userId,
        paymentMethod: orderInput.paymentMethod || 'Efectivo',
    };

    inMemoryOrders.unshift(newOrder);
    writeOrdersToFile(inMemoryOrders);

    return orderId;
}

/**
 * Retrieves the status of an existing order.
 * @param orderId The ID of the order to check.
 * @returns A string describing the order status.
 */
export async function getOrderStatus(orderId: string): Promise<string> {
    const inMemoryOrders = readOrdersFromFile();
    const order = inMemoryOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase());

    if (!order) {
        return `Lo siento, no pude encontrar un pedido con el código "${orderId}". Por favor, verifica el código.`;
    }

    return `El estado de tu pedido ${orderId} es: ${order.status}.`;
}

/**
 * Retrieves all orders.
 * @returns An array of all orders.
 */
export async function getOrders(): Promise<Order[]> {
    return readOrdersFromFile();
}


/**
 * Updates the status of an existing order.
 * @param orderId The ID of the order to update.
 * @param status The new status for the order.
 * @param paymentMethod Optional payment method when status is 'Pagado'
 * @returns A boolean indicating success.
 */
export async function updateOrderStatus(orderId: string, status: Order['status'], paymentMethod?: 'Efectivo' | 'Tarjeta' | 'Transferencia'): Promise<boolean> {
    const inMemoryOrders = readOrdersFromFile();
    const orderIndex = inMemoryOrders.findIndex(o => o.id.toLowerCase() === orderId.toLowerCase());

    if (orderIndex === -1) {
        console.warn(`Order with ID ${orderId} not found for status update.`);
        return false;
    }

    inMemoryOrders[orderIndex].status = status;
    if (status === 'Pagado' && paymentMethod) {
        inMemoryOrders[orderIndex].paymentMethod = paymentMethod;
    }
    
    writeOrdersToFile(inMemoryOrders);
    console.log(`Order ${orderId} status updated to ${status}`);
    return true;
}

/**
 * Updates the items of an existing order.
 * @param orderId The ID of the order to update.
 * @param items The new list of items for the order.
 * @param customerName Optional new customer name.
 * @returns A boolean indicating success.
 */
export async function updateOrderItems(orderId: string, items: OrderItem[], customerName?: string): Promise<boolean> {
    const inMemoryOrders = readOrdersFromFile();
    const orderIndex = inMemoryOrders.findIndex(o => o.id.toLowerCase() === orderId.toLowerCase());

    if (orderIndex === -1) {
        console.warn(`Order with ID ${orderId} not found for item update.`);
        return false;
    }

    const processedItems = items.map(item => {
        const product = findProduct(item.productId);
        if (!product) throw new Error(`Product with id ${item.productId} not found.`);
        return {
            product,
            quantity: item.quantity,
        };
    });

    const subtotal = processedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.19;
    const existingTip = inMemoryOrders[orderIndex].tip || 0;
    const total = subtotal + tax + existingTip;
    const profit = processedItems.reduce((acc, item) => acc + (item.product.price - item.product.cost) * item.quantity, 0);

    inMemoryOrders[orderIndex].items = processedItems;
    inMemoryOrders[orderIndex].total = total;
    inMemoryOrders[orderIndex].subtotal = subtotal;
    inMemoryOrders[orderIndex].tax = tax;
    inMemoryOrders[orderIndex].profit = profit;

    if (customerName) {
        inMemoryOrders[orderIndex].customerName = customerName;
    }
    
    writeOrdersToFile(inMemoryOrders);
    console.log(`Order ${orderId} items updated.`);
    return true;
}
