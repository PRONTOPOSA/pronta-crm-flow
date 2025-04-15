
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Updated roles to match database-allowed values
const roles = [
  { value: 'admin', label: 'Amministratore' },
  { value: 'venditore', label: 'Venditore' },
  { value: 'operatore', label: 'Operatore' },
];

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'admin' | 'venditore' | 'operatore';
}

const AddUserDialog = ({ open, onOpenChange }: AddUserDialogProps) => {
  const queryClient = useQueryClient();
  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Generate UUID for the user
      const userId = uuidv4();
      
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          user_id: userId, 
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          ruolo: data.ruolo,
          data_creazione: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Utente aggiunto",
        description: "Il nuovo utente è stato aggiunto con successo.",
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'aggiunta dell'utente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Utente</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ruolo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruolo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona un ruolo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annulla
              </Button>
              <Button type="submit">
                Aggiungi
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
