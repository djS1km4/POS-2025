'use client';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import { PlusCircle, MinusCircle, X, CreditCard, Landmark, CircleDollarSign, Utensils, Receipt, HandCoins, Percent, Keyboard } from 'lucide-react';
import { products as allProducts, Product, Order } from '@/lib/placeholder-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOrders, createOrder, updateOrderStatus } from '@/services/order-service';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { UserContext } from '@/context/user-context';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryContext } from '@/context/category-context';

type CartItem = {
  product: Product;
  quantity: number;
};

type BillableOrder = Order & {
    source: 'quick-sale' | 'existing-order';
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
};


export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<BillableOrder | null>(null);
  const [ordersToBill, setOrdersToBill] = useState<Order[]>([]);
  const { toast } = useToast();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isTipPopoverOpen, setTipPopoverOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const userContext = useContext(UserContext);
  const categoryContext = useContext(CategoryContext);
  const { currentUser } = userContext!;

  const calculateTotals = (cartItems: CartItem[], tip: number = 0) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.19;
    const total = subtotal + tax + tip;
    const profit = cartItems.reduce((sum, item) => sum + (item.product.price - item.product.cost) * item.quantity, 0);
    return { subtotal, tax, total, profit, tip };
  }

  const fetchOrdersToBill = useCallback(async () => {
    const allOrders = await getOrders();
    const filtered = allOrders.filter(o => o.status === 'Completado');
    setOrdersToBill(filtered);
  }, []);
  
  useEffect(() => {
    fetchOrdersToBill();
  }, [fetchOrdersToBill]);
  
  const createActiveOrderFromCart = (newCart: CartItem[], tip: number = 0) => {
     if (newCart.length === 0) {
        clearInvoice();
        return;
     }
     const { subtotal, tax, total, profit } = calculateTotals(newCart, tip);

      setActiveOrder({
          id: 'quick-sale',
          customerName: 'Cliente de Mostrador',
          items: newCart,
          total,
          subtotal,
          tax,
          tip,
          profit,
          status: 'Pendiente',
          createdAt: new Date().toISOString(),
          type: 'En local',
          source: 'quick-sale',
          userId: currentUser?.id,
          paymentMethod: 'Efectivo',
      });
  }

  const addToCart = (product: Product) => {
    if(activeOrder && activeOrder.source === 'existing-order') {
        toast({
            variant: 'destructive',
            title: "Pedido existente cargado",
            description: "Limpia la factura actual antes de iniciar una nueva venta rápida."
        });
        return;
    }

    const newCart = [...cart];
    const existingItem = newCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ product, quantity: 1 });
    }
    setCart(newCart);
    createActiveOrderFromCart(newCart, activeOrder?.tip || 0);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if(activeOrder?.source === 'existing-order') return; // Cannot modify existing orders

    let newCart = [...cart];
    if (quantity <= 0) {
      newCart = newCart.filter((item) => item.product.id !== productId);
    } else {
      const itemToUpdate = newCart.find((item) => item.product.id === productId);
      if(itemToUpdate) {
          itemToUpdate.quantity = quantity;
      }
    }
    setCart(newCart);
    createActiveOrderFromCart(newCart, activeOrder?.tip || 0);
  };

  // --- Start Barcode Scanner Logic ---
  useEffect(() => {
    let barcode = '';
    let barcodeTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (barcode.length > 3) { // Assume barcodes are longer than 3 chars
            const product = allProducts.find(p => p.sku === barcode);
            if (product) {
                addToCart(product);
                toast({
                    title: "Producto Añadido",
                    description: `${product.name} fue añadido a la factura.`,
                });
            } else {
                 toast({
                    variant: "destructive",
                    title: "Producto no encontrado",
                    description: `No se encontró ningún producto con el código: ${barcode}`,
                });
            }
        }
        barcode = '';
        return;
      }

      // Ignore special keys except numbers and letters
      if (e.key.length > 1) return;

      barcode += e.key;

      clearTimeout(barcodeTimeout);
      barcodeTimeout = setTimeout(() => {
        barcode = ''; // Reset barcode if typing is too slow
      }, 50); // 50ms timeout between keystrokes
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(barcodeTimeout);
    };
  }, [addToCart, toast]);
  // --- End Barcode Scanner Logic ---


  const loadOrderToInvoice = (order: Order) => {
      setCart([]); // Clear quick sale cart
      setActiveOrder({ ...order, source: 'existing-order' });
  };
  
  const clearInvoice = () => {
    setCart([]);
    setActiveOrder(null);
  }

  const handleOpenCashDrawer = () => {
      toast({
          title: "Abriendo Caja Registradora",
          description: "Se envió el comando para abrir la caja.",
      });
  }

  const handlePayment = async (method: 'Tarjeta' | 'Efectivo' | 'Transferencia') => {
    if(!activeOrder) return;
    
    if (activeOrder.source === 'quick-sale' && activeOrder.items.length > 0) {
         await createOrder({
            customerName: activeOrder.customerName,
            customerPhone: 'N/A',
            customerAddress: 'En local',
            items: activeOrder.items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
            userId: currentUser?.id,
            tip: activeOrder.tip,
            paymentMethod: method,
            status: 'Pagado',
        });
    } else if (activeOrder.source === 'existing-order') {
        await updateOrderStatus(activeOrder.id, 'Pagado', method);
    }

    if (method === 'Efectivo') {
        handleOpenCashDrawer();
    }

    toast({
      title: "¡Venta Facturada!",
      description: `Venta de ${formatCurrency(activeOrder.total)} a ${activeOrder.customerName} procesada vía ${method}.`,
    });
    
    if (activeOrder.source === 'existing-order') {
        fetchOrdersToBill();
    }

    clearInvoice();
    setCheckoutOpen(false);
  }

  const handleAddTip = (percentage?: number, customAmount?: number) => {
      if (!activeOrder) return;

      let tipAmount = 0;
      const baseTotalForTip = activeOrder.subtotal + (activeOrder.tax || 0);

      if (customAmount && customAmount > 0) {
          tipAmount = customAmount;
      } else if (percentage) {
          tipAmount = baseTotalForTip * (percentage / 100);
      }
      
      const newTotal = baseTotalForTip + tipAmount;

      setActiveOrder({
          ...activeOrder,
          tip: tipAmount,
          total: newTotal
      });

      if (activeOrder.source === 'quick-sale') {
          createActiveOrderFromCart(cart, tipAmount);
      }
      setTipPopoverOpen(false);
  }

  const tipPercentages = [5, 10, 15, 20, 25, 30, 35, 40];
  
  const categories = categoryContext ? ['Todos', ...categoryContext.categories.map(c => c.name)] : ['Todos'];

  const filteredProducts = allProducts.filter(product => {
      if (selectedCategory === 'Todos') return true;
      return product.category === selectedCategory;
  });

  return (
    <div className="grid h-[calc(100vh-5rem)] grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Tabs defaultValue="quick-sale" className="h-full flex flex-col" onValueChange={(value) => { if(value === 'orders-to-bill') fetchOrdersToBill() }}>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                    <CardTitle>Punto de Venta</CardTitle>
                    <CardDescription>Selecciona un producto para una venta rápida o cobra un pedido existente.</CardDescription>
                </div>
                <TabsList>
                    <TabsTrigger value="quick-sale"><Utensils className="mr-2"/>Venta Rápida</TabsTrigger>
                    <TabsTrigger value="orders-to-bill">
                        <Receipt className={cn("mr-2", ordersToBill.length > 0 && "animate-blink")} />
                        Pedidos por Cobrar
                    </TabsTrigger>
                </TabsList>
            </CardHeader>
            <TabsContent value="quick-sale" className="h-full flex-1 flex flex-col">
                <Card className="h-full flex flex-col">
                    <div className="p-4 border-b">
                        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                            <TabsList className="flex flex-wrap h-auto">
                                {categories.map(cat => (
                                    <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                    </div>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-[calc(100vh-18rem)]">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
                            {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="cursor-pointer transition-all hover:shadow-lg"
                            >
                                <CardContent className="p-0">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={200}
                                    height={150}
                                    className="h-24 w-full rounded-t-lg object-cover"
                                    data-ai-hint={product.imageHint}
                                />
                                </CardContent>
                                <CardFooter className="p-2 flex flex-col items-start">
                                <h3 className="text-sm font-medium">{product.name}</h3>
                                <p className="text-xs text-muted-foreground">{formatCurrency(product.price)}</p>
                                </CardFooter>
                            </Card>
                            ))}
                        </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="orders-to-bill" className="h-full flex-1">
                 <Card className="h-full">
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-14rem)]">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
                                {ordersToBill.length > 0 ? ordersToBill.map(order => (
                                    <Card key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => loadOrderToInvoice(order)}>
                                        <CardHeader>
                                            <div className='flex justify-between items-center'>
                                                <CardTitle className="text-base">{order.id}</CardTitle>
                                                <Badge variant={'default'}>{order.status}</Badge>
                                            </div>
                                            <CardDescription>{order.customerName}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className='text-sm text-muted-foreground list-disc pl-4'>
                                               {order.items.map(item => (
                                                   <li key={item.product.id}>{item.quantity}x {item.product.name}</li>
                                               ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <p className='font-bold w-full text-right'>{formatCurrency(order.total)}</p>
                                        </CardFooter>
                                    </Card>
                                )) : (
                                    <p className="col-span-full text-center text-muted-foreground py-10">No hay pedidos completados para cobrar.</p>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

      <div>
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Factura Actual</CardTitle>
            {activeOrder && <CardDescription>Pedido: {activeOrder.id} | Cliente: {activeOrder.customerName}</CardDescription>}
          </CardHeader>
          <CardContent className="flex-grow">
            <ScrollArea className="h-[calc(100vh-25rem)]">
              {!activeOrder ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    <div className='text-center'>
                        <Keyboard className="h-10 w-10 mx-auto text-muted-foreground/50"/>
                        <p className='mt-2'>Escanea un código de barras o selecciona productos.</p>
                    </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrder.items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                          data-ai-hint={item.product.imageHint}
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.product.price)}
                          </p>
                        </div>
                      </div>
                      {activeOrder.source === 'quick-sale' ? (
                        <div className="flex items-center gap-2">
                            <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                            <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                            <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                      ) : (
                        <div className='font-medium text-sm'>
                            x {item.quantity}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
          {activeOrder && (
            <CardFooter className="flex flex-col gap-2 border-t pt-4">
              <div className="flex w-full justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>{formatCurrency(activeOrder.subtotal)}</span>
              </div>
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <span>Impuesto (19%)</span>
                <span>{formatCurrency(activeOrder.tax)}</span>
              </div>
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                <span>Propina</span>
                <span>{formatCurrency(activeOrder.tip)}</span>
              </div>
              <Separator />
              <div className="flex w-full justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(activeOrder.total)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                  <Popover open={isTipPopoverOpen} onOpenChange={setTipPopoverOpen}>
                      <PopoverTrigger asChild>
                          <Button variant="outline" size="lg" disabled={!activeOrder}><HandCoins className="mr-2 h-4 w-4" />Agregar Propina</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                          <div className="grid gap-4">
                              <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Añadir Propina</h4>
                                  <p className="text-sm text-muted-foreground">
                                      Selecciona un porcentaje o introduce un monto.
                                  </p>
                              </div>
                              <div className="grid grid-cols-4 gap-2">
                                  {tipPercentages.map(p => (
                                      <Button key={p} variant="secondary" onClick={() => handleAddTip(p)}>{p}%</Button>
                                  ))}
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="custom-tip">Monto Personalizado</Label>
                                <Input id="custom-tip" type="number" placeholder="Ej: 5000" onChange={(e) => handleAddTip(undefined, Number(e.target.value))} />
                              </div>
                          </div>
                      </PopoverContent>
                  </Popover>

                    <Button size="lg" variant="secondary" onClick={handleOpenCashDrawer}><Keyboard className="mr-2"/>Abrir Caja</Button>
              </div>
               <Dialog open={isCheckoutOpen} onOpenChange={setCheckoutOpen}>
                    <DialogTrigger asChild>
                       <Button size="lg" className="w-full" disabled={!activeOrder}>Facturar</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Seleccionar Método de Pago</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
                        <Button variant="outline" size="lg" className="h-20 flex-col gap-2" onClick={() => handlePayment('Tarjeta')}>
                          <CreditCard/> Tarjeta
                        </Button>
                         <Button variant="outline" size="lg" className="h-20 flex-col gap-2" onClick={() => handlePayment('Efectivo')}>
                          <CircleDollarSign/> Efectivo
                        </Button>
                         <Button variant="outline" size="lg" className="h-20 flex-col gap-2" onClick={() => handlePayment('Transferencia')}>
                          <Landmark/> Transferencia
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
              
              <Button variant="outline" className="w-full" onClick={clearInvoice}>
                <X className="mr-2 h-4 w-4" /> Limpiar Factura
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
