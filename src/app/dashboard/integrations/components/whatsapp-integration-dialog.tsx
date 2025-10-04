'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";

export function WhatsAppIntegrationDialog(props: DialogProps) {
    const { toast } = useToast();
    // In a real app, this would come from your backend configuration
    const webhookUrl = "https://your-app-domain.com/api/whatsapp/webhook";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: `¡Integración con WhatsApp guardada!`,
            description: "La configuración se ha guardado correctamente.",
        });
        props.onOpenChange?.(false);
    }
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(webhookUrl);
        toast({
            title: '¡Copiado!',
            description: 'La URL del webhook se ha copiado al portapapeles.',
        });
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Configurar WhatsApp Business API</DialogTitle>
                        <DialogDescription>
                            Conecta tu cuenta para empezar a recibir pedidos a través de WhatsApp.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="wa-phone-id">ID del Número de Teléfono</Label>
                            <Input id="wa-phone-id" type="text" placeholder="Ej: 1065...9718" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="wa-api-token">Token de Acceso de la API</Label>
                            <Input id="wa-api-token" type="password" placeholder="••••••••••••••••••••••••••••••••••" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="wa-webhook-url">URL del Webhook</Label>
                             <div className="flex items-center space-x-2">
                                <Input id="wa-webhook-url" type="text" readOnly value={webhookUrl} />
                                <Button type="button" variant="outline" size="icon" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Copia esta URL y pégala en la configuración de webhooks de tu aplicación de Meta.
                            </p>
                        </div>
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
