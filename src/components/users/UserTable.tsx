
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import AddUserDialog from './AddUserDialog';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: 'amministratore' | 'venditore' | 'installatore' | 'segretaria' | 'call_center' | 'verifica_qualita';
  data_creazione: string;
}

const UserTable = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Aggiungi Utente
        </Button>
      </div>

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
              <TableCell className="capitalize">{user.ruolo.replace('_', ' ')}</TableCell>
              <TableCell>{user.data_creazione ? formatDate(user.data_creazione) : ''}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddUserDialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen} />
    </div>
  );
};

export default UserTable;
