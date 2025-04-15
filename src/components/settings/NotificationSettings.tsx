
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const NotificationSettings = () => {
  const handleSaveNotifiche = () => {
    toast({
      title: "Notifiche aggiornate",
      description: "Le preferenze di notifica sono state aggiornate con successo.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notif">Notifiche Email</Label>
            <p className="text-sm text-gray-500">Ricevi aggiornamenti via email</p>
          </div>
          <Switch id="email-notif" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="app-notif">Notifiche App</Label>
            <p className="text-sm text-gray-500">Ricevi notifiche all'interno dell'app</p>
          </div>
          <Switch id="app-notif" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="appointment-remind">Promemoria Appuntamenti</Label>
            <p className="text-sm text-gray-500">Ricevi un promemoria prima degli appuntamenti</p>
          </div>
          <Switch id="appointment-remind" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="project-updates">Aggiornamenti Progetti</Label>
            <p className="text-sm text-gray-500">Ricevi notifiche sugli aggiornamenti dei progetti</p>
          </div>
          <Switch id="project-updates" defaultChecked />
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button onClick={handleSaveNotifiche}>Salva Preferenze</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
