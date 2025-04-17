
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { ContactTable } from '@/components/contacts/ContactTable';
import { ContactPagination } from './ContactPagination';
import { Contact, ContactTab } from '@/hooks/useContacts';

interface ContactTabContentProps {
  value: ContactTab;
  contacts: Contact[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ContactTabContent = ({
  value,
  contacts,
  currentPage,
  totalPages,
  onPageChange
}: ContactTabContentProps) => {
  return (
    <TabsContent value={value} className="mt-4">
      <ContactTable contacts={contacts} type={value} />
      <ContactPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={onPageChange} 
      />
    </TabsContent>
  );
};
