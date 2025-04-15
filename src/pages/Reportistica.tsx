
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const Reportistica = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Reportistica</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Reportistica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Questa sezione è in fase di sviluppo. Presto potrai visualizzare report dettagliati e analisi qui.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Reportistica;
