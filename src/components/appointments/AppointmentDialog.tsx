
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AppointmentForm } from './AppointmentForm';
import { AppointmentFormData } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/AuthContext';

interface AppointmentDialogProps {
  onAddAppointment?: (appointment: AppointmentFormData) => void;
}

export const AppointmentDialog = ({ onAddAppointment }: AppointmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  
  const [newAppointment, setNewAppointment] = useState<AppointmentFormData>({
    id: crypto.randomUUID(),
    title: '',
    client: '',
    type: 'sopralluogo',
    datetime: '',
    endtime: '',
    location: '',
    technician: '',
    notes: '',
    venditoreId: user?.id || undefined
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      type: value as AppointmentFormData['type']
    }));
  };

  const handleVenditoreChange = (venditoreId: string | undefined) => {
    setNewAppointment(prev => ({
      ...prev,
      venditoreId
    }));
  };

  const handleClientChange = (clientName: string) => {
    setNewAppointment(prev => ({
      ...prev,
      client: clientName
    }));
  };

  const handleAddAppointment = async () => {
    // Validazione dei campi obbligatori
    if (!newAppointment.title.trim()) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "Il titolo dell'appuntamento è obbligatorio.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newAppointment.client.trim()) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "Il nome del cliente è obbligatorio.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newAppointment.datetime) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "La data e l'ora dell'appuntamento sono obbligatorie.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newAppointment.venditoreId) {
      toast({
        title: "Campo obbligatorio mancante",
        description: "È necessario selezionare un venditore.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Make sure endtime is set if not provided
      if (!newAppointment.endtime && newAppointment.datetime) {
        // Default to 1 hour after start time
        const startDate = new Date(newAppointment.datetime);
        startDate.setHours(startDate.getHours() + 1);
        newAppointment.endtime = startDate.toISOString();
      }

      // Salvataggio nel database
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
        });

      if (error) {
        console.error("Error saving appointment:", error);
        toast({
          title: "Errore",
          description: "Si è verificato un errore durante il salvataggio dell'appuntamento.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Appuntamento aggiunto",
        description: `${newAppointment.title} è stato aggiunto con successo.`,
      });
      
      if (onAddAppointment) {
        onAddAppointment(newAppointment);
      }
      
      // Reset form
      setNewAppointment({
        id: crypto.randomUUID(),
        title: '',
        client: '',
        type: 'sopralluogo',
        datetime: '',
        endtime: '',
        location: '',
        technician: '',
        notes: '',
        venditoreId: user?.id || undefined
      });
      
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il salvataggio dell'appuntamento.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuovo Appuntamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Nuovo Appuntamento</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli del nuovo appuntamento. Clicca su Aggiungi quando hai finito.
          </DialogDescription>
        </DialogHeader>
        
        <AppointmentForm
          appointment={newAppointment}
          onInputChange={handleInputChange}
          onTypeChange={handleTypeChange}
          onVenditoreChange={handleVenditoreChange}
          onClientChange={handleClientChange}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annulla</Button>
          </DialogClose>
          <Button 
            onClick={handleAddAppointment} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvataggio...' : 'Aggiungi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { type AppointmentFormData };
