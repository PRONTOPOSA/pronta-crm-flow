
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from './useUserRoles';
import type { User } from '@/types/users';
import { useState, useEffect } from 'react';

export const useUserManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [localIsAdmin, setLocalIsAdmin] = useState<boolean>(false);
  
  const { data: currentUserProfile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['currentUserProfile', user?.id],
    queryFn: async () => {
      console.log('Fetching current user profile');
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching current user profile:', error);
        throw error;
      }
      console.log('Current user profile:', data);
      return data as User;
    },
    enabled: !!user?.id
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log('Fetching users');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('data_creazione', { ascending: false });
      
      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      console.log('Fetched users:', data);
      return data as User[];
    }
  });

  // Aggiorna localIsAdmin quando il profilo utente cambia
  useEffect(() => {
    if (currentUserProfile) {
      setLocalIsAdmin(currentUserProfile.ruolo === 'admin');
    }
  }, [currentUserProfile]);

  // Usa lo stato locale per isAdmin
  const isAdmin = localIsAdmin;

  const roleManagement = useUserRoles(isAdmin);

  const handleDeleteUser = async (userId: string) => {
    console.log(`Attempting to delete user ${userId}. Admin status: ${isAdmin}`);

    if (!isAdmin) {
      toast({
        title: "Accesso negato",
        description: "Solo gli amministratori possono eliminare gli utenti.",
        variant: "destructive"
      });
      return;
    }

    try {
      // First check if this user has a venditore record that needs to be deleted
      const { data: venditoreData } = await supabase
        .from('venditori')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (venditoreData) {
        // If user is a venditore, delete their record from the venditori table first
        const { error: deleteVenditoreError } = await supabase
          .from('venditori')
          .delete()
          .eq('user_id', userId);
          
        if (deleteVenditoreError) throw deleteVenditoreError;
        console.log('Deleted venditore record for user:', userId);
      }

      // Now delete the user profile
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      console.log('Successfully deleted user profile:', userId);
      
      toast({
        title: "Utente eliminato",
        description: "L'utente è stato eliminato con successo.",
      });

      // Immediately invalidate relevant queries to update the UI
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users'] }),
        queryClient.invalidateQueries({ queryKey: ['venditori'] })
      ]);

    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore durante l'eliminazione dell'utente",
        variant: "destructive"
      });
    }
  };

  const promoteToAdmin = async () => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ruolo: 'admin' })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Immediatamente aggiorna lo stato locale
      setLocalIsAdmin(true);
      
      // Forza l'aggiornamento delle query
      await queryClient.invalidateQueries({ queryKey: ['currentUserProfile', user.id] });
      await queryClient.invalidateQueries({ queryKey: ['users'] });

      // Ricarica immediatamente i dati dell'utente corrente
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (data) {
        console.log('User profile after promotion:', data);
        // Aggiorna la cache manualmente
        queryClient.setQueryData(['currentUserProfile', user.id], data);
      }
      
      toast({
        title: "Ruolo aggiornato",
        description: "Sei stato promosso ad amministratore.",
      });
    } catch (error: any) {
      console.error('Error promoting to admin:', error);
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return {
    users: users || [],
    isLoading: isProfileLoading || isUsersLoading,
    isAdmin,
    currentUserProfile,
    handleDeleteUser,
    promoteToAdmin,
    ...roleManagement
  };
};

