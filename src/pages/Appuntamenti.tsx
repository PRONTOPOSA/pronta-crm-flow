
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { AppointmentDialog, AppointmentFormData } from '@/components/appointments/AppointmentDialog';
import { toast } from '@/components/ui/use-toast';
import { mockVenditori } from '@/types/venditori';

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
  },
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
      // Initialize with mock data if no saved appointments
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
  
  // Add new appointment
  const handleAddAppointment = (newAppointment: AppointmentFormData) => {
    setAppointments(prev => [...prev, newAppointment]);
    // Set the calendar date to the new appointment date
    setDate(new Date(newAppointment.datetime));
    toast({
      title: "Appuntamento creato",
      description: `L'appuntamento "${newAppointment.title}" è stato aggiunto con successo.`
    });
  };
  
  // Complete an appointment
  const handleCompleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    setSelectedAppointment(null);
    toast({
      title: "Appuntamento completato",
      description: "L'appuntamento è stato contrassegnato come completato."
    });
  };
  
  // Update an appointment
  const handleUpdateAppointment = (updatedAppointment: AppointmentFormData) => {
    setAppointments(prev => 
      prev.map(app => app.id === updatedAppointment.id ? updatedAppointment : app)
    );
    toast({
      title: "Appuntamento aggiornato",
      description: `L'appuntamento "${updatedAppointment.title}" è stato aggiornato.`
    });
  };
  
  // Get appointments for the selected date, filtered by type if needed
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

  // Find venditore name from ID
  const getVenditoreName = (venditoreId: string | undefined) => {
    if (!venditoreId) return null;
    
    const venditore = mockVenditori.find(v => v.id === venditoreId);
    if (venditore) {
      return `${venditore.nome} ${venditore.cognome}`;
    }
    return null;
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
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Calendario</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  initialFocus
                />
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 inline-block mr-1" />
                    {date ? (
                      <span>{date.toLocaleDateString('it-IT', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    ) : (
                      <span>Seleziona una data</span>
                    )}
                  </div>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filtra per" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tutti</SelectItem>
                      <SelectItem value="sopralluogo">Sopralluoghi</SelectItem>
                      <SelectItem value="installazione">Installazioni</SelectItem>
                      <SelectItem value="riunione">Riunioni</SelectItem>
                      <SelectItem value="consegna">Consegne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle>
                  {todayAppointments.length > 0 
                    ? `Appuntamenti del giorno (${todayAppointments.length})` 
                    : 'Nessun appuntamento per la data selezionata'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {todayAppointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className={`p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedAppointment?.id === appointment.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.title}</h3>
                          <p className="text-sm text-gray-500">{appointment.client}</p>
                        </div>
                        
                        <Badge variant="outline" className={`
                          ${appointment.type === 'sopralluogo' ? 'bg-blue-100 text-blue-800' : 
                            appointment.type === 'installazione' ? 'bg-green-100 text-green-800' : 
                            appointment.type === 'riunione' ? 'bg-purple-100 text-purple-800' : 
                            'bg-yellow-100 text-yellow-800'}
                        `}>
                          {appointment.type === 'sopralluogo' ? 'Sopralluogo' : 
                           appointment.type === 'installazione' ? 'Installazione' : 
                           appointment.type === 'riunione' ? 'Riunione' : 'Consegna'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(appointment.datetime).toLocaleTimeString('it-IT', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} - {new Date(appointment.endtime).toLocaleTimeString('it-IT', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.location}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {appointment.technician}
                        </div>

                        {appointment.venditoreId && (
                          <div className="flex items-center text-sm text-gray-500">
                            <UserCheck className="h-4 w-4 mr-1" />
                            {getVenditoreName(appointment.venditoreId)}
                          </div>
                        )}
                      </div>
                      
                      {selectedAppointment?.id === appointment.id && (
                        <div className="mt-3 pt-3 border-t text-sm">
                          <p className="font-medium mb-1">Note:</p>
                          <p className="text-gray-600">{appointment.notes}</p>
                          
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              Modifica
                            </Button>
                            <Button 
                              size="sm" 
                              className="text-xs bg-green-600 hover:bg-green-700"
                              onClick={() => handleCompleteAppointment(appointment.id)}
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completa
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Appuntamenti;
