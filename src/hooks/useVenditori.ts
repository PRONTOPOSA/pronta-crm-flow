
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { VenditoreFormData } from '@/types/venditori';
import { supabase } from "@/integrations/supabase/client";
import {
  fetchVenditori,
  checkExistingUser,
  updateUserRole,
  ensureVenditoreRecord,
  deleteVenditoreProfile
} from '@/services/venditoriService';

export const useVenditori = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: venditori = [], isLoading } = useQuery({
    queryKey: ['venditori'],
    queryFn: fetchVenditori
  });

  const createVenditore = async (formData: VenditoreFormData) => {
    try {
      console.log('Attempting to create venditore with data:', {
        email: formData.email,
        nome: formData.nome,
        cognome: formData.cognome
      });

      // Check if user already exists
      const existingUser = await checkExistingUser(formData.email);

      if (existingUser) {
        if (existingUser.ruolo === 'venditore') {
          toast({
            title: "Utente già registrato",
            description: "Un venditore con questa email è già registrato nel sistema.",
            variant: "destructive"
          });
          return;
        }

        // Update existing user to vendor role
        await updateUserRole(existingUser.id);
        // Make sure the vendor record exists in the 'venditori' table
        await ensureVenditoreRecord(existingUser.id);

        toast({
          title: "Ruolo aggiornato",
          description: "L'utente esistente è stato convertito a venditore.",
        });
      } else {
        // Create new user with a default password
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

        if (authError) throw authError;

        if (authData.user) {
          // Ensure user role is set to venditore
          await updateUserRole(authData.user.id);
          // Make sure the vendor record exists in the 'venditori' table
          await ensureVenditoreRecord(authData.user.id);
          
          console.log('Created new user and vendor record with ID:', authData.user.id);
        }

        toast({
          title: "Successo",
          description: "Venditore creato con successo",
        });
      }

      await queryClient.invalidateQueries({ queryKey: ['venditori'] });
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
      await deleteVenditoreProfile(userId);
      await queryClient.invalidateQueries({ queryKey: ['venditori'] });

      toast({
        title: "Successo",
        description: "Venditore rimosso con successo",
      });
    } catch (error: any) {
      console.error('Errore nella rimozione del venditore:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore nella rimozione del venditore",
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
