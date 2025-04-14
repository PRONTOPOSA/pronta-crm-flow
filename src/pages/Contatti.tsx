
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin,
  Building
} from 'lucide-react';

// Mock data
const clientiData = [
  { id: '1', nome: 'Marco Rossi', tipo: 'privato', email: 'marco.rossi@email.it', telefono: '333 1234567', citta: 'Milano', stato: 'attivo' },
  { id: '2', nome: 'Laura Bianchi', tipo: 'privato', email: 'laura.b@email.it', telefono: '339 9876543', citta: 'Roma', stato: 'attivo' },
  { id: '3', nome: 'Giuseppe Verdi', tipo: 'privato', email: 'g.verdi@email.it', telefono: '345 1122334', citta: 'Napoli', stato: 'inattivo' },
  { id: '4', nome: 'Francesca Neri', tipo: 'privato', email: 'franc.neri@email.it', telefono: '347 5566778', citta: 'Torino', stato: 'attivo' },
  { id: '5', nome: 'Antonio Russo', tipo: 'privato', email: 'a.russo@email.it', telefono: '349 8877665', citta: 'Bologna', stato: 'attivo' },
];

const fornitoriData = [
  { id: '1', nome: 'Serramenti Moderni SRL', tipo: 'fornitore', email: 'info@serramentimoderni.it', telefono: '02 123456', citta: 'Milano', stato: 'attivo' },
  { id: '2', nome: 'Infissi Premium SpA', tipo: 'fornitore', email: 'info@infissipremium.it', telefono: '06 654321', citta: 'Roma', stato: 'attivo' },
  { id: '3', nome: 'Porte & Finestre di Qualità', tipo: 'fornitore', email: 'info@portefinestre.it', telefono: '081 112233', citta: 'Napoli', stato: 'inattivo' },
];

const partnerData = [
  { id: '1', nome: 'Costruzioni Veloci SRL', tipo: 'partner', email: 'info@costruzioniveloci.it', telefono: '02 987654', citta: 'Milano', stato: 'attivo' },
  { id: '2', nome: 'Progetti Edilizi SpA', tipo: 'partner', email: 'info@progettiedilizi.it', telefono: '06 456789', citta: 'Roma', stato: 'attivo' },
];

const Contatti = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Contatti</h1>
            <p className="text-gray-500">Gestisci clienti, fornitori e partner</p>
          </div>
          
          <Button className="bg-secondary hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Contatto
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Cerca per nome, email, telefono..." 
              className="pl-10 w-full"
            />
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </Button>
        </div>
        
        <Tabs defaultValue="clienti">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clienti">Clienti</TabsTrigger>
            <TabsTrigger value="fornitori">Fornitori</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clienti" className="mt-4">
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
                    {clientiData.map((cliente) => (
                      <TableRow key={cliente.id} className="hover:bg-gray-50 cursor-pointer">
                        <TableCell className="font-medium">{cliente.nome}</TableCell>
                        <TableCell className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          {cliente.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            {cliente.telefono}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {cliente.citta}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cliente.stato === 'attivo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {cliente.stato === 'attivo' ? 'Attivo' : 'Inattivo'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="p-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fornitori" className="mt-4">
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
                    {fornitoriData.map((fornitore) => (
                      <TableRow key={fornitore.id} className="hover:bg-gray-50 cursor-pointer">
                        <TableCell className="font-medium flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-500" />
                          {fornitore.nome}
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          {fornitore.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            {fornitore.telefono}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {fornitore.citta}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={fornitore.stato === 'attivo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {fornitore.stato === 'attivo' ? 'Attivo' : 'Inattivo'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="partner" className="mt-4">
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
                    {partnerData.map((partner) => (
                      <TableRow key={partner.id} className="hover:bg-gray-50 cursor-pointer">
                        <TableCell className="font-medium flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-500" />
                          {partner.nome}
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          {partner.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            {partner.telefono}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {partner.citta}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={partner.stato === 'attivo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {partner.stato === 'attivo' ? 'Attivo' : 'Inattivo'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Contatti;
