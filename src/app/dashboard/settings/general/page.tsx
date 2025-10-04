'use client';
import { useContext, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon, Square, Circle, RectangleHorizontal } from "lucide-react";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { BusinessContext } from '@/context/business-context';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import type { LogoShape } from '@/context/business-context';


export default function GeneralSettingsPage() {
    const { toast } = useToast();
    const context = useContext(BusinessContext);
    
    if (!context) {
        throw new Error("BusinessContext must be used within a BusinessProvider");
    }

    const { businessInfo, setBusinessInfo } = context;
    const [logoZoom, setLogoZoom] = useState(businessInfo.logoZoom || 1);
    const [logoShape, setLogoShape] = useState<LogoShape>(businessInfo.logoShape || 'square');
    const [logoSize, setLogoSize] = useState(businessInfo.logoSize || 24);
    const [headlineFontSize, setHeadlineFontSize] = useState(businessInfo.headlineFontSize || 20);


     useEffect(() => {
        setLogoZoom(businessInfo.logoZoom || 1);
        setLogoShape(businessInfo.logoShape || 'square');
        setLogoSize(businessInfo.logoSize || 24);
        setHeadlineFontSize(businessInfo.headlineFontSize || 20);
    }, [businessInfo.logoZoom, businessInfo.logoShape, businessInfo.logoSize, businessInfo.headlineFontSize]);


    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setBusinessInfo({ ...businessInfo, logo: reader.result as string, logoZoom: 1 });
                setLogoZoom(1);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveChanges = () => {
        const nameInput = document.getElementById('business-name') as HTMLInputElement;
        const addressInput = document.getElementById('address') as HTMLInputElement;
        
        setBusinessInfo({
            ...businessInfo,
            name: nameInput.value,
            address: addressInput.value,
            logoZoom: logoZoom,
            logoShape: logoShape,
            logoSize: logoSize,
            headlineFontSize: headlineFontSize,
        });

        toast({
            title: "¡Éxito!",
            description: "La información del negocio ha sido guardada.",
        });
    }

    const handleSaveRegionalChanges = () => {
        toast({
            title: "¡Éxito!",
            description: "La configuración regional ha sido guardada.",
        });
    }

    const logoShapeClasses: Record<LogoShape, string> = {
        square: 'rounded-none',
        rounded: 'rounded-md',
        circle: 'rounded-full',
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="font-bold tracking-tight">Información del Negocio</CardTitle>
                    <CardDescription>Actualiza los datos de tu empresa.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="business-name">Nombre del Negocio</Label>
                        <Input id="business-name" defaultValue={businessInfo.name} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="headline-font-size">Tamaño de la Fuente del Nombre ({headlineFontSize}px)</Label>
                        <Slider
                            id="headline-font-size"
                            min={14}
                            max={32}
                            step={1}
                            value={[headlineFontSize]}
                            onValueChange={(value) => setHeadlineFontSize(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" defaultValue={businessInfo.address} />
                    </div>
                    <div className="space-y-2">
                        <Label>Logo</Label>
                         <div className="flex items-center gap-4">
                            <div className={cn(
                                "flex h-24 w-24 items-center justify-center border bg-muted overflow-hidden",
                                logoShapeClasses[logoShape]
                            )}>
                                {businessInfo.logo ? (
                                    <Image 
                                      src={businessInfo.logo} 
                                      alt="Logo del negocio" 
                                      width={96} 
                                      height={96} 
                                      className="object-cover w-full h-full"
                                      style={{ transform: `scale(${logoZoom})` }}
                                    />
                                ) : (
                                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                )}
                            </div>
                            <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>Subir Logo</Button>
                        </div>
                         <input
                            type="file"
                            id="logo-upload"
                            onChange={handleLogoUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>Forma del Logo</Label>
                        <RadioGroup
                            value={logoShape}
                            onValueChange={(value: LogoShape) => setLogoShape(value)}
                            className="grid grid-cols-3 gap-4"
                        >
                            <Label htmlFor="shape-square" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <RadioGroupItem value="square" id="shape-square" className="peer sr-only" />
                                <Square className="mb-2 h-6 w-6"/>
                                Cuadrado
                            </Label>
                            <Label htmlFor="shape-rounded" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <RadioGroupItem value="rounded" id="shape-rounded" className="peer sr-only" />
                                <RectangleHorizontal className="mb-2 h-6 w-6"/>
                                Redondeado
                            </Label>
                            <Label htmlFor="shape-circle" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                <RadioGroupItem value="circle" id="shape-circle" className="peer sr-only" />
                                <Circle className="mb-2 h-6 w-6"/>
                                Circular
                            </Label>
                        </RadioGroup>
                    </div>
                    {businessInfo.logo && (
                        <div className="space-y-4 pt-2">
                           <div className="space-y-2">
                                <Label htmlFor="logo-size">Tamaño del Contenedor del Logo ({logoSize}px)</Label>
                                <Slider
                                    id="logo-size"
                                    min={20}
                                    max={62}
                                    step={1}
                                    value={[logoSize]}
                                    onValueChange={(value) => setLogoSize(value[0])}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="logo-zoom">Zoom del Logo</Label>
                                <Slider
                                    id="logo-zoom"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={[logoZoom]}
                                    onValueChange={(value) => setLogoZoom(value[0])}
                                />
                            </div>
                        </div>
                    )}
                     <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-bold tracking-tight">Configuración Regional</CardTitle>
                    <CardDescription>Define el idioma, la moneda y la zona horaria para tu negocio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="language">Idioma</Label>
                        <Select defaultValue="es">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">Inglés</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">Moneda</Label>
                        <Select defaultValue="COP">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                                <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Zona Horaria</Label>
                        <Select defaultValue="America/Bogota">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="America/Bogota">Bogotá, Lima, Quito (GMT-5)</SelectItem>
                                <SelectItem value="America/New_York">Hora del Este (GMT-4)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleSaveRegionalChanges}>Guardar Cambios</Button>
                </CardContent>
            </Card>
        </div>
    );
}
