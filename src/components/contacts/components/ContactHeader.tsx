
import React from 'react';
import { AddContactDialog } from '@/components/contacts/AddContactDialog';
import { ContactFormData } from '@/components/contacts/types';
import { ContactTab } from '@/hooks/useContacts';

interface ContactHeaderProps {
  activeTab: ContactTab;
  onAddContact: (contact: ContactFormData) => void;
}

export const ContactHeader = ({ activeTab, onAddContact }: ContactHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Contatti</h1>
        <p className="text-gray-500">Gestisci clienti, fornitori e partner</p>
      </div>
      
      <AddContactDialog 
        contactType={activeTab} 
        onAddContact={onAddContact}
      />
    </div>
  );
};
