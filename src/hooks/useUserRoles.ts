
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@/types/users';

export const useUserRoles = (isAdmin: boolean) => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editingRoles, setEditingRoles] = useState<Record<string, 'admin' | 'operatore' | 'venditore'>>({});

  // Log quando isAdmin cambia
  useEffect(() => {
    console.log("useUserRoles - isAdmin:", isAdmin, typeof isAdmin);
  }, [isAdmin]);

  const handleEditStart = (user: User) => {
    console.log('Starting edit for user:', user);
    console.log('Current isAdmin status:', isAdmin);
    
    if (!isAdmin) {
      console.log('Edit not allowed: user is not admin');
      toast({
        title: "Accesso negato",
        description: "Solo gli amministratori possono modificare i ruoli degli utenti.",
        variant: "destructive"
      });
      return;
    }
    
    setEditingUser(user.id);
    setEditingRoles(prev => ({
      ...prev,
      [user.id]: user.ruolo
    }));
  };

  const handleRoleChange = (userId: string, role: 'admin' | 'operatore' | 'venditore') => {
    console.log(`Changing role for user ${userId} to ${role}`);
    setEditingRoles(prev => ({
      ...prev,
      [userId]: role
    }));
  };

  const handleRoleUpdate = async (userId: string) => {
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
    if (!newRole) {
      toast({
        title: "Errore",
        description: "Ruolo non selezionato.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ruolo: newRole })
        .eq('id', userId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "Ruolo aggiornato",
        description: "Il ruolo dell'utente è stato aggiornato con successo.",
      });
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

  return {
    editingUser,
    editingRoles,
    handleEditStart,
    handleRoleChange,
    handleRoleUpdate,
    setEditingUser
  };
};
