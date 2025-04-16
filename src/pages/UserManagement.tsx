
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserTable from '@/components/users/UserTable';

const UserManagement = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Gestione Utenti</h1>
        <p className="text-gray-500 mb-6">Amministratori e operatori sono gestiti in questa sezione. I venditori hanno una sezione dedicata.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista Utenti (admin e operatori)</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
