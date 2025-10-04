'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserContext } from "@/context/user-context";
import { getOrders } from "@/services/order-service";
import { Order, User, UserRole } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { ShoppingCart, TrendingUp, Trophy, Users } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { renderAvatar } from "@/lib/user-avatar";

type PerformanceData = {
    user: User;
    totalRevenue: number;
    salesCount: number;
    averageSale: number;
    contribution: number;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(amount);
};

const getRoleBadgeVariant = (role: UserRole): "default" | "secondary" | "outline" | "destructive" | "success" | "info" => {
    switch (role) {
        case 'Administrador':
            return 'default';
        case 'Mesero':
        case 'Vendedor':
            return 'info';
        case 'Bartender':
        case 'Cajero':
            return 'success';
        default:
            return 'secondary';
    }
};

export function TeamPerformance() {
    const userContext = useContext(UserContext);
    const users = userContext?.users || [];
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchAndSetOrders = async () => {
            const allOrders = await getOrders();
            const paidOrders = allOrders.filter(o => o.status === 'Pagado');
            setOrders(paidOrders);
        };
        fetchAndSetOrders();
    }, []);

    const performanceData = useMemo(() => {
        if (!users.length || !orders.length) return [];
        
        const sellers = users.filter(u => u.role !== 'Administrador');
        const performanceMap = new Map<string, { totalRevenue: number, salesCount: number }>();

        orders.forEach(order => {
            if (order.userId) {
                const data = performanceMap.get(order.userId) || { totalRevenue: 0, salesCount: 0 };
                data.totalRevenue += order.total;
                data.salesCount += 1;
                performanceMap.set(order.userId, data);
            }
        });

        const totalOverallRevenue = Array.from(performanceMap.values()).reduce((sum, current) => sum + current.totalRevenue, 0);

        const performance: PerformanceData[] = sellers.map(user => {
            const data = performanceMap.get(user.id) || { totalRevenue: 0, salesCount: 0 };
            return {
                user,
                totalRevenue: data.totalRevenue,
                salesCount: data.salesCount,
                averageSale: data.salesCount > 0 ? data.totalRevenue / data.salesCount : 0,
                contribution: totalOverallRevenue > 0 ? (data.totalRevenue / totalOverallRevenue) * 100 : 0
            };
        }).sort((a, b) => b.totalRevenue - a.totalRevenue);

        return performance;
    }, [users, orders]);

    const totalSales = useMemo(() => orders.length, [orders]);
    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
    const activeMembers = useMemo(() => performanceData.filter(p => p.salesCount > 0).length, [performanceData]);
    const averagePerPerson = activeMembers > 0 ? totalRevenue / activeMembers : 0;
    const averageSalesCount = activeMembers > 0 ? totalSales / activeMembers : 0;


    const getRankStyles = (rank: number) => {
        switch (rank) {
            case 0: return {
                bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
                textColor: "text-yellow-600 dark:text-yellow-400",
                medalColor: "text-yellow-500",
                borderColor: "border-yellow-200 dark:border-yellow-800"
            };
            case 1: return {
                bgColor: "bg-gray-200 dark:bg-gray-700/50",
                textColor: "text-gray-600 dark:text-gray-400",
                medalColor: "text-gray-500",
                borderColor: "border-gray-300 dark:border-gray-600"
            };
            case 2: return {
                bgColor: "bg-orange-100 dark:bg-orange-900/50",
                textColor: "text-orange-600 dark:text-orange-400",
                medalColor: "text-orange-500",
                borderColor: "border-orange-200 dark:border-orange-800"
            };
            default: return {
                bgColor: "bg-muted/30",
                textColor: "text-muted-foreground",
                medalColor: "text-muted-foreground",
                borderColor: "border-transparent"
            };
        }
    }


    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle>Rendimiento del Equipo</CardTitle>
                        <CardDescription>Período: Hoy</CardDescription>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                    <p className="text-xs text-muted-foreground">{totalSales} ventas totales</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    {performanceData.map((data, index) => {
                        const rankStyles = getRankStyles(index);
                        return (
                            <div key={data.user.id} className={cn("grid grid-cols-[auto,1fr,auto] items-center gap-4 rounded-lg p-3 border", rankStyles.borderColor, index > 2 ? "" : rankStyles.bgColor )}>
                                <div className="flex items-center gap-4">
                                     <div className={cn("flex h-8 w-8 items-center justify-center rounded-full font-bold", rankStyles.bgColor, rankStyles.textColor)}>
                                        {index < 3 ? <Trophy className={cn("h-5 w-5", rankStyles.medalColor)} /> : <span>{index + 1}</span>}
                                    </div>
                                    {renderAvatar(data.user)}
                                    <div>
                                        <p className="font-semibold">{data.user.name}</p>
                                        <p className="text-xs text-muted-foreground">@{data.user.email.split('@')[0]}</p>
                                    </div>
                                     <Badge variant={getRoleBadgeVariant(data.user.role)}>{data.user.role}</Badge>
                                </div>

                                <div className="grid grid-cols-4 gap-4 items-center text-sm">
                                    <div>
                                        <p className="font-semibold text-green-600">{formatCurrency(data.totalRevenue)}</p>
                                        <p className="text-xs text-muted-foreground">Ingresos</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{data.salesCount}</p>
                                            <p className="text-xs text-muted-foreground">Ventas</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{formatCurrency(data.averageSale)}</p>
                                            <p className="text-xs text-muted-foreground">Promedio</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center gap-2">
                                        <Progress value={data.contribution} className="w-24 h-2" />
                                        <p className="text-xs font-semibold">{data.contribution.toFixed(1)}%</p>
                                    </div>
                                </div>

                                <div />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
             <CardFooter className="mt-4 justify-around border-t pt-6">
                <div className="text-center">
                    <p className="text-2xl font-bold">{activeMembers}</p>
                    <p className="text-xs text-muted-foreground">Miembros activos</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(averagePerPerson)}</p>
                    <p className="text-xs text-muted-foreground">Promedio por persona</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">{Math.round(averageSalesCount)}</p>
                    <p className="text-xs text-muted-foreground">Ventas promedio</p>
                </div>
            </CardFooter>
        </Card>
    );
}
