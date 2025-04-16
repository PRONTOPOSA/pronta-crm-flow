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
      // Prima verifichiamo se l'utente esiste già
      const { data: existingUser, error: searchError } = await supabase
        .from('profiles')
        .select('id, email, ruolo')  // Include 'ruolo' in the query
        .eq('email', formData.email)
        .single();

      if (searchError && !searchError.message.includes('No rows found')) {
        // Se c'è un errore diverso da "No rows found", lo gestiamo
        throw searchError;
      }

      if (existingUser) {
        // Utente già esistente, verifichiamo se è già un venditore
        if (existingUser.ruolo === 'venditore') {
          toast({
            title: "Utente già registrato",
            description: "Un venditore con questa email è già registrato nel sistema.",
            variant: "destructive"
          });
          return;
        }

        // Aggiorniamo il ruolo dell'utente esistente a venditore
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ ruolo: 'venditore' })
          .eq('email', formData.email);

        if (updateError) throw updateError;

        toast({
          title: "Ruolo aggiornato",
          description: "L'utente esistente è stato convertito a venditore.",
        });

        // Invalida la query per ricaricare i dati
        await queryClient.invalidateQueries({ queryKey: ['venditori'] });
        return;
      }

      // Se l'utente non esiste, procediamo con la creazione
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nome: formData.nome,
            cognome: formData.cognome,
            ruolo: 'venditore',
            telefono: formData.telefono || null
          }
        }
      });

      if (authError) throw authError;

      // Verifica che l'utente sia stato creato e aggiorna esplicitamente il profilo
      if (authData.user) {
        // Prima aggiungiamo la colonna telefono se non esiste
        try {
          // Nota: questo è un controllo per vedere se la colonna telefono esiste già
          const { error: columnCheckError } = await supabase
            .from('profiles')
            .select('telefono')
            .limit(1);

          // Se c'è un errore nel selezionare la colonna telefono, probabilmente non esiste
          if (columnCheckError && columnCheckError.message.includes('column "telefono" does not exist')) {
            console.log('La colonna telefono non esiste. Utilizziamo solo i campi esistenti.');
            
            // Aggiorniamo solo i campi che sappiamo esistere
            const { error: profileError } = await supabase
              .from('profiles')
              .update({ 
                ruolo: 'venditore',
                nome: formData.nome,
                cognome: formData.cognome
              })
              .eq('id', authData.user.id);
            
            if (profileError) {
              console.error('Errore nell\'aggiornamento del profilo:', profileError);
              throw profileError;
            }
          } else {
            // La colonna telefono esiste, aggiorniamo tutti i campi
            const { error: profileError } = await supabase
              .from('profiles')
              .update({ 
                ruolo: 'venditore',
                nome: formData.nome,
                cognome: formData.cognome,
                telefono: formData.telefono || null
              })
              .eq('id', authData.user.id);
            
            if (profileError) {
              console.error('Errore nell\'aggiornamento del profilo:', profileError);
              throw profileError;
            }
          }
        } catch (error) {
          console.error('Errore nel controllo o aggiornamento del profilo:', error);
          throw error;
        }
      }

      // Visualizza messaggio di successo
      toast({
        title: "Successo",
        description: "Venditore creato con successo",
      });

      // Invalida la query per ricaricare i dati
      await queryClient.invalidateQueries({ queryKey: ['venditori'] });

      return authData;
    } catch (error: any) {
      console.error('Errore nella creazione del venditore:', error);
      
      // Gestione specifica per l'errore "User already registered"
      if (error.message === "User already registered" || error.code === "user_already_exists") {
        toast({
          title: "Utente già registrato",
          description: "Un utente con questa email è già registrato. Contattare l'amministratore per aggiornare il ruolo.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Errore",
          description: error.message || 'Errore nella creazione del venditore',
          variant: "destructive"
        });
      }
      
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
