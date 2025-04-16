import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const UserTable = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'operatore'>('operatore');

  const { data: currentUserProfile } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data as User;
    }
  });

  const isAdmin = currentUserProfile?.ruolo === 'admin';

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('data_creazione', { ascending: false });
      
      if (error) throw error;
      return data as User[];
    }
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleRoleUpdate = async (userId: string) => {
    if (!isAdmin) {
      toast({
        title: "Accesso negato",
        description: "Solo gli amministratori possono modificare i ruoli degli utenti.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ruolo: selectedRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Ruolo aggiornato",
        description: "Il ruolo dell'utente è stato aggiornato con successo.",
      });

      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUser(null);
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Amministratore';
      case 'operatore': return 'Operatore';
      default: return role;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3">Caricamento...</span>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cognome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ruolo</TableHead>
            <TableHead>Data Creazione</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.cognome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {editingUser === user.id ? (
                  <Select
                    value={selectedRole}
                    onValueChange={(value: 'admin' | 'operatore') => setSelectedRole(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleziona ruolo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Amministratore</SelectItem>
                      <SelectItem value="operatore">Operatore</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="capitalize">{getRoleLabel(user.ruolo)}</span>
                )}
              </TableCell>
              <TableCell>{formatDate(user.data_creazione)}</TableCell>
              <TableCell className="text-right space-x-2">
                {editingUser === user.id ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRoleUpdate(user.id)}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingUser(null)}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </>
                ) : (
                  isAdmin && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setSelectedRole(user.ruolo);
                        setEditingUser(user.id);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
