
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import type { User } from '@/types/users';

type VenditoriTableProps = {
  venditori: User[];
  isLoading: boolean;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  searchQuery: string;
};

export const VenditoriTable = ({
  venditori,
  isLoading,
  isAdmin,
  onDelete,
  searchQuery
}: VenditoriTableProps) => {
  const filteredVenditori = venditori.filter(venditore => 
    venditore.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venditore.cognome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venditore.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Cognome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">Caricamento...</TableCell>
          </TableRow>
        ) : filteredVenditori.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              {searchQuery ? 'Nessun venditore corrisponde alla ricerca' : 'Nessun venditore disponibile'}
            </TableCell>
          </TableRow>
        ) : (
          filteredVenditori.map((venditore) => (
            <TableRow key={venditore.id}>
              <TableCell>{venditore.nome}</TableCell>
              <TableCell>{venditore.cognome}</TableCell>
              <TableCell>{venditore.email}</TableCell>
              <TableCell className="text-right">
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(venditore.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
