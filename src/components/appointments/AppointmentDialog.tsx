
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

interface AppointmentDialogProps {
  onAddAppointment?: (appointment: AppointmentFormData) => void;
}

export const AppointmentDialog = ({ onAddAppointment }: AppointmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState<AppointmentFormData>({
    id: crypto.randomUUID(),
    title: '',
    client: '',
    type: 'sopralluogo',
    datetime: '',
    endtime: '',
    location: '',
    technician: '',
    notes: ''
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

  const handleAddAppointment = () => {
    // Log the current state for debugging
    console.log("Attempting to add appointment:", newAppointment);
    
    // Only check for required fields: title, client, and datetime
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
    
    // If we reach here, all required fields are filled
    toast({
      title: "Appuntamento aggiunto",
      description: `${newAppointment.title} è stato aggiunto con successo.`,
    });
    
    if (onAddAppointment) {
      // Make sure endtime is set if not provided
      if (!newAppointment.endtime && newAppointment.datetime) {
        // Default to 1 hour after start time
        const startDate = new Date(newAppointment.datetime);
        startDate.setHours(startDate.getHours() + 1);
        newAppointment.endtime = startDate.toISOString();
      }
      
      onAddAppointment(newAppointment);
    }
    
    setNewAppointment({
      id: crypto.randomUUID(),
      title: '',
      client: '',
      type: 'sopralluogo',
      datetime: '',
      endtime: '',
      location: '',
      technician: '',
      notes: ''
    });
    
    setOpen(false);
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
          <Button onClick={handleAddAppointment}>Aggiungi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { type AppointmentFormData };
