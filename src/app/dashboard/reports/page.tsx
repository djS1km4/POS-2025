'use client';
import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Sector, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Order } from "@/lib/placeholder-data";
import { DateRangePicker } from "@/components/date-range-picker";
import React, { useMemo, useState, useContext, useEffect, useCallback } from "react";
import { getOrders } from "@/services/order-service";
import { UserContext } from "@/context/user-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
};


export default function ReportsPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const userContext = useContext(UserContext);
    const users = userContext?.users || [];
    const [filteredWaiter, setFilteredWaiter] = useState('all');
    const { toast } = useToast();
    const [isPrintDialogOpen, setPrintDialogOpen] = useState(false);
    const [waiterToPrint, setWaiterToPrint] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        const fetchAndSetOrders = async () => {
            const allOrders = await getOrders();
            const paidOrders = allOrders.filter(o => o.status === 'Pagado');
            setOrders(paidOrders);
        };
        fetchAndSetOrders();
    }, []);

    const waiters = useMemo(() => 
        users.filter(u => u.role === 'Mesero' || u.role === 'Vendedor' || u.role === 'Bartender' || u.role === 'Cajero')
    , [users]);

    const employeeOptions = useMemo(() => [
        { value: 'all', label: 'Todos los Empleados' },
        ...waiters.map(user => ({ value: user.id, label: user.name }))
    ], [waiters]);


    const filteredOrders = useMemo(() => {
        if (filteredWaiter === 'all') return orders;
        return orders.filter(o => o.userId === filteredWaiter);
    }, [orders, filteredWaiter]);
    
    const totalRevenue = useMemo(() => filteredOrders.reduce((acc, order) => acc + order.total, 0), [filteredOrders]);
    const totalProfit = useMemo(() => filteredOrders.reduce((acc, order) => acc + order.profit, 0), [filteredOrders]);
    const totalTips = useMemo(() => filteredOrders.reduce((acc, order) => acc + order.tip, 0), [filteredOrders]);

    const salesByProduct = useMemo(() => {
        const productMap = new Map<string, { name: string, quantity: number, revenue: number }>();
        filteredOrders.forEach(order => {
            order.items.forEach(item => {
                const existing = productMap.get(item.product.id);
                if (existing) {
                    existing.quantity += item.quantity;
                    existing.revenue += item.product.price * item.quantity;
                } else {
                    productMap.set(item.product.id, {
                        name: item.product.name,
                        quantity: item.quantity,
                        revenue: item.product.price * item.quantity
                    });
                }
            });
        });
        return Array.from(productMap.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
    }, [filteredOrders]);
    
    const tipsByWaiter = useMemo(() => {
        const waiterMap = new Map<string, { name: string, totalTips: number }>();
        filteredOrders.forEach(order => {
            if (order.userId) {
                const user = users.find(u => u.id === order.userId);
                if (user) {
                    const existing = waiterMap.get(user.id);
                    if (existing) {
                        existing.totalTips += order.tip;
                    } else {
                        waiterMap.set(user.id, { name: user.name, totalTips: order.tip });
                    }
                }
            }
        });
        return Array.from(waiterMap.values()).sort((a,b) => b.totalTips - a.totalTips);
    }, [filteredOrders, users]);

    const salesByPaymentMethod = useMemo(() => {
        const paymentMap = new Map<string, number>();
        paymentMap.set('Efectivo', 0);
        paymentMap.set('Tarjeta', 0);
        paymentMap.set('Transferencia', 0);

        filteredOrders.forEach(order => {
            const method = order.paymentMethod || 'Efectivo'; // Default a efectivo
            paymentMap.set(method, (paymentMap.get(method) || 0) + order.total);
        });
        
        return [
            { method: 'Efectivo', total: paymentMap.get('Efectivo') || 0, fill: 'var(--chart-1)' },
            { method: 'Tarjeta', total: paymentMap.get('Tarjeta') || 0, fill: 'var(--chart-2)' },
            { method: 'Transferencia', total: paymentMap.get('Transferencia') || 0, fill: 'var(--chart-3)' },
        ];
    }, [filteredOrders]);

    const chartConfig = {
      revenue: { label: "Ingresos" },
      totalTips: { label: "Propinas" },
    } satisfies import("../../../../components/ui/chart").ChartConfig;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (activeIndex !== index) {
            return null;
        }
        
        if (!salesByPaymentMethod[activeIndex]) return null;

        const { method, total } = salesByPaymentMethod[activeIndex];
        const totalSales = salesByPaymentMethod.reduce((acc, curr) => acc + curr.total, 0);
        const percentage = totalSales > 0 ? (total / totalSales) * 100 : 0;

        return (
            <g>
                <text x={cx} y={cy - 12} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-sm font-semibold">
                    {method}
                </text>
                <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
                    {formatCurrency(total)}
                </text>
                <text x={cx} y={cy + 24} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
                    ({percentage.toFixed(1)}%)
                </text>
            </g>
        );
    };
    

    const handlePrint = (waiterId?: string) => {
        const printAction = () => {
             setTimeout(() => {
                window.print();
                toast({
                    title: "Imprimiendo Reporte",
                    description: "Se ha generado la vista de impresión para tu reporte.",
                });
             }, 100);
        }

        if (waiterId) {
            setFilteredWaiter(waiterId);
        }
        
        printAction();
    }
    
    const handlePrintIndividual = () => {
        if (!waiterToPrint) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Por favor, selecciona un empleado para imprimir el reporte.',
            });
            return;
        }
        handlePrint(waiterToPrint);
        setPrintDialogOpen(false);
    }

  return (
    <>
        <div className="flex flex-col gap-6 printable-area">
            <div className="flex items-center justify-between print-hidden">
                <div>
                     <h1 className="text-2xl font-bold tracking-tight">Reportes de Ventas</h1>
                     <p className="text-muted-foreground">Analiza el rendimiento de tu negocio a lo largo del tiempo.</p>
                </div>
                <div className="flex gap-2">
                    <DateRangePicker />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button><Printer className="mr-2"/> Imprimir Reporte</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                             <DropdownMenuLabel>Impresión General</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => handlePrint()}>
                                Imprimir Reporte Actual
                            </DropdownMenuItem>
                             <DropdownMenuSeparator />
                             <DropdownMenuLabel>Reportes Individuales</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => setPrintDialogOpen(true)}>
                                Imprimir por Empleado...
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card className="print-only mb-4 border-none shadow-none">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2">
                        <Image src="/logo.png" alt="logo" width={40} height={40}/>
                        <h1 className="text-2xl font-bold">Reporte de Ventas</h1>
                    </div>
                    <p className="text-muted-foreground">Generado el: {new Date().toLocaleDateString('es-CO')}</p>
                     {filteredWaiter !== 'all' && (
                         <p className="font-semibold">Empleado: {users.find(u => u.id === filteredWaiter)?.name}</p>
                     )}
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Resumen General</CardTitle>
                    <CardDescription>Filtra por empleado para ver su rendimiento individual.</CardDescription>
                    <div className="w-full md:w-1/4 pt-2 print-hidden">
                        <Combobox
                            options={employeeOptions}
                            value={filteredWaiter}
                            onSelect={setFilteredWaiter}
                            placeholder="Filtrar por empleado..."
                            searchPlaceholder="Buscar empleado..."
                        />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                     <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Ingresos Totales</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
                     </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Ganancia Total</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalProfit)}</p>
                     </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Propinas Totales</p>
                        <p className="text-3xl font-bold">{formatCurrency(totalTips)}</p>
                     </div>
                </CardContent>
            </Card>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                 <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Top 10 Productos Más Vendidos (por Ingresos)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <ResponsiveContainer>
                                <BarChart data={salesByProduct} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" tickFormatter={(value) => formatCurrency(value as number)} />
                                    <YAxis type="category" dataKey="name" width={120} tick={{fontSize: 12}} />
                                    <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} cursor={{ fill: 'hsl(var(--muted))' }} />
                                    <Bar dataKey="revenue" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3 flex flex-col">
                    <CardHeader>
                        <CardTitle>Ventas por Método de Pago</CardTitle>
                        <CardDescription>Distribución de ingresos según el método de pago utilizado.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer config={{}} className="mx-auto aspect-square h-full">
                            <ResponsiveContainer>
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel indicator="dot" />}
                                    />
                                    <Pie
                                        data={salesByPaymentMethod}
                                        dataKey="total"
                                        nameKey="method"
                                        innerRadius="60%"
                                        strokeWidth={5}
                                        activeIndex={activeIndex}
                                        onMouseOver={(_, index) => setActiveIndex(index)}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                    >
                                       {salesByPaymentMethod.map((entry) => (
                                          <Cell
                                            key={`cell-${entry.method}`}
                                            fill={entry.fill}
                                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                          />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm mt-4">
                         <div className="flex w-full items-center gap-2 font-medium leading-none">
                            <span className="h-2 w-2 rounded-full" style={{backgroundColor: 'var(--chart-1)'}} />
                            Efectivo <span className="ml-auto text-muted-foreground">{formatCurrency(salesByPaymentMethod.find(p => p.method === 'Efectivo')?.total || 0)}</span>
                        </div>
                        <div className="flex w-full items-center gap-2 font-medium leading-none">
                            <span className="h-2 w-2 rounded-full" style={{backgroundColor: 'var(--chart-2)'}} />
                            Tarjeta <span className="ml-auto text-muted-foreground">{formatCurrency(salesByPaymentMethod.find(p => p.method === 'Tarjeta')?.total || 0)}</span>
                        </div>
                        <div className="flex w-full items-center gap-2 font-medium leading-none">
                            <span className="h-2 w-2 rounded-full" style={{backgroundColor: 'var(--chart-3)'}} />
                            Transferencia <span className="ml-auto text-muted-foreground">{formatCurrency(salesByPaymentMethod.find(p => p.method === 'Transferencia')?.total || 0)}</span>
                        </div>
                    </CardFooter>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Propinas por Mesero</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={tipsByWaiter}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickFormatter={(value) => formatCurrency(value as number)} />
                                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} cursor={{ fill: 'hsl(var(--muted))' }} />
                                <Bar dataKey="totalTips" fill="var(--chart-1)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Historial de Ventas</CardTitle>
                     <CardDescription>Lista detallada de todas las transacciones pagadas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Pedido</TableHead>
                                <TableHead>Empleado</TableHead>
                                <TableHead>Fecha</TableHead>
                                 <TableHead>Método Pago</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                                <TableHead className="text-right">Propina</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Ganancia</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map(order => {
                                const user = users.find(u => u.id === order.userId);
                                return (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{user?.name || 'N/A'}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString('es-CO')}</TableCell>
                                        <TableCell>{order.paymentMethod}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(order.subtotal)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(order.tip)}</TableCell>
                                        <TableCell className="text-right font-semibold">{formatCurrency(order.total)}</TableCell>
                                        <TableCell className="text-right text-green-600">{formatCurrency(order.profit)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .print-hidden {
                        display: none;
                    }
                    .print-only {
                        display: block !important;
                    }
                    .recharts-wrapper {
                        width: 100% !important;
                    }
                }
                .print-only {
                    display: none;
                }
            `}</style>
        </div>
        
        <Dialog open={isPrintDialogOpen} onOpenChange={setPrintDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Imprimir Reporte por Empleado</DialogTitle>
                    <DialogDescription>
                        Selecciona un empleado para generar e imprimir su reporte de ventas individual.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label>Empleado</Label>
                    <Combobox
                        options={waiters.map(user => ({ value: user.id, label: user.name }))}
                        value={waiterToPrint}
                        onSelect={setWaiterToPrint}
                        placeholder="Seleccionar empleado..."
                        searchPlaceholder="Buscar empleado..."
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setPrintDialogOpen(false)}>Cancelar</Button>
                    <Button onClick={handlePrintIndividual}>Imprimir Reporte</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
