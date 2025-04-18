
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AppointmentsList } from '@/components/appointments/AppointmentsList';
import { AppointmentDialog } from '@/components/appointments/AppointmentDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppointmentFormData } from '@/components/appointments/types';

const Appuntamenti = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<AppointmentFormData[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormData | null>(null);
  const [isVenditore, setIsVenditore] = useState(false);
  const { toast } = useToast();
  const { user, currentUserProfile } = useUser();
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [venditori, setVenditori] = useState<Array<{id: string, nome: string, cognome: string}>>([]);
  const [selectedVenditoreId, setSelectedVenditoreId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (currentUserProfile?.ruolo === 'venditore') {
      setIsVenditore(true);
    } else {
      setIsVenditore(false);
    }
  }, [currentUserProfile]);

  // Fetch venditori if user is not a venditore
  useEffect(() => {
    const fetchVenditori = async () => {
      if (!isVenditore) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, nome, cognome')
            .eq('ruolo', 'venditore');

          if (error) {
            console.error("Error fetching venditori:", error);
            return;
          }

          if (data) {
            setVenditori(data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchVenditori();
  }, [isVenditore]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!date) return;

      try {
        setIsLoading(true);
        const formattedDate = format(date, 'yyyy-MM-dd');
        
        // Create query based on the correct table name "appuntamenti" (not "appointments")
        let query = supabase
          .from('appuntamenti')
          .select('*')
          .gte('datetime', `${formattedDate}T00:00:00+00:00`)
          .lt('datetime', `${formattedDate}T23:59:59+00:00`);

        if (selectedType !== 'all') {
          query = query.eq('type', selectedType);
        }

        if (isVenditore && user?.id) {
          query = query.eq('venditore_id', user.id);
        } else if (selectedVenditoreId) {
          query = query.eq('venditore_id', selectedVenditoreId);
        }

        const { data, error } = await query;

        if (error) {
          toast({
            title: "Errore nel caricamento degli appuntamenti",
            description: "Si è verificato un errore nel caricamento degli appuntamenti dal database.",
            variant: "destructive"
          });
          console.error("Error fetching appointments:", error);
          setAppointments([]);
        } else if (data) {
          // Map the data to the correct format expected by AppointmentsList
          const mappedData = data.map(item => ({
            id: item.id,
            title: item.title,
            client: item.client,
            type: item.type as 'sopralluogo' | 'installazione' | 'riunione' | 'consegna',
            datetime: item.datetime,
            endtime: item.endtime || '',
            location: item.location,
            technician: '', // This field is needed by AppointmentFormData but not in the DB
            notes: item.notes || '',
            venditoreId: item.venditore_id
          }));
          setAppointments(mappedData);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Errore",
          description: "Si è verificato un errore durante il caricamento degli appuntamenti.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [date, toast, isVenditore, user?.id, selectedType, selectedVenditoreId]);

  const handleAppointmentSelect = (appointment: AppointmentFormData) => {
    setSelectedAppointment(appointment);
  };

  const handleAddAppointment = (newAppointment: AppointmentFormData) => {
    // Here we'd normally send the appointment to the server
    // For now we'll just update the local state
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarUI
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="mt-4">
            <Label htmlFor="type">Filtra per tipo:</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Tutti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti</SelectItem>
                <SelectItem value="sopralluogo">Sopralluogo</SelectItem>
                <SelectItem value="installazione">Installazione</SelectItem>
                <SelectItem value="riunione">Riunione</SelectItem>
                <SelectItem value="consegna">Consegna</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!isVenditore && (
            <div className="mt-4">
              <Label htmlFor="venditore">Filtra per venditore:</Label>
              <Select 
                value={selectedVenditoreId || "all"} 
                onValueChange={(value) => setSelectedVenditoreId(value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tutti i venditori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i venditori</SelectItem>
                  {venditori.map((venditore) => (
                    <SelectItem key={venditore.id} value={venditore.id}>
                      {venditore.nome} {venditore.cognome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <AppointmentsList 
            appointments={appointments}
            selectedAppointment={selectedAppointment}
            onSelectAppointment={handleAppointmentSelect}
            readOnly={isVenditore}
          />
        </div>
        
        <div className="md:col-span-1">
          <AppointmentDialog 
            onAddAppointment={handleAddAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default Appuntamenti;
