'use client';

import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TeamPerformance } from "./components/team-performance";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cardClasses = "shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-200";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/reports">
          <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos Totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(45231890)}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/reports">
          <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nuevos Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/inventory">
            <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                +19% desde el mes pasado
                </p>
            </CardContent>
            </Card>
        </Link>
         <Link href="/dashboard/inventory">
            <Card className={cn(cardClasses)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Items con Stock Bajo
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                2 items necesitan reposición inmediata
                </p>
            </CardContent>
            </Card>
        </Link>
      </div>

      <TeamPerformance />
    </div>
  )
}
