import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MonthlyStats from '@/components/dashboard/MonthlyStats';
import ProjectTable from '@/components/dashboard/ProjectTable';
import AppointmentList from '@/components/dashboard/AppointmentList';
import CalendarPreview from '@/components/dashboard/CalendarPreview';
import { mockVenditori } from '@/types/venditori';

interface Appointment {
  id: string;
  title: string;
  client: string;
  type: 'sopralluogo' | 'installazione' | 'riunione' | 'consegna';
  datetime: string;
  endtime?: string;
  location: string;
  venditore_id?: string;
  venditore_nome?: string;
}

const projects = [
  {
    id: '1',
    client: 'Famiglia Bianchi',
    description: 'Ristrutturazione Villa Bianchi',
    status: 'preventivo' as const,
    deadline: '15/05/2025'
  },
  {
    id: '2',
    client: 'Condominio Aurora',
    description: 'Infissi Condominio Aurora',
    status: 'approvato' as const,
    deadline: '30/04/2025'
  },
  {
    id: '3',
    client: 'Tech Solutions SRL',
    description: 'Serramenti Uffici Tech Solutions',
    status: 'completato' as const,
    deadline: '20/03/2025'
  }
];

const appointments: Appointment[] = [
  { 
    id: '1', 
    title: 'Sopralluogo per infissi', 
    client: 'Marco Rossi',
    type: 'sopralluogo',
    datetime: '2025-04-15T10:00:00',
    endtime: '2025-04-15T11:30:00',
    location: 'Via Roma 123, Milano',
    venditore_id: '1',
    venditore_nome: 'Mario Bianchi'
  },
  { 
    id: '2', 
    title: 'Installazione finestre', 
    client: 'Laura Bianchi',
    type: 'installazione',
    datetime: '2025-04-15T14:00:00',
    endtime: '2025-04-15T18:00:00',
    location: 'Via Verdi 45, Roma',
    venditore_id: '2',
    venditore_nome: 'Lucia Verdi'
  },
  { 
    id: '3', 
    title: 'Riunione con Costruzioni Veloci', 
    client: 'Costruzioni Veloci SRL',
    type: 'riunione',
    datetime: '2025-04-16T09:30:00',
    endtime: '2025-04-16T10:30:00',
    location: 'Sede aziendale',
    venditore_id: '1',
    venditore_nome: 'Mario Bianchi'
  },
  { 
    id: '4', 
    title: 'Sopralluogo appartamento', 
    client: 'Giuseppe Verdi',
    type: 'sopralluogo',
    datetime: '2025-04-17T11:00:00',
    endtime: '2025-04-17T12:30:00',
    location: 'Via Napoli 67, Bologna',
    venditore_id: '2',
    venditore_nome: 'Lucia Verdi'
  },
  { 
    id: '5', 
    title: 'Consegna materiale', 
    client: 'Progetti Edilizi SpA',
    type: 'consegna',
    datetime: '2025-04-17T15:00:00',
    endtime: '2025-04-17T16:00:00',
    location: 'Cantiere Via Torino 89, Milano',
    venditore_id: '1',
    venditore_nome: 'Mario Bianchi'
  },
];

const Dashboard = () => {
  const [selectedVenditoreId, setSelectedVenditoreId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isVenditore, setIsVenditore] = useState(false);
  const [venditoreDetails, setVenditoreDetails] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const mockUser = { id: 'user-1' };
      setCurrentUser(mockUser);
      
      const venditore = mockVenditori.find(v => v.user_id === mockUser.id);
      
      if (venditore) {
        setIsVenditore(true);
        setVenditoreDetails(venditore);
        setSelectedVenditoreId(venditore.id);
      }
    };
    
    fetchCurrentUser();
  }, []);

  const filteredAppointments = selectedVenditoreId 
    ? appointments.filter(app => app.venditore_id === selectedVenditoreId)
    : appointments;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Benvenuto nel pannello di controllo di ProntoPosa</p>
          {isVenditore && venditoreDetails && (
            <p className="mt-1 text-sm bg-blue-50 p-2 rounded border border-blue-100 inline-block">
              Accesso venditore: {venditoreDetails.nome} {venditoreDetails.cognome}
            </p>
          )}
        </div>

        <MonthlyStats />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AppointmentList 
            appointments={filteredAppointments}
            showVenditoreFilter={!isVenditore}
            onVenditoreChange={!isVenditore ? setSelectedVenditoreId : undefined}
            selectedVenditoreId={selectedVenditoreId}
          />
          <ProjectTable projects={projects} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CalendarPreview />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
