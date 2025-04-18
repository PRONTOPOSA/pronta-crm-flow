
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/AuthContext';
import { format } from "date-fns";
import { AppointmentFormData } from '@/components/appointments/types';

export const useAppointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<AppointmentFormData[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormData | null>(null);
  const [isVenditore, setIsVenditore] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [venditori, setVenditori] = useState<Array<{id: string, nome: string, cognome: string}>>([]);
  const [selectedVenditoreId, setSelectedVenditoreId] = useState<string | undefined>(undefined);
  
  const { toast } = useToast();
  const { user, currentUserProfile } = useUser();

  useEffect(() => {
    if (currentUserProfile?.ruolo === 'venditore') {
      setIsVenditore(true);
    } else {
      setIsVenditore(false);
    }
  }, [currentUserProfile]);

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
          const mappedData = data.map(item => ({
            id: item.id,
            title: item.title,
            client: item.client,
            type: item.type as 'sopralluogo' | 'installazione' | 'riunione' | 'consegna',
            datetime: item.datetime,
            endtime: item.endtime || '',
            location: item.location,
            technician: '',
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

  return {
    date,
    setDate,
    appointments,
    selectedAppointment,
    setSelectedAppointment,
    isVenditore,
    selectedType,
    setSelectedType,
    isLoading,
    venditori,
    selectedVenditoreId,
    setSelectedVenditoreId
  };
};
