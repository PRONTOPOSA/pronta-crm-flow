
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Facebook, Instagram, Users, Megaphone, Gift, Link, MapPin, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type ContactFormData = {
  nome: string;
  email: string;
  telefono: string;
  citta: string;
  tipo: string;
  fonte: string;
  indirizzo: string;
  cap: string;
  provincia: string;
  website: string;
  dataContatto: string;
  note: string;
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
    tipo: contactType === 'clienti' ? 'privato' : contactType === 'fornitori' ? 'fornitore' : 'partner',
    fonte: '',
    indirizzo: '',
    cap: '',
    provincia: '',
    website: '',
    dataContatto: '',
    note: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    toast({
      title: "Contatto aggiunto",
      description: `${newContact.nome} è stato aggiunto con successo.`,
    });
    
    setNewContact({
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
  };

  const renderSourceIcon = (source: string) => {
    switch (source) {
      case 'facebook':
        return <Facebook className="mr-2 h-4 w-4" />;
      case 'instagram':
        return <Instagram className="mr-2 h-4 w-4" />;
      case 'referral':
        return <Users className="mr-2 h-4 w-4" />;
      case 'campagna':
        return <Megaphone className="mr-2 h-4 w-4" />;
      case 'promo':
        return <Gift className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
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
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="website">Sito Web</Label>
              <Input 
                id="website" 
                name="website" 
                value={newContact.website} 
                onChange={handleInputChange}
                placeholder="www.esempio.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="indirizzo">Indirizzo</Label>
              <Input 
                id="indirizzo" 
                name="indirizzo" 
                value={newContact.indirizzo} 
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
            <div className="grid gap-2">
              <Label htmlFor="provincia">Provincia</Label>
              <Input 
                id="provincia" 
                name="provincia" 
                value={newContact.provincia} 
                onChange={handleInputChange}
                maxLength={2}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cap">CAP</Label>
              <Input 
                id="cap" 
                name="cap" 
                value={newContact.cap} 
                onChange={handleInputChange}
                maxLength={5}
              />
            </div>
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

          <div className="grid gap-2">
            <Label htmlFor="fonte">Fonte</Label>
            <Select onValueChange={handleSourceChange} value={newContact.fonte}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona la fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook">
                  <div className="flex items-center">
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </div>
                </SelectItem>
                <SelectItem value="instagram">
                  <div className="flex items-center">
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram
                  </div>
                </SelectItem>
                <SelectItem value="referral">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Referral
                  </div>
                </SelectItem>
                <SelectItem value="campagna">
                  <div className="flex items-center">
                    <Megaphone className="mr-2 h-4 w-4" />
                    Campagna Marketing
                  </div>
                </SelectItem>
                <SelectItem value="promo">
                  <div className="flex items-center">
                    <Gift className="mr-2 h-4 w-4" />
                    Promozione
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

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
          <Button onClick={handleAddContact}>Aggiungi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
