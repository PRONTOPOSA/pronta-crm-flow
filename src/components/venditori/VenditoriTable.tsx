
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Trash2, UserX } from 'lucide-react';

type Venditore = {
  id: string;
  nome: string;
  cognome: string;
  email: string;
};

type VenditoriTableProps = {
  venditori: Venditore[];
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
          <TableHead>Stato</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">Caricamento...</TableCell>
          </TableRow>
        ) : filteredVenditori.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4">
              {searchQuery ? 'Nessun venditore corrisponde alla ricerca' : 'Nessun venditore disponibile'}
            </TableCell>
          </TableRow>
        ) : (
          filteredVenditori.map((venditore) => (
            <TableRow key={venditore.id}>
              <TableCell>{venditore.nome}</TableCell>
              <TableCell>{venditore.cognome}</TableCell>
              <TableCell>{venditore.email}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Venditore Attivo
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(venditore.id)}
                  title="Rimuovi venditore"
                >
                  <UserX className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
