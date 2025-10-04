import imagePlaceholders from './placeholder-images.json';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number; // Cost to calculate profit
  stock: number;
  sku: string;
  imageUrl: string;
  imageHint: string;
};

export type Order = {
  id: string;
  customerName: string;
  items: { product: Product; quantity: number }[];
  total: number;
  subtotal: number;
  tax: number;
  tip: number; // Tip amount
  profit: number;
  status: 'Pendiente' | 'Preparando' | 'Listo' | 'En entrega' | 'Completado' | 'Cancelado' | 'Pagado';
  createdAt: string;
  type: 'En local' | 'Para llevar' | 'A domicilio';
  userId?: string; // ID of the user who created the order
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia';
};

export type UserStatus = "Activo" | "Inactivo" | "Ausente" | "Ocupado";

export type UserRole = 'Administrador' | 'Mesero' | 'Vendedor' | 'Bartender' | 'Cajero';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  status: UserStatus;
  password?: string;
  avatarZoom?: number;
};
// NOTE: Product data is now managed in Firestore. This file can be used for initial data seeding or reference.
const productImages = new Map(imagePlaceholders.placeholderImages.map(p => [p.id, p]));

export const products: Product[] = [
  // Entradas y Picadas
  { id: 'prod_11', name: 'Empanada de Carne', category: 'Entradas y Picadas', price: 3000, cost: 1000, stock: 200, sku: 'ENT-001', imageUrl: productImages.get('prod_11')?.imageUrl!, imageHint: productImages.get('prod_11')?.imageHint! },
  { id: 'prod_28', name: 'Carimañolas de Queso', category: 'Entradas y Picadas', price: 3500, cost: 1200, stock: 150, sku: 'ENT-002', imageUrl: productImages.get('prod_28')?.imageUrl!, imageHint: productImages.get('prod_28')?.imageHint! },
  { id: 'prod_29', name: 'Patacones con Hogao', category: 'Entradas y Picadas', price: 9000, cost: 3500, stock: 80, sku: 'ENT-003', imageUrl: productImages.get('prod_29')?.imageUrl!, imageHint: productImages.get('prod_29')?.imageHint! },
  { id: 'prod_13', name: 'Chicharrón con Arepa', category: 'Entradas y Picadas', price: 12000, cost: 5000, stock: 60, sku: 'ENT-004', imageUrl: productImages.get('prod_13')?.imageUrl!, imageHint: productImages.get('prod_13')?.imageHint! },
  { id: 'prod_14', name: 'Papas Criollas', category: 'Entradas y Picadas', price: 7000, cost: 2500, stock: 100, sku: 'ENT-005', imageUrl: productImages.get('prod_14')?.imageUrl!, imageHint: productImages.get('prod_14')?.imageHint! },
  
  // Sopas y Ajiacos
  { id: 'prod_6', name: 'Caldo de Costilla', category: 'Sopas y Ajiacos', price: 12000, cost: 5000, stock: 30, sku: 'SOP-001', imageUrl: productImages.get('prod_6')?.imageUrl!, imageHint: productImages.get('prod_6')?.imageHint! },
  { id: 'prod_9', name: 'Ajiaco Santafereño', category: 'Sopas y Ajiacos', price: 18000, cost: 8000, stock: 20, sku: 'SOP-002', imageUrl: productImages.get('prod_9')?.imageUrl!, imageHint: productImages.get('prod_9')?.imageHint! },
  { id: 'prod_15', name: 'Sopa de Mondongo', category: 'Sopas y Ajiacos', price: 16000, cost: 7000, stock: 25, sku: 'SOP-003', imageUrl: productImages.get('prod_15')?.imageUrl!, imageHint: productImages.get('prod_15')?.imageHint! },
  { id: 'prod_16', name: 'Sancocho de Gallina', category: 'Sopas y Ajiacos', price: 22000, cost: 10000, stock: 18, sku: 'SOP-004', imageUrl: productImages.get('prod_16')?.imageUrl!, imageHint: productImages.get('prod_16')?.imageHint! },
  
  // Platos Fuertes
  { id: 'prod_10', name: 'Bandeja Paisa', category: 'Platos Fuertes', price: 28000, cost: 13000, stock: 15, sku: 'PF-001', imageUrl: productImages.get('prod_10')?.imageUrl!, imageHint: productImages.get('prod_10')?.imageHint! },
  { id: 'prod_17', name: 'Sobrebarriga a la Criolla', category: 'Platos Fuertes', price: 26000, cost: 12000, stock: 20, sku: 'PF-002', imageUrl: productImages.get('prod_17')?.imageUrl!, imageHint: productImages.get('prod_17')?.imageHint! },
  { id: 'prod_18', name: 'Mojarra Frita con Patacones', category: 'Platos Fuertes', price: 32000, cost: 15000, stock: 22, sku: 'PF-003', imageUrl: productImages.get('prod_18')?.imageUrl!, imageHint: productImages.get('prod_18')?.imageHint! },
  { id: 'prod_30', name: 'Cazuela de Mariscos', category: 'Platos Fuertes', price: 38000, cost: 18000, stock: 12, sku: 'PF-004', imageUrl: productImages.get('prod_30')?.imageUrl!, imageHint: productImages.get('prod_30')?.imageHint! },
  { id: 'prod_33', name: 'Lechona Tolimense (Porción)', category: 'Platos Fuertes', price: 25000, cost: 11000, stock: 30, sku: 'PF-005', imageUrl: productImages.get('prod_33')?.imageUrl!, imageHint: productImages.get('prod_33')?.imageHint! },

  // Arepas y Envueltos
  { id: 'prod_5', name: 'Arepa con Queso', category: 'Arepas y Envueltos', price: 6000, cost: 2500, stock: 50, sku: 'ARE-001', imageUrl: productImages.get('prod_5')?.imageUrl!, imageHint: productImages.get('prod_5')?.imageHint! },
  { id: 'prod_19', name: 'Arepa de Huevo', category: 'Arepas y Envueltos', price: 5500, cost: 2000, stock: 60, sku: 'ARE-002', imageUrl: productImages.get('prod_19')?.imageUrl!, imageHint: productImages.get('prod_19')?.imageHint! },
  { id: 'prod_32', name: 'Tamal Tolimense', category: 'Arepas y Envueltos', price: 15000, cost: 6000, stock: 40, sku: 'ARE-003', imageUrl: productImages.get('prod_32')?.imageUrl!, imageHint: productImages.get('prod_32')?.imageHint! },
  { id: 'prod_2', name: 'Almojábana', category: 'Arepas y Envueltos', price: 2500, cost: 900, stock: 80, sku: 'ARE-004', imageUrl: productImages.get('prod_2')?.imageUrl!, imageHint: productImages.get('prod_2')?.imageHint! },
  { id: 'prod_8', name: 'Buñuelo', category: 'Arepas y Envueltos', price: 2000, cost: 700, stock: 100, sku: 'ARE-005', imageUrl: productImages.get('prod_8')?.imageUrl!, imageHint: productImages.get('prod_8')?.imageHint! },
  
  // Postres
  { id: 'prod_3', name: 'Torta de Tres Leches', category: 'Postres', price: 7500, cost: 3500, stock: 25, sku: 'POS-001', imageUrl: productImages.get('prod_3')?.imageUrl!, imageHint: productImages.get('prod_3')?.imageHint! },
  { id: 'prod_20', name: 'Mazamorra con Panela', category: 'Postres', price: 6000, cost: 2000, stock: 40, sku: 'POS-002', imageUrl: productImages.get('prod_20')?.imageUrl!, imageHint: productImages.get('prod_20')?.imageHint! },
  { id: 'prod_21', name: 'Cholao Valluno', category: 'Postres', price: 9000, cost: 4000, stock: 30, sku: 'POS-003', imageUrl: productImages.get('prod_21')?.imageUrl!, imageHint: productImages.get('prod_21')?.imageHint! },
  { id: 'prod_22', name: 'Oblea con Arequipe', category: 'Postres', price: 4500, cost: 1500, stock: 100, sku: 'POS-004', imageUrl: productImages.get('prod_22')?.imageUrl!, imageHint: productImages.get('prod_22')?.imageHint! },
  { id: 'prod_34', name: 'Postre de Natas', category: 'Postres', price: 8000, cost: 3800, stock: 28, sku: 'POS-005', imageUrl: productImages.get('prod_34')?.imageUrl!, imageHint: productImages.get('prod_34')?.imageHint! },
  { id: 'prod_35', name: 'Merengón de Guanábana', category: 'Postres', price: 8500, cost: 4200, stock: 25, sku: 'POS-006', imageUrl: productImages.get('prod_35')?.imageUrl!, imageHint: productImages.get('prod_35')?.imageHint! },
  
  // Bebidas Típicas
  { id: 'prod_4', name: 'Jugo de Lulo', category: 'Bebidas Típicas', price: 5000, cost: 2000, stock: 90, sku: 'BEB-001', imageUrl: productImages.get('prod_4')?.imageUrl!, imageHint: productImages.get('prod_4')?.imageHint! },
  { id: 'prod_12', name: 'Limonada de Coco', category: 'Bebidas Típicas', price: 7000, cost: 3000, stock: 70, sku: 'BEB-002', imageUrl: productImages.get('prod_12')?.imageUrl!, imageHint: productImages.get('prod_12')?.imageHint! },
  { id: 'prod_23', name: 'Aguapanela con Queso', category: 'Bebidas Típicas', price: 6000, cost: 2200, stock: 80, sku: 'BEB-003', imageUrl: productImages.get('prod_23')?.imageUrl!, imageHint: productImages.get('prod_23')?.imageHint! },
  { id: 'prod_24', name: 'Refajo', category: 'Bebidas Típicas', price: 5500, cost: 2500, stock: 95, sku: 'BEB-004', imageUrl: productImages.get('prod_24')?.imageUrl!, imageHint: productImages.get('prod_24')?.imageHint! },
  { id: 'prod_36', name: 'Jugo de Maracuyá', category: 'Bebidas Típicas', price: 5000, cost: 2000, stock: 90, sku: 'BEB-005', imageUrl: productImages.get('prod_36')?.imageUrl!, imageHint: productImages.get('prod_36')?.imageHint! },
  { id: 'prod_37', name: 'Jugo de Mora', category: 'Bebidas Típicas', price: 5000, cost: 2000, stock: 90, sku: 'BEB-006', imageUrl: productImages.get('prod_37')?.imageUrl!, imageHint: productImages.get('prod_37')?.imageHint! },
  
  // Cafés Especiales
  { id: 'prod_1', name: 'Tinto Campesino', category: 'Cafés Especiales', price: 3500, cost: 1200, stock: 150, sku: 'CAF-001', imageUrl: productImages.get('prod_1')?.imageUrl!, imageHint: productImages.get('prod_1')?.imageHint! },
  { id: 'prod_25', name: 'Café con Leche', category: 'Cafés Especiales', price: 4000, cost: 1500, stock: 140, sku: 'CAF-002', imageUrl: productImages.get('prod_25')?.imageUrl!, imageHint: productImages.get('prod_25')?.imageHint! },
  { id: 'prod_38', name: 'Café Guayoyo', category: 'Cafés Especiales', price: 3000, cost: 1000, stock: 160, sku: 'CAF-003', imageUrl: productImages.get('prod_38')?.imageUrl!, imageHint: productImages.get('prod_38')?.imageHint! },
  { id: 'prod_39', name: 'Aromática de Frutas', category: 'Cafés Especiales', price: 4500, cost: 1800, stock: 120, sku: 'CAF-004', imageUrl: productImages.get('prod_39')?.imageUrl!, imageHint: productImages.get('prod_39')?.imageHint! },
  
  // Cervezas y Licores
  { id: 'prod_7', name: 'Club Colombia', category: 'Cervezas y Licores', price: 5000, cost: 2500, stock: 120, sku: 'LIC-001', imageUrl: productImages.get('prod_7')?.imageUrl!, imageHint: productImages.get('prod_7')?.imageHint! },
  { id: 'prod_40', name: 'Poker', category: 'Cervezas y Licores', price: 4500, cost: 2200, stock: 150, sku: 'LIC-002', imageUrl: productImages.get('prod_40')?.imageUrl!, imageHint: productImages.get('prod_40')?.imageHint! },
  { id: 'prod_41', name: 'Aguila', category: 'Cervezas y Licores', price: 4500, cost: 2200, stock: 150, sku: 'LIC-003', imageUrl: productImages.get('prod_41')?.imageUrl!, imageHint: productImages.get('prod_41')?.imageHint! },
  { id: 'prod_26', name: 'Aguardiente (Copa)', category: 'Cervezas y Licores', price: 7000, cost: 3000, stock: 50, sku: 'LIC-004', imageUrl: productImages.get('prod_26')?.imageUrl!, imageHint: productImages.get('prod_26')?.imageHint! },
  { id: 'prod_27', name: 'Ron Viejo de Caldas (Copa)', category: 'Cervezas y Licores', price: 8000, cost: 3500, stock: 50, sku: 'LIC-005', imageUrl: productImages.get('prod_27')?.imageUrl!, imageHint: productImages.get('prod_27')?.imageHint! },
];
