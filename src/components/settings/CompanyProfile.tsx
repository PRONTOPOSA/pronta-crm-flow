
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CompanyProfile = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Nome Azienda</Label>
          <Input id="company-name" defaultValue="ProntoPosa S.r.l." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vat">Partita IVA</Label>
          <Input id="vat" defaultValue="IT12345678901" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Indirizzo</Label>
          <Input id="address" defaultValue="Via Roma, 123" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Città</Label>
          <Input id="city" defaultValue="Milano" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal-code">CAP</Label>
          <Input id="postal-code" defaultValue="20100" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Paese</Label>
          <Input id="country" defaultValue="Italia" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="info@prontoposa.it" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefono</Label>
          <Input id="phone" defaultValue="+39 02 1234567" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="logo">Logo Aziendale</Label>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-500">Logo</span>
          </div>
          <Button variant="outline">Carica Nuovo Logo</Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button>Salva Profilo</Button>
      </div>
    </div>
  );
};

export default CompanyProfile;
