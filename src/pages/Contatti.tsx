
import React, { useState, useEffect } from 'react';
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
import { ContactFormData } from '@/components/contacts/types';

// Fixed data structure to ensure correct field mapping
const initialData = {
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

const ITEMS_PER_PAGE = 2;

const Contatti = () => {
  const [contactsData, setContactsData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('clienti');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleAddContact = (newContact: ContactFormData) => {
    const newId = Date.now().toString();
    const contactType = activeTab === 'clienti' ? 'privato' : 
                       activeTab === 'fornitori' ? 'fornitore' : 'partner';
                       
    const contactToAdd = {
      id: newId,
      nome: newContact.nome,
      tipo: contactType,
      email: newContact.email,
      telefono: newContact.telefono || '',
      citta: newContact.citta || '',
      stato: 'attivo'
    };

    setContactsData(prevData => {
      if (activeTab === 'clienti') {
        return {
          ...prevData,
          clientiData: [...prevData.clientiData, contactToAdd]
        };
      } else if (activeTab === 'fornitori') {
        return {
          ...prevData,
          fornitoriData: [...prevData.fornitoriData, contactToAdd]
        };
      } else {
        return {
          ...prevData,
          partnerData: [...prevData.partnerData, contactToAdd]
        };
      }
    });
  };

  // Get the correct data set based on active tab
  const getActiveData = () => {
    const dataKey = `${activeTab}Data` as keyof typeof contactsData;
    const data = contactsData[dataKey];
    
    // Filter data based on search term if present
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      return data.filter(contact => 
        contact.nome.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.telefono.toLowerCase().includes(searchLower) ||
        contact.citta.toLowerCase().includes(searchLower)
      );
    }
    
    return data;
  };

  const activeData = getActiveData();
  const totalPages = Math.ceil(activeData.length / ITEMS_PER_PAGE);
  
  // Calculate the current page's data slice
  const paginatedData = activeData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to first page when search results change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Contatti</h1>
            <p className="text-gray-500">Gestisci clienti, fornitori e partner</p>
          </div>
          
          <AddContactDialog 
            contactType={activeTab as 'clienti' | 'fornitori' | 'partner'} 
            onAddContact={handleAddContact}
          />
        </div>
        
        <ContactFilters onSearch={handleSearch} />
        
        <Tabs defaultValue="clienti" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clienti">Clienti</TabsTrigger>
            <TabsTrigger value="fornitori">Fornitori</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clienti" className="mt-4">
            <ContactTable contacts={paginatedData} type="clienti" />
            {totalPages > 1 && (
              <div className="p-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="fornitori" className="mt-4">
            <ContactTable contacts={paginatedData} type="fornitori" />
            {totalPages > 1 && (
              <div className="p-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="partner" className="mt-4">
            <ContactTable contacts={paginatedData} type="partner" />
            {totalPages > 1 && (
              <div className="p-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink 
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Contatti;
