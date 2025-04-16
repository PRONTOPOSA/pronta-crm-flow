
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { AppointmentDialog, AppointmentFormData } from '@/components/appointments/AppointmentDialog';
import { toast } from '@/components/ui/use-toast';
import { AppointmentsCalendar } from '@/components/appointments/AppointmentsCalendar';
import { AppointmentsList } from '@/components/appointments/AppointmentsList';
import { useUserManagement } from '@/hooks/useUserManagement';
import { supabase } from '@/integrations/supabase/client';

const Appuntamenti = () => {
  const { currentUserProfile } = useUserManagement();
  const isVenditore = currentUserProfile?.ruolo === 'venditore';
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentFormData[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [venditoreId, setVenditoreId] = useState<string | undefined>(undefined);
  
  // Fetch venditore_id if the user is a venditore
  useEffect(() => {
    const fetchVenditoreId = async () => {
      if (isVenditore && currentUserProfile) {
        const { data: venditoreData } = await supabase
          .from('venditori')
          .select('id')
          .eq('user_id', currentUserProfile.id)
          .single();
        
        if (venditoreData) {
          setVenditoreId(venditoreData.id);
        }
      }
    };

    fetchVenditoreId();
  }, [isVenditore, currentUserProfile]);
  
  // Load appointments from database or localStorage
  useEffect(() => {
    const loadAppointments = async () => {
      // Try to load from database first
      let query = supabase.from('appuntamenti').select('*');
      
      // If user is a venditore, only show their appointments
      if (isVenditore && venditoreId) {
        query = query.eq('venditore_id', venditoreId);
      }

      const { data, error } = await query;
      
      if (data && data.length > 0) {
        setAppointments(data.map(app => ({
          id: app.id,
          title: app.title,
          client: app.client,
          type: app.type,
          datetime: app.datetime,
          endtime: app.endtime || '',
          location: app.location || '',
          technician: app.technician || '',
          notes: app.notes || '',
          venditoreId: app.venditore_id
        })));
      } else {
        // Fallback to localStorage if no data in database
        const savedAppointments = localStorage.getItem('appointments');
        if (savedAppointments) {
          let parsedAppointments = JSON.parse(savedAppointments);
          
          // If user is a venditore, filter to only show their appointments
          if (isVenditore && venditoreId) {
            parsedAppointments = parsedAppointments.filter(
              (app: AppointmentFormData) => app.venditoreId === venditoreId
            );
          }
          
          setAppointments(parsedAppointments);
        }
      }
    };
    
    loadAppointments();
  }, [isVenditore, venditoreId]);
  
  const handleAddAppointment = async (newAppointment: AppointmentFormData) => {
    try {
      // Try to save to database first
      const { data, error } = await supabase
        .from('appuntamenti')
        .insert({
          id: newAppointment.id,
          title: newAppointment.title,
          client: newAppointment.client,
          type: newAppointment.type,
          datetime: newAppointment.datetime,
          endtime: newAppointment.endtime,
          location: newAppointment.location,
          notes: newAppointment.notes,
          venditore_id: newAppointment.venditoreId
        })
        .select();
      
      if (error) throw error;
      
      // Update local state
      setAppointments(prev => [...prev, newAppointment]);
      setDate(new Date(newAppointment.datetime));
      
      toast({
        title: "Appuntamento creato",
        description: `L'appuntamento "${newAppointment.title}" è stato aggiunto con successo.`
      });
      
      // Update localStorage as backup
      const updatedAppointments = [...appointments, newAppointment];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    } catch (error: any) {
      console.error('Errore durante la creazione dell\'appuntamento:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore durante la creazione dell'appuntamento",
        variant: "destructive"
      });
      
      // Fallback to localStorage only
      setAppointments(prev => [...prev, newAppointment]);
      localStorage.setItem('appointments', JSON.stringify([...appointments, newAppointment]));
    }
  };
  
  const handleCompleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    setSelectedAppointment(null);
    toast({
      title: "Appuntamento completato",
      description: "L'appuntamento è stato contrassegnato come completato."
    });
    
    // Also update localStorage
    const updatedAppointments = appointments.filter(app => app.id !== id);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Try to delete from database
    supabase.from('appuntamenti').delete().eq('id', id);
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
            <p className="text-gray-500">
              {isVenditore 
                ? "Visualizza i tuoi appuntamenti assegnati"
                : "Gestisci sopralluoghi, installazioni e riunioni"}
            </p>
            {isVenditore && venditoreId && (
              <p className="text-sm text-blue-600 mt-1">
                Stai visualizzando solo i tuoi appuntamenti
              </p>
            )}
          </div>
          
          {!isVenditore && (
            <AppointmentDialog onAddAppointment={handleAddAppointment} />
          )}
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
              onCompleteAppointment={!isVenditore ? handleCompleteAppointment : undefined}
              readOnly={isVenditore}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Appuntamenti;
