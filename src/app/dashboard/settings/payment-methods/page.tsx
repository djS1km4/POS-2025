'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Landmark, CreditCard, CircleDollarSign } from 'lucide-react';

const paymentMethods = [
    {
        id: 'efectivo',
        name: 'Efectivo',
        description: 'Aceptar pagos en efectivo en el punto de venta.',
        icon: <CircleDollarSign className="h-6 w-6" />,
    },
    {
        id: 'tarjeta',
        name: 'Tarjeta de Crédito/Débito',
        description: 'Procesar pagos con tarjetas a través de un datáfono.',
        icon: <CreditCard className="h-6 w-6" />,
    },
    {
        id: 'transferencia',
        name: 'Transferencia Bancaria',
        description: 'Aceptar pagos a través de transferencias bancarias.',
        icon: <Landmark className="h-6 w-6" />,
    }
];

export default function PaymentMethodsPage() {
    const [methodsState, setMethodsState] = useState({
        efectivo: true,
        tarjeta: true,
        transferencia: true,
    });
    const { toast } = useToast();

    const handleToggle = (methodId: keyof typeof methodsState) => {
        setMethodsState(prev => ({ ...prev, [methodId]: !prev[methodId] }));
    };

    const handleSaveChanges = () => {
        toast({
            title: "Configuración Guardada",
            description: "Los métodos de pago han sido actualizados.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-bold tracking-tight">Métodos de Pago</CardTitle>
                <CardDescription>
                    Activa o desactiva los métodos de pago que ofreces a tus clientes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                {method.icon}
                            </div>
                            <div>
                                <Label htmlFor={method.id} className="text-base font-semibold">{method.name}</Label>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                        </div>
                        <Switch
                            id={method.id}
                            checked={methodsState[method.id as keyof typeof methodsState]}
                            onCheckedChange={() => handleToggle(method.id as keyof typeof methodsState)}
                        />
                    </div>
                ))}

                 <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                </div>
            </CardContent>
        </Card>
    );
}
