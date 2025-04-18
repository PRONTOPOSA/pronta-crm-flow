
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ContactType } from './types';

interface PersonalInfoSectionProps {
  nome: string;
  email: string;
  telefono: string;
  website: string;
  contactType: ContactType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection = ({
  nome,
  email,
  telefono,
  website,
  contactType,
  onChange,
}: PersonalInfoSectionProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nome">{contactType !== 'clienti' ? 'Nome Azienda' : 'Nome'}</Label>
          <Input 
            id="nome" 
            name="nome" 
            value={nome} 
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={email} 
            onChange={onChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="telefono">Telefono</Label>
          <Input 
            id="telefono" 
            name="telefono" 
            value={telefono} 
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="website">Sito Web</Label>
          <Input 
            id="website" 
            name="website" 
            value={website} 
            onChange={onChange}
            placeholder="www.esempio.com"
          />
        </div>
      </div>
    </div>
  );
};
