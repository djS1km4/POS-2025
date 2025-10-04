'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type DialogProps } from "@radix-ui/react-dialog";

type IntegrationId = 'rappi' | 'didifood' | 'ubereats' | null;

interface DeliveryIntegrationDialogProps extends DialogProps {
    integrationId: IntegrationId;
}

const integrationConfig = {
    rappi: {
        title: "Configurar Rappi",
        description: "Ingresa tus credenciales de la API de Rappi para conectar tu tienda.",
        fields: [
            { id: "rappi-client-id", name: "Client ID", type: "text", placeholder: "Ej: 12345" },
            { id: "rappi-client-secret", name: "Client Secret", type: "password", placeholder: "••••••••••••" },
        ],
    },
    didifood: {
        title: "Configurar Didi Food",
        description: "Ingresa tus credenciales de la API de Didi Food para empezar.",
        fields: [
            { id: "didi-app-id", name: "App ID", type: "text", placeholder: "Ej: 5a6b7c8d" },
            { id: "didi-app-secret", name: "App Secret", type: "password", placeholder: "••••••••••••" },
            { id: "didi-shop-id", name: "Shop ID", type: "text", placeholder: "Ej: 98765" },
        ],
    },
    ubereats: {
        title: "Configurar Uber Eats",
        description: "Ingresa la información de tu API de Uber Eats.",
        fields: [
            { id: "uber-client-id", name: "Client ID", type: "text", placeholder: "ID de cliente de Uber" },
            { id: "uber-client-secret", name: "Client Secret", type: "password", placeholder: "••••••••••••" },
            { id: "uber-store-id", name: "Store ID", type: "text", placeholder: "ID de tu tienda en Uber Eats" },
        ],
    },
};

export function DeliveryIntegrationDialog({ integrationId, ...props }: DeliveryIntegrationDialogProps) {
    const { toast } = useToast();

    if (!integrationId) return null;

    const config = integrationConfig[integrationId];
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the form data
        console.log(`Saving configuration for ${config.title}`);
        toast({
            title: `¡Integración con ${config.title.split(' ')[1]} guardada!`,
            description: "La configuración se ha guardado correctamente.",
        });
        props.onOpenChange?.(false);
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{config.title}</DialogTitle>
                        <DialogDescription>
                            {config.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {config.fields.map(field => (
                            <div key={field.id} className="grid gap-2">
                                <Label htmlFor={field.id}>{field.name}</Label>
                                <Input id={field.id} type={field.type} placeholder={field.placeholder} />
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => props.onOpenChange?.(false)}>Cancelar</Button>
                        <Button type="submit">Guardar Configuración</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
