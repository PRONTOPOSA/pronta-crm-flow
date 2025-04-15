
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const Impostazioni = () => {
  const handleSaveGenerali = () => {
    toast({
      title: "Impostazioni salvate",
      description: "Le impostazioni generali sono state aggiornate con successo.",
    });
  };

  const handleSaveNotifiche = () => {
    toast({
      title: "Notifiche aggiornate",
      description: "Le preferenze di notifica sono state aggiornate con successo.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Impostazioni</h1>
        
        <Tabs defaultValue="generali" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="generali">Generali</TabsTrigger>
            <TabsTrigger value="notifiche">Notifiche</TabsTrigger>
            <TabsTrigger value="azienda">Profilo Azienda</TabsTrigger>
            <TabsTrigger value="utenti">Gestione Utenti</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generali">
            <Card>
              <CardHeader>
                <CardTitle>Impostazioni Generali</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifiche">
            <Card>
              <CardHeader>
                <CardTitle>Preferenze Notifiche</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="azienda">
            <Card>
              <CardHeader>
                <CardTitle>Profilo Azienda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
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
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Salva Profilo</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="utenti">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Utenti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button variant="outline">+ Aggiungi Utente</Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Nome</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Ruolo</th>
                          <th className="text-left py-3 px-4">Stato</th>
                          <th className="text-right py-3 px-4">Azioni</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Marco Rossi</td>
                          <td className="py-3 px-4">marco.rossi@prontoposa.it</td>
                          <td className="py-3 px-4">Amministratore</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Attivo</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">Modifica</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Laura Bianchi</td>
                          <td className="py-3 px-4">laura.bianchi@prontoposa.it</td>
                          <td className="py-3 px-4">Venditore</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Attivo</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">Modifica</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Giuseppe Verdi</td>
                          <td className="py-3 px-4">giuseppe.verdi@prontoposa.it</td>
                          <td className="py-3 px-4">Operatore</td>
                          <td className="py-3 px-4">
                            <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">In attesa</span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">Modifica</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Impostazioni;
