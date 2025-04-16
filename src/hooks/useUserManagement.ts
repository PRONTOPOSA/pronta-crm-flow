
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'admin' | 'operatore';
  data_creazione: string;
}

export const useUserManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editingRoles, setEditingRoles] = useState<Record<string, 'admin' | 'operatore'>>({});

  const { data: currentUserProfile } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      console.log('Fetching current user profile');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) {
        console.error('Error fetching current user profile:', error);
        throw error;
      }
      console.log('Current user profile:', data);
      return data as User;
    }
  });

  const { data: users, isLoading } = useQuery({
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

  const handleEditStart = (user: User) => {
    console.log('Starting edit for user:', user);
    setEditingUser(user.id);
    setEditingRoles(prev => ({
      ...prev,
      [user.id]: user.ruolo
    }));
  };

  const handleRoleChange = (userId: string, role: 'admin' | 'operatore') => {
    console.log(`Changing role for user ${userId} to ${role}`);
    setEditingRoles(prev => ({
      ...prev,
      [userId]: role
    }));
  };

  const handleRoleUpdate = async (userId: string) => {
    const isAdmin = currentUserProfile?.ruolo === 'admin';
    console.log(`Attempting to update role for user ${userId}. Admin status: ${isAdmin}`);

    if (!isAdmin) {
      toast({
        title: "Accesso negato",
        description: "Solo gli amministratori possono modificare i ruoli degli utenti.",
        variant: "destructive"
      });
      return;
    }

    const newRole = editingRoles[userId];
    console.log(`New role for user ${userId}: ${newRole}`);

    if (!newRole) {
      toast({
        title: "Errore",
        description: "Ruolo non selezionato.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log(`Updating role in database for user ${userId} to ${newRole}`);
      const { error } = await supabase
        .from('profiles')
        .update({ ruolo: newRole })
        .eq('id', userId);

      if (error) throw error;

      // Update the local users array to reflect the change immediately
      if (users) {
        const updatedUsers = users.map(u => 
          u.id === userId ? { ...u, ruolo: newRole } : u
        );
        queryClient.setQueryData(['users'], updatedUsers);
        console.log('Updated users array:', updatedUsers);
      }

      toast({
        title: "Ruolo aggiornato",
        description: "Il ruolo dell'utente è stato aggiornato con successo.",
      });

      // Refresh the data from the server
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUser(null);
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const isAdmin = currentUserProfile?.ruolo === 'admin';
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

      // Update the local users array to reflect the deletion immediately
      if (users) {
        const updatedUsers = users.filter(u => u.id !== userId);
        queryClient.setQueryData(['users'], updatedUsers);
      }

      toast({
        title: "Utente eliminato",
        description: "L'utente è stato eliminato con successo.",
      });

      // Refresh the data from the server
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
    users,
    isLoading,
    editingUser,
    editingRoles,
    isAdmin: currentUserProfile?.ruolo === 'admin',
    handleEditStart,
    handleRoleChange,
    handleRoleUpdate,
    handleDeleteUser,
    setEditingUser
  };
};

export type { User };
