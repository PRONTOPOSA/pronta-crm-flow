
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import type { VenditoreFormData } from '@/hooks/useVenditori';

const venditoreSchema = z.object({
  nome: z.string().min(2, { message: 'Il nome deve avere almeno 2 caratteri' }),
  cognome: z.string().min(2, { message: 'Il cognome deve avere almeno 2 caratteri' }),
  email: z.string().email({ message: 'Email non valida' }),
  password: z.string().min(6, { message: 'La password deve avere almeno 6 caratteri' }),
  telefono: z.string().optional()
});

type VenditoreFormProps = {
  onSubmit: (data: VenditoreFormData) => Promise<void>;
  onCancel: () => void;
};

export const VenditoreForm = ({ onSubmit, onCancel }: VenditoreFormProps) => {
  const form = useForm<z.infer<typeof venditoreSchema>>({
    resolver: zodResolver(venditoreSchema),
    defaultValues: {
      nome: '',
      cognome: '',
      email: '',
      password: '',
      telefono: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cognome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Cognome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input placeholder="Telefono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Annulla
          </Button>
          <Button type="submit">
            Crea
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
