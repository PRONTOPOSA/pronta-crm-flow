
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
      // Controllo se l'utente esiste già
      const { data: existingUser, error: searchError } = await supabase
        .from('profiles')
        .select('id, email, ruolo')
        .eq('email', formData.email)
        .maybeSingle();

      if (searchError) {
        console.error('Errore nella ricerca utente:', searchError);
        throw searchError;
      }

      if (existingUser) {
        console.log('Utente esistente trovato:', existingUser);
        
        if (existingUser.ruolo === 'venditore') {
          toast({
            title: "Utente già registrato",
            description: "Un venditore con questa email è già registrato nel sistema.",
            variant: "destructive"
          });
          return;
        }

        // Aggiorna il ruolo dell'utente esistente a venditore
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ ruolo: 'venditore' })
          .eq('id', existingUser.id);

        if (updateError) {
          console.error('Errore nell\'aggiornamento del ruolo:', updateError);
          throw updateError;
        }

        toast({
          title: "Ruolo aggiornato",
          description: "L'utente esistente è stato convertito a venditore.",
        });

        await queryClient.invalidateQueries({ queryKey: ['venditori'] });
        return;
      }

      console.log('Creazione nuovo utente con dati:', {
        email: formData.email,
        password: '[HIDDEN]',
        nome: formData.nome,
        cognome: formData.cognome
      });

      // Creazione nuovo utente
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nome: formData.nome,
            cognome: formData.cognome,
            ruolo: 'venditore'
          }
        }
      });

      if (authError) {
        console.error('Errore nella creazione utente:', authError);
        throw authError;
      }

      console.log('Utente creato con successo:', authData);

      // Assicuriamoci che il profilo sia stato creato correttamente
      if (authData.user) {
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

        // Verifichiamo che il record nella tabella venditori esista
        const { data: venditoreEsistente, error: checkError } = await supabase
          .from('venditori')
          .select('id')
          .eq('user_id', authData.user.id)
          .maybeSingle();

        if (checkError) {
          console.error('Errore nel controllo venditore:', checkError);
          // Non blocchiamo il flusso per questo errore
        }

        // Se il venditore non esiste nella tabella venditori, crealo
        if (!venditoreEsistente) {
          const { error: insertError } = await supabase
            .from('venditori')
            .insert({ user_id: authData.user.id });

          if (insertError) {
            console.error('Errore nell\'inserimento venditore:', insertError);
            // Non blocchiamo il flusso per questo errore
          }
        }
      }

      toast({
        title: "Successo",
        description: "Venditore creato con successo",
      });

      await queryClient.invalidateQueries({ queryKey: ['venditori'] });

      return authData;
    } catch (error: any) {
      console.error('Errore nella creazione del venditore:', error);
      
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
      
      throw error;
    }
  };

  const deleteVenditore = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

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
