
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoSave: true,
    language: 'it'
  });

  // Carica le impostazioni dal localStorage all'avvio
  useEffect(() => {
    const savedSettings = localStorage.getItem('generalSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSwitchChange = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  const handleSaveGenerali = () => {
    // Salva le impostazioni nel localStorage
    localStorage.setItem('generalSettings', JSON.stringify(settings));
    
    // Applica il tema scuro se necessario
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
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
            <Label htmlFor="darkMode">Modalità Scura</Label>
            <p className="text-sm text-gray-500">Attiva il tema scuro per l'interfaccia</p>
          </div>
          <Switch 
            id="darkMode" 
            checked={settings.darkMode}
            onCheckedChange={() => handleSwitchChange('darkMode')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="autoSave">Salvataggio Automatico</Label>
            <p className="text-sm text-gray-500">Salva automaticamente i dati durante la modifica</p>
          </div>
          <Switch 
            id="autoSave" 
            checked={settings.autoSave}
            onCheckedChange={() => handleSwitchChange('autoSave')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Lingua</Label>
          <select 
            id="language" 
            className="w-full p-2 border rounded-md"
            value={settings.language}
            onChange={handleLanguageChange}
          >
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
