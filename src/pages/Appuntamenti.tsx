import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AppointmentsList } from '@/components/appointments/AppointmentsList';
import { AppointmentDialog } from '@/components/appointments/AppointmentDialog'; // Cambio qui: use AppointmentDialog
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Appuntamenti = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isVenditore, setIsVenditore] = useState(false);
  const { toast } = useToast();
  const { user, currentUserProfile } = useUser();
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (currentUserProfile?.ruolo === 'venditore') {
      setIsVenditore(true);
    } else {
      setIsVenditore(false);
    }
  }, [currentUserProfile]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!date) return;

      const formattedDate = format(date, 'yyyy-MM-dd');
      let query = supabase
        .from('appointments')
        .select('*')
        .gte('datetime', `${formattedDate}T00:00:00+00:00`)
        .lt('datetime', `${formattedDate}T23:59:59+00:00`);

      if (selectedType !== 'all') {
        query = query.eq('type', selectedType);
      }

      if (isVenditore && user?.id) {
        query = query.eq('venditoreId', user.id);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Errore nel caricamento degli appuntamenti",
          description: "Si è verificato un errore nel caricamento degli appuntamenti dal database.",
          variant: "destructive"
        });
        console.error("Error fetching appointments:", error);
      } else {
        setAppointments(data || []);
      }
    };

    fetchAppointments();
  }, [date, toast, isVenditore, user?.id, selectedType]);

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAddAppointment = (newAppointment) => {
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
                disabled={(date) =>
                  date > new Date()
                }
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
