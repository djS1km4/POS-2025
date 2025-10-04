'use client';

import { useTheme } from '@/context/theme-context';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const colorThemes = [
    { name: 'default', label: 'Predeterminado', color: 'hsl(330, 60%, 35%)' },
    { name: 'gold', label: 'Dorado', color: 'hsl(35, 92%, 55%)' },
    { name: 'emerald', label: 'Esmeralda', color: 'hsl(142, 71%, 45%)' },
    { name: 'cobalt', label: 'Cobalto', color: 'hsl(215, 91%, 65%)' },
    { name: 'ruby', label: 'Rubí', color: 'hsl(350, 82%, 55%)' },
] as const;

type ColorThemeName = typeof colorThemes[number]['name'];

export default function AppearancePage() {
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold tracking-tight">Apariencia</CardTitle>
          <CardDescription>Personaliza la apariencia de la aplicación. Cambia entre el modo claro y oscuro, y elige tu tema de color.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Modo de Interfaz</Label>
            <RadioGroup
              value={theme}
              onValueChange={(value: 'light' | 'dark') => setTheme(value)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="w-full text-center py-2 bg-gray-100 text-gray-800 rounded-md">Modo Claro</div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                   <div className="w-full text-center py-2 bg-gray-900 text-gray-200 rounded-md">Modo Oscuro</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Tema de Color</Label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {colorThemes.map((ct) => (
                <div key={ct.name}>
                  <button
                    onClick={() => setColorTheme(ct.name as ColorThemeName)}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-md border-2 p-3 w-full',
                      colorTheme === ct.name ? 'border-primary' : 'border-muted'
                    )}
                  >
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: ct.color }}
                    >
                      {colorTheme === ct.name && <Check className="h-5 w-5 text-white" />}
                    </div>
                    <span className="mt-2 text-xs font-medium">{ct.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

           <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                    <SelectTrigger className="w-[280px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">Inglés (English)</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                    Selecciona el idioma de la interfaz.
                </p>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
