
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type ContactFormData = {
  nome: string;
  email: string;
  telefono: string;
  citta: string;
  tipo: string;
};

interface AddContactDialogProps {
  contactType: 'clienti' | 'fornitori' | 'partner';
}

export const AddContactDialog = ({ contactType }: AddContactDialogProps) => {
  const [newContact, setNewContact] = useState<ContactFormData>({
    nome: '',
    email: '',
    telefono: '',
    citta: '',
    tipo: contactType === 'clienti' ? 'privato' : contactType === 'fornitori' ? 'fornitore' : 'partner'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddContact = () => {
    toast({
      title: "Contatto aggiunto",
      description: `${newContact.nome} è stato aggiunto con successo.`,
    });
    
    setNewContact({
      nome: '',
      email: '',
      telefono: '',
      citta: '',
      tipo: contactType === 'clienti' ? 'privato' : contactType === 'fornitori' ? 'fornitore' : 'partner'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Contatto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {contactType === 'clienti' ? 'Nuovo Cliente' : 
             contactType === 'fornitori' ? 'Nuovo Fornitore' : 'Nuovo Partner'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">{contactType !== 'clienti' ? 'Nome Azienda' : 'Nome'}</Label>
            <Input 
              id="nome" 
              name="nome" 
              value={newContact.nome} 
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={newContact.email} 
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telefono">Telefono</Label>
            <Input 
              id="telefono" 
              name="telefono" 
              value={newContact.telefono} 
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="citta">Città</Label>
            <Input 
              id="citta" 
              name="citta" 
              value={newContact.citta} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddContact}>Aggiungi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
