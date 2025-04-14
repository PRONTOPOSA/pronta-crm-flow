
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import ProjectTable from '@/components/dashboard/ProjectTable';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { 
  FileText, 
  CalendarCheck, 
  Euro, 
  Users,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data
const stats = [
  { 
    title: 'Preventivi Aperti', 
    value: '12', 
    icon: <FileText size={20} />,
    change: { value: 8, type: 'increase' as const } 
  },
  { 
    title: 'Appuntamenti Oggi', 
    value: '5', 
    icon: <CalendarCheck size={20} />,
    change: { value: 2, type: 'increase' as const } 
  },
  { 
    title: 'Fatturato Mensile', 
    value: '€ 24.500', 
    icon: <Euro size={20} />,
    change: { value: 12, type: 'increase' as const } 
  },
  { 
    title: 'Nuovi Clienti', 
    value: '8', 
    icon: <Users size={20} />,
    change: { value: 5, type: 'decrease' as const } 
  },
];

const projects = [
  { id: '1', client: 'Marco Rossi', description: 'Sostituzione finestre appartamento', status: 'preventivo' as const, deadline: '25/04/2025' },
  { id: '2', client: 'Francesca Neri', description: 'Porte blindate e serramenti', status: 'approvato' as const, deadline: '18/04/2025' },
  { id: '3', client: 'Costruzioni Veloci SRL', description: 'Fornitura e posa serramenti edificio', status: 'in-corso' as const, deadline: '30/04/2025' },
  { id: '4', client: 'Maria Ferrari', description: 'Sostituzione portoncino ingresso', status: 'completato' as const, deadline: '01/04/2025' },
  { id: '5', client: 'Laura Bianchi', description: 'Installazione porte interne', status: 'preventivo' as const, deadline: '23/04/2025' },
];

const appointments = [
  { 
    id: '1', 
    title: 'Sopralluogo per infissi', 
    client: 'Marco Rossi',
    datetime: '2025-04-15T10:00:00',
    location: 'Via Roma 123, Milano',
    type: 'sopralluogo' as const
  },
  { 
    id: '2', 
    title: 'Installazione finestre', 
    client: 'Laura Bianchi',
    datetime: '2025-04-15T14:00:00',
    location: 'Via Verdi 45, Roma',
    type: 'installazione' as const
  },
  { 
    id: '3', 
    title: 'Riunione con Costruzioni Veloci', 
    client: 'Costruzioni Veloci SRL',
    datetime: '2025-04-16T09:30:00',
    location: 'Sede aziendale',
    type: 'riunione' as const
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Panoramica delle attività e dei progetti</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Progetti recenti</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  Vedi tutti
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="pb-4">
                <ProjectTable projects={projects} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Statistiche vendite</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  Report completo
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-md border">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Grafico statistiche vendite</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <AppointmentList appointments={appointments} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">Attività recenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 pb-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <p className="text-sm font-medium">Preventivo inviato</p>
                    <p className="text-xs text-gray-500">Cliente: Antonio Russo</p>
                    <p className="text-xs text-gray-500">Oggi, 11:30</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4 pb-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <p className="text-sm font-medium">Appuntamento completato</p>
                    <p className="text-xs text-gray-500">Cliente: Laura Bianchi</p>
                    <p className="text-xs text-gray-500">Oggi, 10:15</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4 pb-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <p className="text-sm font-medium">Progetto completato</p>
                    <p className="text-xs text-gray-500">Cliente: Maria Ferrari</p>
                    <p className="text-xs text-gray-500">Ieri, 16:45</p>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <p className="text-sm font-medium">Nuovo cliente aggiunto</p>
                    <p className="text-xs text-gray-500">Cliente: Roberto Esposito</p>
                    <p className="text-xs text-gray-500">Ieri, 14:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
