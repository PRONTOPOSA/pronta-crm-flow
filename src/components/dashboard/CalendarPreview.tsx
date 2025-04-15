
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const CalendarPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario Mensile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center my-4">
          <Calendar className="h-24 w-24 text-gray-400" />
        </div>
        <div className="text-center text-gray-500">
          <p>Visualizza il calendario completo per gestire</p>
          <p>tutti gli appuntamenti e gli eventi programmati.</p>
          <Button variant="outline" className="mt-4">
            Vai al Calendario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarPreview;
