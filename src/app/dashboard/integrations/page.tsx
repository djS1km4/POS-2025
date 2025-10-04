'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { MessageCircle, BarChart, ExternalLink, UtensilsCrossed } from "lucide-react";
import { Button } from '@/components/ui/button';
import { DeliveryIntegrationDialog } from './components/delivery-integration-dialog';
import { AnalyticsIntegrationDialog } from './components/analytics-integration-dialog';
import { WhatsAppIntegrationDialog } from './components/whatsapp-integration-dialog';

const deliveryIntegrations = [
    {
        id: "rappi" as const,
        name: "Rappi",
        description: "Sincroniza tu menú y recibe pedidos directamente desde Rappi.",
        logo: <UtensilsCrossed className="h-6 w-6 text-red-500" />,
        docUrl: "https://devs.rappi.com/docs"
    },
    {
        id: "didifood" as const,
        name: "Didi Food",
        description: "Conecta tu cuenta de Didi Food para gestionar pedidos sin problemas.",
        logo: <UtensilsCrossed className="h-6 w-6 text-orange-500" />,
        docUrl: "https://out.didi-food.com/docs/api"
    },
    {
        id: "ubereats" as const,
        name: "Uber Eats",
        description: "Intégrate con Uber Eats para el procesamiento automatizado de pedidos.",
        logo: <UtensilsCrossed className="h-6 w-6 text-green-500" />,
        docUrl: "https://developer.uber.com/docs/eats"
    }
];

type DeliveryIntegrationId = typeof deliveryIntegrations[number]['id'];

const otherIntegrations = [
    {
        id: "whatsapp" as const,
        name: "WhatsApp AI Agent",
        description: "Activa el asistente IA para tomar pedidos a través de WhatsApp.",
        logo: <MessageCircle className="h-6 w-6 text-green-500" />,
        docUrl: "https://developers.facebook.com/docs/whatsapp/cloud-api"
    },
    {
        id: "analytics" as const,
        name: "Google Analytics",
        description: "Conecta Google Analytics para obtener información sobre los visitantes.",
        logo: <BarChart className="h-6 w-6 text-blue-500" />,
        docUrl: "https://developers.google.com/analytics/devguides/collection/ga4"
    },
]

export default function IntegrationsPage() {
    const [openDialog, setOpenDialog] = useState<DeliveryIntegrationId | null>(null);
    const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
    const [isWhatsAppOpen, setWhatsAppOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Integraciones de Plataformas de Delivery</h1>
                    <p className="text-muted-foreground">Conecta tus cuentas para optimizar tus operaciones de entrega.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {deliveryIntegrations.map((integration) => (
                        <Card key={integration.name} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{integration.logo}</div>
                                    <div>
                                        <CardTitle className="font-semibold">{integration.name}</CardTitle>
                                    </div>
                                </div>
                                <Switch />
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription>{integration.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={integration.docUrl} target="_blank">
                                        Documentación <ExternalLink className="ml-2 h-3 w-3"/>
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setOpenDialog(integration.id)}>Configurar</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Otras Integraciones</h2>
                    <p className="text-muted-foreground">Conecta herramientas adicionales para potenciar tu negocio.</p>
                </div>
                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {otherIntegrations.map((integration) => (
                        <Card key={integration.name} className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="flex items-center gap-4">
                                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{integration.logo}</div>
                                    <div>
                                        <CardTitle className="font-semibold">{integration.name}</CardTitle>
                                    </div>
                                </div>
                                <Switch defaultChecked={integration.id === 'whatsapp'}/>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <CardDescription>{integration.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={integration.docUrl} target="_blank">
                                        Documentación <ExternalLink className="ml-2 h-3 w-3"/>
                                    </Link>
                                </Button>
                                 <Button variant="outline" size="sm" onClick={() => {
                                    if (integration.id === 'analytics') setAnalyticsOpen(true);
                                    if (integration.id === 'whatsapp') setWhatsAppOpen(true);
                                }}>Configurar</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <DeliveryIntegrationDialog
                integrationId={openDialog}
                open={!!openDialog}
                onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
            />
            <AnalyticsIntegrationDialog
                open={isAnalyticsOpen}
                onOpenChange={setAnalyticsOpen}
            />
            <WhatsAppIntegrationDialog
                open={isWhatsAppOpen}
                onOpenChange={setWhatsAppOpen}
            />
        </>
    )
}
