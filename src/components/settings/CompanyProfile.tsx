
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const CompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    name: 'ProntoPosa S.r.l.',
    vat: 'IT12345678901',
    address: 'Via Roma, 123',
    city: 'Milano',
    postalCode: '20100',
    country: 'Italia',
    email: 'info@prontoposa.it',
    phone: '+39 02 1234567'
  });

  // Carica i dati dal localStorage all'avvio
  useEffect(() => {
    const savedData = localStorage.getItem('companyProfile');
    if (savedData) {
      setCompanyData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [id.replace('company-', '')]: value
    }));
  };

  const handleSaveProfile = () => {
    // Salva i dati nel localStorage
    localStorage.setItem('companyProfile', JSON.stringify(companyData));
    
    toast({
      title: "Profilo aggiornato",
      description: "I dati aziendali sono stati aggiornati con successo.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company-name">Nome Azienda</Label>
          <Input 
            id="company-name" 
            value={companyData.name} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-vat">Partita IVA</Label>
          <Input 
            id="company-vat" 
            value={companyData.vat} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-address">Indirizzo</Label>
          <Input 
            id="company-address" 
            value={companyData.address} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-city">Città</Label>
          <Input 
            id="company-city" 
            value={companyData.city} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-postalCode">CAP</Label>
          <Input 
            id="company-postalCode" 
            value={companyData.postalCode} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-country">Paese</Label>
          <Input 
            id="company-country" 
            value={companyData.country} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-email">Email</Label>
          <Input 
            id="company-email" 
            type="email" 
            value={companyData.email} 
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company-phone">Telefono</Label>
          <Input 
            id="company-phone" 
            value={companyData.phone} 
            onChange={handleInputChange}
          />
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
        <Button onClick={handleSaveProfile}>Salva Profilo</Button>
      </div>
    </div>
  );
};

export default CompanyProfile;
