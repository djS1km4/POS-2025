'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, PlusCircle, MoreHorizontal, ScanLine, Archive, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';


type Printer = {
    id: string;
    name: string;
    ip: string;
    type: string;
};

const initialPrinters: Printer[] = [
    {
        id: 'printer_1',
        name: "Cocina",
        ip: "192.168.1.100",
        type: "Térmica 80mm"
    },
    {
        id: 'printer_2',
        name: "Barra",
        ip: "192.168.1.101",
        type: "Térmica 58mm"
    }
]

export default function HardwarePage() {
    const [printers, setPrinters] = useState(initialPrinters);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingPrinter, setEditingPrinter] = useState<Printer | null>(null);
    const { toast } = useToast();

    const handleAddPrinter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPrinter: Printer = {
            id: `printer_${Date.now()}`,
            name: formData.get('name') as string,
            ip: formData.get('ip') as string,
            type: formData.get('type') as string,
        };
        setPrinters([...printers, newPrinter]);
        setIsAddDialogOpen(false);
    };

    const handleEditPrinter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingPrinter) return;

        const formData = new FormData(e.currentTarget);
        const updatedPrinter = {
            ...editingPrinter,
            name: formData.get('name') as string,
            ip: formData.get('ip') as string,
            type: formData.get('type') as string,
        };
        setPrinters(printers.map(p => p.id === updatedPrinter.id ? updatedPrinter : p));
        setEditingPrinter(null);
    };

    const handleDeletePrinter = (id: string) => {
        setPrinters(printers.filter(p => p.id !== id));
    };

    const handleOpenCashDrawer = () => {
        toast({
            title: "Abriendo Caja Registradora",
            description: "Se envió el comando para abrir la caja.",
        });
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-bold tracking-tight">Impresoras</CardTitle>
                            <CardDescription>Gestiona las impresoras para comandas y recibos.</CardDescription>
                        </div>
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Agregar Impresora
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Agregar Nueva Impresora</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddPrinter}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nombre</Label>
                                            <Input id="name" name="name" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="ip">Dirección IP</Label>
                                            <Input id="ip" name="ip" required />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Input id="type" name="type" placeholder="Ej: Térmica 80mm" required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                                        <Button type="submit">Agregar Impresora</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Dirección IP</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead><span className="sr-only">Acciones</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {printers.map((printer) => (
                                    <TableRow key={printer.id}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Printer className="h-4 w-4 text-muted-foreground" /> {printer.name}
                                        </TableCell>
                                        <TableCell>{printer.ip}</TableCell>
                                        <TableCell>{printer.type}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => setEditingPrinter(printer)}>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDeletePrinter(printer.id)}>Eliminar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="font-bold tracking-tight">Lectores de Códigos de Barras</CardTitle>
                        <CardDescription>Configura y gestiona los lectores de códigos de barras.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="scanner-timeout">Tiempo de Espera del Escáner (ms)</Label>
                            <Input id="scanner-timeout" type="number" defaultValue="50" />
                             <p className="text-sm text-muted-foreground">
                                Tiempo máximo entre pulsaciones para ser considerado una lectura de código de barras.
                            </p>
                        </div>
                        <div className="space-y-2">
                             <Label>Dispositivos Conectados</Label>
                             <div className="rounded-md border p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ScanLine className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-medium">Lector Láser Genérico</p>
                                        <p className="text-xs text-green-600">Conectado</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Probar</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="font-bold tracking-tight">Caja Registradora</CardTitle>
                        <CardDescription>Configura la apertura de la caja de dinero en efectivo.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="cash-drawer-interface">Interfaz de Conexión</Label>
                                <Select defaultValue="printer">
                                    <SelectTrigger id="cash-drawer-interface">
                                        <SelectValue placeholder="Seleccionar interfaz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="printer">Conectada a la Impresora de Recibos</SelectItem>
                                        <SelectItem value="usb">USB</SelectItem>
                                        <SelectItem value="serial">Puerto Serial (RS232)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleOpenCashDrawer}><Play className="mr-2"/> Probar Apertura de Caja</Button>
                        </div>

                         <div className="flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-8">
                             <div className="text-center">
                                <Archive className="mx-auto h-12 w-12 text-muted-foreground"/>
                                <p className="mt-2 text-sm font-medium text-muted-foreground">La caja se abrirá automáticamente al finalizar una venta en efectivo.</p>
                             </div>
                         </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!editingPrinter} onOpenChange={(isOpen) => !isOpen && setEditingPrinter(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Impresora</DialogTitle>
                    </DialogHeader>
                     <form onSubmit={handleEditPrinter}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-name">Nombre</Label>
                                <Input id="edit-name" name="name" defaultValue={editingPrinter?.name} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-ip">Dirección IP</Label>
                                <Input id="edit-ip" name="ip" defaultValue={editingPrinter?.ip} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-type">Tipo</Label>
                                <Input id="edit-type" name="type" defaultValue={editingPrinter?.type} required />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setEditingPrinter(null)}>Cancelar</Button>
                            <Button type="submit">Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
