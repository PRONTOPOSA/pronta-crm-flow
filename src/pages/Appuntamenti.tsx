import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AppointmentsList } from '@/components/appointments/AppointmentsList';
import { AddAppointmentDialog } from '@/components/appointments/AddAppointmentDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AppointmentFormData, AppointmentType } from '@/components/appointments/types';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Appuntamenti = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<AppointmentFormData[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUserProfile } = useAuth();
  const [selectedVenditoreId, setSelectedVenditoreId] = useState<string | null>(null);
  const [availableVenditori, setAvailableVenditori] = useState<{ id: string; nome: string; cognome: string; }[]>([]);
  const [isVenditore, setIsVenditore] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (currentUserProfile?.ruolo === 'venditore') {
        setIsVenditore(true);
      } else {
        setIsVenditore(false);
      }
    };
    checkUserRole();
  }, [currentUserProfile]);

  useEffect(() => {
    const fetchVenditori = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, nome, cognome')
          .eq('ruolo', 'venditore');

        if (error) {
          console.error("Errore nel recupero dei venditori:", error);
          return;
        }

        if (data) {
          setAvailableVenditori(data.map(v => ({
            id: v.id,
            nome: v.nome,
            cognome: v.cognome
          })));
        }
      } catch (error) {
        console.error("Errore durante il recupero dei venditori:", error);
      }
    };

    fetchVenditori();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate, isVenditore, currentUserProfile?.id, selectedVenditoreId]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      
      // Create the base query
      let query = supabase
        .from('appuntamenti')
        .select('*');
      
      // Apply filtering based on user role
      if (isVenditore) {
        query = query.eq('venditore_id', currentUserProfile?.id);
      } else if (selectedVenditoreId) {
        query = query.eq('venditore_id', selectedVenditoreId);
      }
      
      // Filter by selected date if available
      if (selectedDate) {
        const dateStr = selectedDate.toISOString().split('T')[0];
        query = query.gte('datetime', `${dateStr}T00:00:00`)
                     .lt('datetime', `${dateStr}T23:59:59`);
      }
      
      // Execute the query
      const { data, error } = await query;
      
      if (data && data.length > 0) {
        const mappedData = data.map(app => ({
          id: app.id,
          title: app.title,
          client: app.client,
          type: app.type as AppointmentType,
          datetime: app.datetime,
          endtime: app.endtime || '',
          location: app.location,
          technician: '', // This field doesn't exist in database, using empty string
          notes: app.notes || '',
          venditoreId: app.venditore_id
        }));
        setAppointments(mappedData);
      } else {
        // Fallback to localStorage if no data in database
        const savedAppointments = localStorage.getItem('appointments');
        if (savedAppointments) {
          setAppointments(JSON.parse(savedAppointments));
        } else {
          setAppointments([]);
        }
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare gli appuntamenti',
        variant: 'destructive'
      });
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
  };

  const handleAppointmentSelect = (appointment: AppointmentFormData) => {
    setSelectedAppointment(appointment);
  };

  const handleAddAppointment = async (newAppointment: AppointmentFormData) => {
    try {
      const { data, error } = await supabase
        .from('appuntamenti')
        .insert([
          {
            id: newAppointment.id,
            title: newAppointment.title,
            client: newAppointment.client,
            type: newAppointment.type,
            datetime: newAppointment.datetime,
            endtime: newAppointment.endtime,
            location: newAppointment.location,
            notes: newAppointment.notes,
            venditore_id: isVenditore ? currentUserProfile?.id : selectedVenditoreId,
          },
        ]);

      if (error) {
        console.error("Errore nell'aggiunta dell'appuntamento:", error);
        toast({
          title: "Errore",
          description: "Errore nell'aggiunta dell'appuntamento",
          variant: "destructive"
        });
        return;
      }

      fetchAppointments();
      toast({
        title: "Successo",
        description: "Appuntamento aggiunto con successo",
      });
    } catch (error) {
      console.error("Errore durante l'aggiunta dell'appuntamento:", error);
      toast({
        title: "Errore",
        description: "Errore durante l'aggiunta dell'appuntamento",
        variant: "destructive"
      });
    }
  };

  const handleUpdateAppointment = async (updatedAppointment: AppointmentFormData) => {
    try {
      const { data, error } = await supabase
        .from('appuntamenti')
        .update({
          title: updatedAppointment.title,
          client: updatedAppointment.client,
          type: updatedAppointment.type,
          datetime: updatedAppointment.datetime,
          endtime: updatedAppointment.endtime,
          location: updatedAppointment.location,
          notes: updatedAppointment.notes,
        })
        .eq('id', updatedAppointment.id);
  
      if (error) {
        console.error("Errore nell'aggiornamento dell'appuntamento:", error);
        toast({
          title: "Errore",
          description: "Errore nell'aggiornamento dell'appuntamento",
          variant: "destructive"
        });
        return;
      }
  
      fetchAppointments();
      toast({
        title: "Successo",
        description: "Appuntamento aggiornato con successo",
      });
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'appuntamento:", error);
      toast({
        title: "Errore",
        description: "Errore durante l'aggiornamento dell'appuntamento",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appuntamenti')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error("Errore nell'eliminazione dell'appuntamento:", error);
        toast({
          title: "Errore",
          description: "Errore nell'eliminazione dell'appuntamento",
          variant: "destructive"
        });
        return;
      }
  
      fetchAppointments();
      toast({
        title: "Successo",
        description: "Appuntamento eliminato con successo",
      });
    } catch (error) {
      console.error("Errore durante l'eliminazione dell'appuntamento:", error);
      toast({
        title: "Errore",
        description: "Errore durante l'eliminazione dell'appuntamento",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Calendar Section */}
        <div className="md:col-span-1">
          <div className="w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Seleziona una data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarUI
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) =>
                    date > new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {!isVenditore && (
            <div className="mt-4">
              <Label htmlFor="venditore">Seleziona Venditore</Label>
              <Select onValueChange={(value) => setSelectedVenditoreId(value)} value={selectedVenditoreId || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Tutti i venditori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tutti i venditori</SelectItem>
                  {availableVenditori.map((venditore) => (
                    <SelectItem key={venditore.id} value={venditore.id}>
                      {venditore.nome} {venditore.cognome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Appointments List Section */}
        <div className="md:col-span-2">
          <AppointmentsList
            appointments={appointments}
            selectedAppointment={selectedAppointment}
            onSelectAppointment={handleAppointmentSelect}
            readOnly={isVenditore}
          />
        </div>

        {/* Appointment Details and Add Appointment Section */}
        <div className="md:col-span-1">
          <AddAppointmentDialog onAddAppointment={handleAddAppointment} />
        </div>
      </div>
    </div>
  );
};

export default Appuntamenti;
