import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
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
import { AddContactDialog } from '@/components/contacts/AddContactDialog';
import { ContactFilters } from '@/components/contacts/ContactFilters';
import { ContactTable } from '@/components/contacts/ContactTable';

const { clientiData, fornitoriData, partnerData } = {
  clientiData: [
    { id: '1', nome: 'Marco Rossi', tipo: 'privato', email: 'marco.rossi@email.it', telefono: '333 1234567', citta: 'Milano', stato: 'attivo' },
    { id: '2', nome: 'Laura Bianchi', tipo: 'privato', email: 'laura.b@email.it', telefono: '339 9876543', citta: 'Roma', stato: 'attivo' },
    { id: '3', nome: 'Giuseppe Verdi', tipo: 'privato', email: 'g.verdi@email.it', telefono: '345 1122334', citta: 'Napoli', stato: 'inattivo' },
    { id: '4', nome: 'Francesca Neri', tipo: 'privato', email: 'franc.neri@email.it', telefono: '347 5566778', citta: 'Torino', stato: 'attivo' },
    { id: '5', nome: 'Antonio Russo', tipo: 'privato', email: 'a.russo@email.it', telefono: '349 8877665', citta: 'Bologna', stato: 'attivo' },
  ],
  fornitoriData: [
    { id: '1', nome: 'Serramenti Moderni SRL', tipo: 'fornitore', email: 'info@serramentimoderni.it', telefono: '02 123456', citta: 'Milano', stato: 'attivo' },
    { id: '2', nome: 'Infissi Premium SpA', tipo: 'fornitore', email: 'info@infissipremium.it', telefono: '06 654321', citta: 'Roma', stato: 'attivo' },
    { id: '3', nome: 'Porte & Finestre di Qualità', tipo: 'fornitore', email: 'info@portefinestre.it', telefono: '081 112233', citta: 'Napoli', stato: 'inattivo' },
  ],
  partnerData: [
    { id: '1', nome: 'Costruzioni Veloci SRL', tipo: 'partner', email: 'info@costruzioniveloci.it', telefono: '02 987654', citta: 'Milano', stato: 'attivo' },
    { id: '2', nome: 'Progetti Edilizi SpA', tipo: 'partner', email: 'info@progettiedilizi.it', telefono: '06 456789', citta: 'Roma', stato: 'attivo' },
  ]
};

const Contatti = () => {
  const [activeTab, setActiveTab] = useState('clienti');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Contatti</h1>
            <p className="text-gray-500">Gestisci clienti, fornitori e partner</p>
          </div>
          
          <AddContactDialog contactType={activeTab as 'clienti' | 'fornitori' | 'partner'} />
        </div>
        
        <ContactFilters />
        
        <Tabs defaultValue="clienti" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clienti">Clienti</TabsTrigger>
            <TabsTrigger value="fornitori">Fornitori</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clienti" className="mt-4">
            <ContactTable contacts={clientiData} type="clienti" />
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
          </TabsContent>
          
          <TabsContent value="fornitori" className="mt-4">
            <ContactTable contacts={fornitoriData} type="fornitori" />
          </TabsContent>
          
          <TabsContent value="partner" className="mt-4">
            <ContactTable contacts={partnerData} type="partner" />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Contatti;
