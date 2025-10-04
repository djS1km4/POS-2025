'use client';

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { type Order, type Product } from '@/lib/placeholder-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Loader2, PlusCircle, MinusCircle, Search, Pencil } from 'lucide-react';
import Image from 'next/image';
import { getOrders, createOrder, updateOrderStatus, updateOrderItems, type OrderItem } from '@/services/order-service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { products as allProducts } from '@/lib/placeholder-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserContext } from '@/context/user-context';

const OrderCard = ({ order, onStatusChange, onEditOrder }: { order: Order; onStatusChange: (id: string, status: Order['status']) => void, onEditOrder: (order: Order) => void }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateDate = () => {
        if(order.createdAt) {
            setTimeAgo(formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: es }));
        }
    }
    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [order.createdAt]);


  const getBadgeVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" | "info" | "success" | "warning" | "delivery" => {
    switch (status) {
      case 'Pendiente':
        return 'secondary';
      case 'Preparando':
        return 'warning';
      case 'Listo':
        return 'info';
      case 'En entrega':
        return 'delivery';
      case 'Completado':
      case 'Pagado':
        return 'success';
      case 'Cancelado':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg">{order.id}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {order.customerName} &middot; {timeAgo}
          </p>
        </div>
        <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            {order.items.map(({product, quantity}) => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Image src={product.imageUrl} alt={product.name} width={32} height={32} className="rounded-md object-cover" data-ai-hint={product.imageHint} />
                        <span>{product.name}</span>
                    </div>
                    <span>x {quantity}</span>
                </div>
            ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </CardContent>
      <CardFooter className='justify-end gap-2'>
        {order.status !== 'Cancelado' && order.status !== 'Completado' && order.status !== 'Pagado' && (
          <Button variant="outline" size="sm" onClick={() => onEditOrder(order)}>
              <Pencil className="mr-2 h-4 w-4" /> Modificar
          </Button>
        )}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={order.status === 'Completado' || order.status === 'Cancelado' || order.status === 'Pagado'}>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem disabled={order.status === 'Preparando'} onClick={() => onStatusChange(order.id, 'Preparando')}>Marcar como Preparando</DropdownMenuItem>
                <DropdownMenuItem disabled={order.status === 'Listo'} onClick={() => onStatusChange(order.id, 'Listo')}>Marcar como Listo</DropdownMenuItem>
                <DropdownMenuItem disabled={order.status === 'En entrega'} onClick={() => onStatusChange(order.id, 'En entrega')}>Marcar como En Entrega</DropdownMenuItem>
                <DropdownMenuItem disabled={order.status === 'Completado'} onClick={() => onStatusChange(order.id, 'Completado')}>Marcar como Completado</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" disabled={order.status === 'Cancelado'} onClick={() => onStatusChange(order.id, 'Cancelado')}>Cancelar Orden</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

type CartItem = {
    product: Product;
    quantity: number;
};

type OrderDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onOrderUpdated: () => void;
    editingOrder?: Order | null;
}

const OrderDialog = ({ open, onOpenChange, onOrderUpdated, editingOrder = null }: OrderDialogProps) => {
    const [customerName, setCustomerName] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const userContext = useContext(UserContext);
    const { currentUser } = userContext!;

    useEffect(() => {
        if (editingOrder) {
            setCustomerName(editingOrder.customerName);
            setCart(editingOrder.items);
        } else {
            setCustomerName('');
            setCart([]);
        }
        setSearchTerm('');
        setSelectedCategory('Todos');
    }, [editingOrder, open]);


    const categories = ['Todos', ...Array.from(new Set(allProducts.map(p => p.category)))];

    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
        }).format(amount);
    };

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            setCart(cart.filter(item => item.product.id !== productId));
        } else {
            setCart(cart.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));
        }
    };
    
    const handleSubmit = async () => {
        if (!customerName || cart.length === 0) return;

        const itemsToSave: OrderItem[] = cart.map(item => ({ productId: item.product.id, quantity: item.quantity }));

        if (editingOrder) {
            await updateOrderItems(editingOrder.id, itemsToSave, customerName);
        } else {
            await createOrder({
                customerName: customerName,
                customerPhone: 'N/A', // Not collected in this form
                customerAddress: 'En local', // Default for manual orders
                items: itemsToSave,
                userId: currentUser?.id,
            });
        }


        onOrderUpdated();
        onOpenChange(false);
    };

    const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const dialogTitle = editingOrder ? `Modificar Pedido ${editingOrder.id}` : 'Crear Nuevo Pedido';
    const dialogDescription = editingOrder ? 'Añade o elimina productos del pedido actual.' : 'Busca productos, agrégalos al pedido y asigna un cliente.';
    const buttonText = editingOrder ? 'Guardar Cambios' : 'Crear Pedido';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl grid-rows-[auto,1fr,auto]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
                    <div className="flex flex-col gap-4">
                        <h3 className='font-medium'>Productos Disponibles</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar productos..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                {categories.slice(0, 4).map(cat => (
                                     <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        <ScrollArea className="h-96">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
                               {filteredProducts.map(product => (
                                   <Card key={product.id} onClick={() => addToCart(product)} className="cursor-pointer transition-transform hover:scale-105">
                                        <CardContent className="p-0">
                                            <Image src={product.imageUrl} alt={product.name} width={150} height={100} className="w-full h-24 object-cover rounded-t-lg" data-ai-hint={product.imageHint} />
                                        </CardContent>
                                        <CardHeader className="p-2">
                                            <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground">{formatCurrency(product.price)}</p>
                                        </CardHeader>
                                   </Card>
                               ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="flex flex-col bg-muted/50 p-4 rounded-lg">
                        <h3 className='font-medium mb-4'>Pedido Actual</h3>
                         <div className="mb-4">
                            <Label htmlFor="customer-name">Nombre del Cliente</Label>
                            <Input 
                                id="customer-name" 
                                placeholder="Ej: Mesa 5, Juan Pérez" 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="bg-background"
                            />
                        </div>
                        <ScrollArea className="h-72 flex-1 bg-background rounded-md border">
                            {cart.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                                    El pedido está vacío.
                                </div>
                            ) : (
                                <div className="space-y-2 p-2">
                                    {cart.map(item => (
                                        <div key={item.product.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                                            <div>
                                                <span className='text-sm font-medium'>{item.product.name}</span>
                                                <p className="text-xs text-muted-foreground">{formatCurrency(item.product.price)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><MinusCircle className="h-4 w-4" /></Button>
                                                <span className="text-sm font-bold">{item.quantity}</span>
                                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><PlusCircle className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                        <Separator className='my-4'/>
                         <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(cartTotal)}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSubmit} disabled={!customerName || cart.length === 0}>{buttonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const freshOrders = await getOrders();
    setOrders(freshOrders);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };
  
  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setOrderDialogOpen(true);
  }
  
  const handleCreateOrder = () => {
      setEditingOrder(null);
      setOrderDialogOpen(true);
  }

  const activeOrders = orders.filter(o => o.status === 'Pendiente' || o.status === 'Preparando' || o.status === 'Listo' || o.status === 'En entrega').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const completedOrders = orders.filter(o => o.status === 'Completado' || o.status === 'Pagado').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const cancelledOrders = orders.filter(o => o.status === 'Cancelado').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const renderOrderList = (orderList: Order[]) => {
    if (isLoading && orders.length === 0) {
      return (
        <div className="flex justify-center items-center col-span-full p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )
    }
    if (orderList.length === 0) {
      return <p className="text-muted-foreground col-span-full p-8 text-center">No hay órdenes en esta categoría.</p>;
    }
    return orderList.map(order => (
      <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} onEditOrder={handleEditOrder} />
    ));
  };


  return (
    <>
        <div className='flex items-center justify-between'>
            <h1 className="text-2xl font-bold tracking-tight">Gestión de Pedidos</h1>
            <Button onClick={handleCreateOrder}>
                <PlusCircle className='mr-2 h-4 w-4' />
                Crear Pedido
            </Button>
        </div>
        <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Activas ({!isLoading || orders.length > 0 ? activeOrders.length : '...'})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({!isLoading || orders.length > 0 ? completedOrders.length : '...'})</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas ({!isLoading || orders.length > 0 ? cancelledOrders.length : '...'})</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderOrderList(activeOrders)}
            </div>
        </TabsContent>
        <TabsContent value="completed">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderOrderList(completedOrders)}
            </div>
        </TabsContent>
        <TabsContent value="cancelled">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderOrderList(cancelledOrders)}
            </div>
        </TabsContent>
        </Tabs>
        <OrderDialog 
            open={isOrderDialogOpen}
            onOpenChange={setOrderDialogOpen}
            onOrderUpdated={fetchOrders}
            editingOrder={editingOrder}
        />
    </>
  );
}
