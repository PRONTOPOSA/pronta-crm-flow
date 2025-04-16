
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from './useUserRoles';
import type { User } from '@/types/users';

export const useUserManagement = () => {
  const { user } = useAuth();
  
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

  // Esplicitamente imposta isAdmin come booleano
  const isAdmin = currentUserProfile?.ruolo === 'admin' ? true : false;
  console.log('Current user is admin:', isAdmin, typeof isAdmin);
  
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
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Utente eliminato",
        description: "L'utente è stato eliminato con successo.",
      });

    } catch (error: any) {
      console.error('Error deleting user:', error);
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
    handleDeleteUser,
    ...roleManagement
  };
};
