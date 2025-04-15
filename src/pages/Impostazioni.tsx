
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from '@/components/settings/GeneralSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import CompanyProfile from '@/components/settings/CompanyProfile';
import UserManagement from '@/components/settings/UserManagement';

const Impostazioni = () => {
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
              <CardContent>
                <GeneralSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifiche">
            <Card>
              <CardHeader>
                <CardTitle>Preferenze Notifiche</CardTitle>
              </CardHeader>
              <CardContent>
                <NotificationSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="azienda">
            <Card>
              <CardHeader>
                <CardTitle>Profilo Azienda</CardTitle>
              </CardHeader>
              <CardContent>
                <CompanyProfile />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="utenti">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Utenti</CardTitle>
              </CardHeader>
              <CardContent>
                <UserManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Impostazioni;
