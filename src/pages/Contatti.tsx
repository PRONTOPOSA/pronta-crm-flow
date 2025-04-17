
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactFilters } from '@/components/contacts/ContactFilters';
import { ContactTabContent } from '@/components/contacts/components/ContactTabContent';
import { ContactHeader } from '@/components/contacts/components/ContactHeader';
import { useContacts, ContactTab } from '@/hooks/useContacts';

const Contatti = () => {
  const {
    activeTab,
    currentPage,
    totalPages,
    paginatedData,
    handleTabChange,
    handleAddContact,
    handlePageChange,
    handleSearch,
  } = useContacts();

  return (
    <MainLayout>
      <div className="space-y-6">
        <ContactHeader 
          activeTab={activeTab as ContactTab} 
          onAddContact={handleAddContact} 
        />
        
        <ContactFilters onSearch={handleSearch} />
        
        <Tabs defaultValue="clienti" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clienti">Clienti</TabsTrigger>
            <TabsTrigger value="fornitori">Fornitori</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>
          
          <ContactTabContent 
            value="clienti"
            contacts={activeTab === 'clienti' ? paginatedData : []}
            currentPage={currentPage}
            totalPages={activeTab === 'clienti' ? totalPages : 0}
            onPageChange={handlePageChange}
          />
          
          <ContactTabContent 
            value="fornitori"
            contacts={activeTab === 'fornitori' ? paginatedData : []}
            currentPage={currentPage}
            totalPages={activeTab === 'fornitori' ? totalPages : 0}
            onPageChange={handlePageChange}
          />
          
          <ContactTabContent 
            value="partner"
            contacts={activeTab === 'partner' ? paginatedData : []}
            currentPage={currentPage}
            totalPages={activeTab === 'partner' ? totalPages : 0}
            onPageChange={handlePageChange}
          />
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Contatti;
