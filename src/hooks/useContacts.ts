
import { useState, useEffect } from 'react';
import { ContactFormData } from '@/components/contacts/types';

// Tipo di dati per i contatti
export interface Contact {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  telefono: string;
  citta: string;
  stato: string;
}

// Tipo per i dati di contatto divisi per categoria
export interface ContactsData {
  clientiData: Contact[];
  fornitoriData: Contact[];
  partnerData: Contact[];
}

// Tipo per la tab attiva
export type ContactTab = 'clienti' | 'fornitori' | 'partner';

// Dati iniziali per i contatti (esempio)
const initialData: ContactsData = {
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

export const useContacts = () => {
  const [contactsData, setContactsData] = useState<ContactsData>(initialData);
  const [activeTab, setActiveTab] = useState<ContactTab>('clienti');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Gestione del cambio di tab
  const handleTabChange = (value: string) => {
    setActiveTab(value as ContactTab);
    setCurrentPage(1); // Reset alla prima pagina quando si cambia tab
  };

  // Aggiunta di un nuovo contatto
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

  // Ottenere i dati corretti in base alla tab attiva
  const getActiveData = () => {
    const dataKey = `${activeTab}Data` as keyof ContactsData;
    const data = contactsData[dataKey];
    
    // Filtra i dati in base al termine di ricerca se presente
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

  // Calcola i dati per la paginazione corrente
  const activeData = getActiveData();
  const totalPages = Math.ceil(activeData.length / ITEMS_PER_PAGE);
  
  const paginatedData = activeData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  // Gestisce il cambio di pagina
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset alla prima pagina quando i risultati di ricerca cambiano
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Gestisce la ricerca
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    activeTab,
    currentPage,
    totalPages,
    paginatedData,
    handleTabChange,
    handleAddContact,
    handlePageChange,
    handleSearch,
  };
};
