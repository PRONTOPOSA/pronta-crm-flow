
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotif: true,
    appNotif: true,
    appointmentRemind: true,
    projectUpdates: true
  });

  // Carica le impostazioni dal localStorage all'avvio
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setNotifications(JSON.parse(savedSettings));
    }
  }, []);

  const handleSwitchChange = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }));
  };

  const handleSaveNotifiche = () => {
    // Salva le impostazioni nel localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    
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
            <Label htmlFor="emailNotif">Notifiche Email</Label>
            <p className="text-sm text-gray-500">Ricevi aggiornamenti via email</p>
          </div>
          <Switch 
            id="emailNotif" 
            checked={notifications.emailNotif}
            onCheckedChange={() => handleSwitchChange('emailNotif')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="appNotif">Notifiche App</Label>
            <p className="text-sm text-gray-500">Ricevi notifiche all'interno dell'app</p>
          </div>
          <Switch 
            id="appNotif" 
            checked={notifications.appNotif}
            onCheckedChange={() => handleSwitchChange('appNotif')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="appointmentRemind">Promemoria Appuntamenti</Label>
            <p className="text-sm text-gray-500">Ricevi un promemoria prima degli appuntamenti</p>
          </div>
          <Switch 
            id="appointmentRemind" 
            checked={notifications.appointmentRemind}
            onCheckedChange={() => handleSwitchChange('appointmentRemind')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="projectUpdates">Aggiornamenti Progetti</Label>
            <p className="text-sm text-gray-500">Ricevi notifiche sugli aggiornamenti dei progetti</p>
          </div>
          <Switch 
            id="projectUpdates" 
            checked={notifications.projectUpdates}
            onCheckedChange={() => handleSwitchChange('projectUpdates')}
          />
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
