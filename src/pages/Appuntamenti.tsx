import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AppointmentDialog, AppointmentFormData } from '@/components/appointments/AppointmentDialog';
import { toast } from '@/components/ui/use-toast';
import { AppointmentsCalendar } from '@/components/appointments/AppointmentsCalendar';
import { AppointmentsList } from '@/components/appointments/AppointmentsList';

// Initial mock data for appointments
const initialAppointments = [
  { 
    id: '1', 
    title: 'Sopralluogo per infissi', 
    client: 'Marco Rossi',
    type: 'sopralluogo',
    datetime: '2025-04-15T10:00:00',
    endtime: '2025-04-15T11:30:00',
    location: 'Via Roma 123, Milano',
    technician: 'Luca Bianchi',
    notes: 'Cliente interessato alla sostituzione di tutti gli infissi del primo piano.',
    venditoreId: '1'
  },
  { 
    id: '2', 
    title: 'Installazione finestre', 
    client: 'Laura Bianchi',
    type: 'installazione',
    datetime: '2025-04-15T14:00:00',
    endtime: '2025-04-15T18:00:00',
    location: 'Via Verdi 45, Roma',
    technician: 'Mario Verdi',
    notes: 'Portare tutti gli strumenti necessari e i 3 infissi già pronti.',
    venditoreId: '2'
  },
  { 
    id: '3', 
    title: 'Riunione con Costruzioni Veloci', 
    client: 'Costruzioni Veloci SRL',
    type: 'riunione',
    datetime: '2025-04-16T09:30:00',
    endtime: '2025-04-16T10:30:00',
    location: 'Sede aziendale',
    technician: 'Direttore Tecnico',
    notes: 'Discutere della collaborazione sul progetto di via Milano.'
  },
  { 
    id: '4', 
    title: 'Sopralluogo appartamento', 
    client: 'Giuseppe Verdi',
    type: 'sopralluogo',
    datetime: '2025-04-17T11:00:00',
    endtime: '2025-04-17T12:30:00',
    location: 'Via Napoli 67, Bologna',
    technician: 'Luca Bianchi',
    notes: 'Cliente interessato a porte interne e portoncino.'
  },
  { 
    id: '5', 
    title: 'Consegna materiale', 
    client: 'Progetti Edilizi SpA',
    type: 'consegna',
    datetime: '2025-04-17T15:00:00',
    endtime: '2025-04-17T16:00:00',
    location: 'Cantiere Via Torino 89, Milano',
    technician: 'Autista',
    notes: 'Consegna 5 portefinestre e accessori.'
  }
] as AppointmentFormData[];

const Appuntamenti = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentFormData[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(initialAppointments);
      localStorage.setItem('appointments', JSON.stringify(initialAppointments));
    }
  }, []);
  
  // Save appointments to localStorage when they change
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);
  
  const handleAddAppointment = (newAppointment: AppointmentFormData) => {
    setAppointments(prev => [...prev, newAppointment]);
    setDate(new Date(newAppointment.datetime));
    toast({
      title: "Appuntamento creato",
      description: `L'appuntamento "${newAppointment.title}" è stato aggiunto con successo.`
    });
  };
  
  const handleCompleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    setSelectedAppointment(null);
    toast({
      title: "Appuntamento completato",
      description: "L'appuntamento è stato contrassegnato come completato."
    });
  };
  
  const getFilteredAppointments = () => {
    if (!date) return [];
    
    const dateString = date.toISOString().split('T')[0];
    
    let filtered = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.datetime).toISOString().split('T')[0];
      return appointmentDate === dateString;
    });
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.type === typeFilter);
    }
    
    return filtered.sort((a, b) => {
      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    });
  };
  
  const todayAppointments = getFilteredAppointments();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Calendario Appuntamenti</h1>
            <p className="text-gray-500">Gestisci sopralluoghi, installazioni e riunioni</p>
          </div>
          
          <AppointmentDialog onAddAppointment={handleAddAppointment} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-[380px]">
            <AppointmentsCalendar
              date={date}
              onDateSelect={setDate}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
            />
          </div>
          
          <div className="flex-1">
            <AppointmentsList
              appointments={todayAppointments}
              selectedAppointment={selectedAppointment}
              onSelectAppointment={setSelectedAppointment}
              onCompleteAppointment={handleCompleteAppointment}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Appuntamenti;
