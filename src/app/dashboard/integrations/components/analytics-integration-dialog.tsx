'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { type DialogProps } from "@radix-ui/react-dialog";

export function AnalyticsIntegrationDialog(props: DialogProps) {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the form data
        toast({
            title: `¡Integración con Google Analytics guardada!`,
            description: "La configuración se ha guardado correctamente.",
        });
        props.onOpenChange?.(false);
    }

    return (
        <Dialog {...props}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Configurar Google Analytics</DialogTitle>
                        <DialogDescription>
                            Ingresa tu ID de Medición y elige qué eventos rastrear.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="ga-measurement-id">Measurement ID</Label>
                            <Input id="ga-measurement-id" type="text" placeholder="G-XXXXXXXXXX" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium">Configuración de Eventos</h4>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor="track-sales" className="flex flex-col gap-1">
                                    <span>Seguimiento de Ventas</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Envía un evento 'purchase' cuando se completa una venta.
                                    </span>
                                </Label>
                                <Switch id="track-sales" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor="track-product-views" className="flex flex-col gap-1">
                                    <span>Vistas de Producto</span>
                                     <span className="font-normal leading-snug text-muted-foreground">
                                        Envía un evento 'view_item' al ver un producto.
                                    </span>
                                </Label>
                                <Switch id="track-product-views" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-3">
                                <Label htmlFor="track-add-to-cart" className="flex flex-col gap-1">
                                    <span>Añadir al Carrito</span>
                                     <span className="font-normal leading-snug text-muted-foreground">
                                        Envía un evento 'add_to_cart' al añadir un producto.
                                    </span>
                                </Label>
                                <Switch id="track-add-to-cart" />
                            </div>
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
