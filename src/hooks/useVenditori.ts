
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types/users';

export interface VenditoreFormData {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  telefono?: string;
}

export const useVenditori = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: venditori = [], isLoading } = useQuery({
    queryKey: ['venditori'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('ruolo', 'venditore')
        .order('data_creazione', { ascending: false });

      if (error) throw error;
      return (data || []) as User[];
    }
  });

  const createVenditore = async (formData: VenditoreFormData) => {
    try {
      // 1. Creare l'utente in auth.users
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nome: formData.nome,
            cognome: formData.cognome,
            ruolo: 'venditore',
            telefono: formData.telefono
          }
        }
      });

      if (authError) throw authError;

      // Invalida la query per ricaricare i dati
      await queryClient.invalidateQueries({ queryKey: ['venditori'] });

      return authData;
    } catch (error: any) {
      console.error('Errore nella creazione del venditore:', error);
      throw new Error(error.message || 'Errore nella creazione del venditore');
    }
  };

  const deleteVenditore = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      // Invalida la query per ricaricare i dati
      await queryClient.invalidateQueries({ queryKey: ['venditori'] });

      toast({
        title: "Successo",
        description: "Venditore eliminato con successo",
      });
    } catch (error: any) {
      console.error('Errore nell\'eliminazione del venditore:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore nell'eliminazione del venditore",
        variant: "destructive"
      });
    }
  };

  return {
    venditori,
    isLoading,
    createVenditore,
    deleteVenditore
  };
};
