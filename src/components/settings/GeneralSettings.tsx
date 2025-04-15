
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const GeneralSettings = () => {
  const handleSaveGenerali = () => {
    toast({
      title: "Impostazioni salvate",
      description: "Le impostazioni generali sono state aggiornate con successo.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode">Modalità Scura</Label>
            <p className="text-sm text-gray-500">Attiva il tema scuro per l'interfaccia</p>
          </div>
          <Switch id="dark-mode" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-save">Salvataggio Automatico</Label>
            <p className="text-sm text-gray-500">Salva automaticamente i dati durante la modifica</p>
          </div>
          <Switch id="auto-save" defaultChecked />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Lingua</Label>
          <select id="language" className="w-full p-2 border rounded-md">
            <option value="it">Italiano</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button onClick={handleSaveGenerali}>Salva Impostazioni</Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
