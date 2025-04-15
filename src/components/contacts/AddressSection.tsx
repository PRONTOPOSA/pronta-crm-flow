
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AddressSectionProps {
  indirizzo: string;
  citta: string;
  provincia: string;
  cap: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressSection = ({
  indirizzo,
  citta,
  provincia,
  cap,
  onChange,
}: AddressSectionProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="indirizzo">Indirizzo</Label>
          <Input 
            id="indirizzo" 
            name="indirizzo" 
            value={indirizzo} 
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="citta">Città</Label>
          <Input 
            id="citta" 
            name="citta" 
            value={citta} 
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="provincia">Provincia</Label>
          <Input 
            id="provincia" 
            name="provincia" 
            value={provincia} 
            onChange={onChange}
            maxLength={2}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="cap">CAP</Label>
        <Input 
          id="cap" 
          name="cap" 
          value={cap} 
          onChange={onChange}
          maxLength={5}
        />
      </div>
    </div>
  );
};
