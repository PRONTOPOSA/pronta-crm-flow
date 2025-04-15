
import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { PersonalInfoSection } from './PersonalInfoSection';
import { AddressSection } from './AddressSection';
import { SourceSection } from './SourceSection';
import { ContactFormData, ContactType } from './types';

interface AddContactDialogProps {
  contactType: ContactType;
  onAddContact?: (contact: ContactFormData) => void;
}

export const AddContactDialog = ({ contactType, onAddContact }: AddContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState<ContactFormData>({
    id: crypto.randomUUID(), // Add unique ID for each contact
    nome: '',
    email: '',
    telefono: '',
    citta: '',
    tipo: contactType === 'clienti' ? 'privato' : contactType === 'fornitori' ? 'fornitore' : 'partner',
    fonte: '',
    indirizzo: '',
    cap: '',
    provincia: '',
    website: '',
    dataContatto: '',
    note: ''
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSourceChange = (value: string) => {
    setNewContact(prev => ({
      ...prev,
      fonte: value
    }));
  };

  const handleAddContact = () => {
    if (!newContact.nome || !newContact.email) {
      toast({
        title: "Errore",
        description: "Nome e email sono campi obbligatori.",
        variant: "destructive"
      });
      return;
    }
    
    // Ensure the contact has a unique ID
    const contactToAdd = {
      ...newContact,
      id: newContact.id || crypto.randomUUID()
    };
    
    // Notifica l'aggiunta del contatto
    toast({
      title: "Contatto aggiunto",
      description: `${contactToAdd.nome} è stato aggiunto con successo.`,
    });
    
    // Passa il nuovo contatto al componente principale
    if (onAddContact) {
      onAddContact(contactToAdd);
    }
    
    // Resetta il form
    setNewContact({
      id: crypto.randomUUID(),
      nome: '',
      email: '',
      telefono: '',
      citta: '',
      tipo: contactType === 'clienti' ? 'privato' : contactType === 'fornitori' ? 'fornitore' : 'partner',
      fonte: '',
      indirizzo: '',
      cap: '',
      provincia: '',
      website: '',
      dataContatto: '',
      note: ''
    });
    
    // Chiude il dialog dopo aver aggiunto il contatto
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Contatto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {contactType === 'clienti' ? 'Nuovo Cliente' : 
             contactType === 'fornitori' ? 'Nuovo Fornitore' : 'Nuovo Partner'}
          </DialogTitle>
          <DialogDescription>
            Inserisci i dati del nuovo contatto. Clicca su Aggiungi quando hai finito.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <PersonalInfoSection
            nome={newContact.nome}
            email={newContact.email}
            telefono={newContact.telefono}
            website={newContact.website}
            contactType={contactType}
            onChange={handleInputChange}
          />

          <AddressSection
            indirizzo={newContact.indirizzo}
            citta={newContact.citta}
            provincia={newContact.provincia}
            cap={newContact.cap}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dataContatto">Data Contatto</Label>
              <Input 
                id="dataContatto" 
                name="dataContatto" 
                type="date"
                value={newContact.dataContatto} 
                onChange={handleInputChange}
              />
            </div>
          </div>

          <SourceSection
            fonte={newContact.fonte}
            onSourceChange={handleSourceChange}
          />

          <div className="grid gap-2">
            <Label htmlFor="note">Note</Label>
            <Textarea 
              id="note" 
              name="note" 
              value={newContact.note} 
              onChange={handleInputChange}
              placeholder="Inserisci eventuali note o commenti..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annulla</Button>
          </DialogClose>
          <Button onClick={handleAddContact}>Aggiungi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
