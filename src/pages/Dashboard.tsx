
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowDownRight, ArrowUpRight, DollarSign, Users, Package } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ProjectTable from '@/components/dashboard/ProjectTable';
import AppointmentList from '@/components/dashboard/AppointmentList';
import { useToast } from '@/hooks/use-toast';
import { mockVenditori } from '@/types/venditori';

// Definizione dei tipi corretti per gli appuntamenti
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

// Mock data per i progetti (richiesto dal ProjectTable component)
const projects = [
  {
    id: '1',
    nome: 'Ristrutturazione Villa Bianchi',
    cliente: 'Famiglia Bianchi',
    stato: 'in_corso',
    budget: 45000,
    createdAt: '2025-03-15T10:00:00Z'
  },
  {
    id: '2',
    nome: 'Infissi Condominio Aurora',
    cliente: 'Condominio Aurora',
    stato: 'preventivo',
    budget: 28500,
    createdAt: '2025-04-05T14:30:00Z'
  },
  {
    id: '3',
    nome: 'Serramenti Uffici Tech Solutions',
    cliente: 'Tech Solutions SRL',
    stato: 'completato',
    budget: 12800,
    createdAt: '2025-02-20T09:15:00Z'
  }
];

// Mock data per gli appuntamenti con i tipi corretti
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

// Mock data per le statistiche mensili con i tipi corretti
const monthlyStats = [
  {
    title: "Fatturato Mensile",
    value: "€32,450",
    icon: <DollarSign />,
    change: { value: 15, type: "increase" },
    trend: "positive" as const
  },
  {
    title: "Nuovi Clienti",
    value: "24",
    icon: <Users />,
    change: { value: 12, type: "increase" },
    trend: "positive" as const
  },
  {
    title: "Progetti Completati",
    value: "16",
    icon: <Package />,
    change: { value: 3, type: "decrease" },
    trend: "negative" as const
  },
  {
    title: "Preventivi Approvati",
    value: "28",
    icon: <ArrowUpRight />,
    change: { value: 8, type: "increase" },
    trend: "positive" as const
  }
];

const Dashboard = () => {
  const [selectedVenditoreId, setSelectedVenditoreId] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isVenditore, setIsVenditore] = useState(false);
  const [venditoreDetails, setVenditoreDetails] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simuliamo il caricamento dell'utente e il controllo se è un venditore
    const fetchCurrentUser = async () => {
      // Simula un utente loggato (in un caso reale, questo verrebbe da Supabase auth)
      const mockUser = { id: 'user-1' };
      setCurrentUser(mockUser);
      
      // Verifica se l'utente è un venditore
      const venditore = mockVenditori.find(v => v.user_id === mockUser.id);
      
      if (venditore) {
        setIsVenditore(true);
        setVenditoreDetails(venditore);
        setSelectedVenditoreId(venditore.id);
      }
    };
    
    fetchCurrentUser();
  }, []);

  // Filtra gli appuntamenti in base al venditore selezionato
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlyStats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              trend={stat.trend}
            />
          ))}
        </div>

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
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
