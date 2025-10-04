'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";

export function AiTrainingTab() {
    const { toast } = useToast();

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send the data to a backend to update the AI model's prompt/configuration.
        toast({
            title: "Configuración Guardada",
            description: "El asistente de IA ha sido actualizado con la nueva información.",
        });
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-3">
                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="font-bold tracking-tight">Entrenamiento del Asistente de IA</CardTitle>
                        <CardDescription>Nutre a la IA con información específica de tu negocio y personaliza su comportamiento.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <form onSubmit={handleSaveChanges} className="space-y-6">
                    <div>
                        <Label htmlFor="business-context" className="text-lg font-semibold">Contexto del Negocio</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Describe tu negocio. Incluye la historia, tipo de comida, horarios, dirección, promociones actuales, etc. Esta información será el "cerebro" de la IA.
                        </p>
                        <Textarea
                            id="business-context"
                            placeholder="Ej: Somos un restaurante familiar de comida colombiana fundado en 1990. Nuestro plato estrella es la Bandeja Paisa. Abrimos de 8am a 10pm. Este mes tenemos 2x1 en jugos naturales..."
                            className="min-h-[150px]"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Personalización de la Conversación</h3>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="greeting">Saludo Inicial</Label>
                                <Textarea id="greeting" placeholder="¡Hola! Soy el asistente virtual de [Nombre del Negocio]. ¿Te gustaría hacer un nuevo pedido o consultar el estado de uno existente?" />
                            </div>
                            <div>
                                <Label htmlFor="faq">Respuestas a Preguntas Frecuentes (FAQ)</Label>
                                <Textarea id="faq" placeholder="Pregunta: ¿Tienen opciones vegetarianas? Respuesta: ¡Claro! Nuestra Arepa de Huevo puede prepararse con champiñones en vez de carne." className="min-h-[100px]" />
                            </div>
                            <div>
                                <Label htmlFor="farewell">Despedida Estándar</Label>
                                <Textarea id="farewell" placeholder="¡Gracias por preferirnos! Tu pedido está en marcha. ¡Buen provecho!" />
                            </div>
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <Button type="submit">Guardar Cambios en IA</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
