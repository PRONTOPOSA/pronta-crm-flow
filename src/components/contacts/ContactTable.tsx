
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Building } from 'lucide-react';

interface Contact {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  telefono: string;
  citta: string;
  stato: string;
}

interface ContactTableProps {
  contacts: Contact[];
  type: 'clienti' | 'fornitori' | 'partner';
}

export const ContactTable = ({ contacts, type }: ContactTableProps) => {
  return (
    <div className="bg-white rounded-md shadow">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Città</TableHead>
              <TableHead>Stato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-gray-50 cursor-pointer">
                <TableCell className="font-medium flex items-center">
                  {type !== 'clienti' && <Building className="h-4 w-4 mr-2 text-gray-500" />}
                  {contact.nome}
                </TableCell>
                <TableCell className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  {contact.email}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {contact.telefono}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {contact.citta}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={contact.stato === 'attivo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {contact.stato === 'attivo' ? 'Attivo' : 'Inattivo'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
