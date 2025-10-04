'use client';

import React, { useEffect, useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getReorderSuggestions } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { products } from '@/lib/placeholder-data';
import type { InventoryReorderOutput } from '@/ai/flows/inventory-reorder-suggestions';

type InitialState = {
  message: string;
  data: InventoryReorderOutput | null;
}

const initialState: InitialState = {
  message: '',
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />} 
      Obtener Sugerencias
    </Button>
  );
}

export function ReorderForm() {
  const [state, formAction] = useActionState(getReorderSuggestions, initialState);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [salesHistory, setSalesHistory] = useState('Generating sales history...');
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    // This will only run on the client, after initial hydration
    const history = products.map(p => `${p.name}: sold approx. ${Math.floor(Math.random() * 50) + 10} last month.`).join('\n');
    setSalesHistory(history);
  }, []);

  useEffect(() => {
    if (state.message === 'success' && state.data) {
      setShowSuccess(true);
    } else if (state.message && state.message !== 'Invalid form data. Please fill out all fields.' && state.message !== 'Generating sales history...') {
      setShowSuccess(false);
      toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
      });
    }
  }, [state, toast]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
        setShowSuccess(false);
        formRef.current?.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="mr-2 h-4 w-4" /> Sugerencias de IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form action={formAction} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Sugerencias Inteligentes de Reposición</DialogTitle>
            <DialogDescription>
              Deja que la IA analice tus datos para sugerir cantidades óptimas de reposición. Proporciona contexto adicional a continuación.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <input type="hidden" name="salesHistory" value={salesHistory} />
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="seasonality">Estacionalidad y Eventos</Label>
              <Textarea
                id="seasonality"
                name="seasonality"
                placeholder="Ej: Próxima temporada de vacaciones, festival local el próximo mes, se espera mayor afluencia de público los fines de semana."
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="promotions">Promociones y Marketing</Label>
              <Textarea
                id="promotions"
                name="promotions"
                placeholder="Ej: Promoción 2x1 en café la próxima semana, aparición en un blog de comida local."
                required
              />
            </div>
          </div>

          {showSuccess && state.data && state.data.reorderSuggestions && (
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>Recomendación de IA</AlertTitle>
              <AlertDescription>
                <div className='prose prose-sm dark:prose-invert max-w-full'>
                    <p className='font-semibold'>Sugerencias:</p>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{state.data.reorderSuggestions}</pre>
                    <p className='font-semibold mt-2'>Justificación:</p>
                    <p>{state.data.rationale}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter className='mt-4'>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
