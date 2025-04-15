
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const Comunicazioni = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Comunicazioni</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Gestione Comunicazioni</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Questa sezione è in fase di sviluppo. Presto potrai gestire tutte le comunicazioni con i clienti da qui.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Comunicazioni;
