
import React, { useState, ChangeEvent } from 'react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, CalendarClock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import VenditoreSelect from '@/components/dashboard/VenditoreSelect';
import ClientSelect from './ClientSelect';

export interface AppointmentFormData {
  id: string;
  title: string;
  client: string;
  type: 'sopralluogo' | 'installazione' | 'riunione' | 'consegna';
  datetime: string;
  endtime: string;
  location: string;
  technician: string;
  notes: string;
  venditoreId?: string;
}

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      type: value as 'sopralluogo' | 'installazione' | 'riunione' | 'consegna'
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
    if (!newAppointment.title || !newAppointment.client || !newAppointment.datetime) {
      toast({
        title: "Errore",
        description: "Titolo, cliente e data/ora sono campi obbligatori.",
        variant: "destructive"
      });
      return;
    }
    
    // Notifica l'aggiunta dell'appuntamento
    toast({
      title: "Appuntamento aggiunto",
      description: `${newAppointment.title} è stato aggiunto con successo.`,
    });
    
    // Passa il nuovo appuntamento al componente principale
    if (onAddAppointment) {
      onAddAppointment(newAppointment);
    }
    
    // Resetta il form
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
    
    // Chiude il dialog dopo aver aggiunto l'appuntamento
    setOpen(false);
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="title">Titolo Appuntamento</Label>
            <Input 
              id="title" 
              name="title" 
              value={newAppointment.title} 
              onChange={handleInputChange}
              placeholder="Es. Sopralluogo per infissi"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="client">Cliente</Label>
            <ClientSelect
              value={newAppointment.client}
              onChange={handleClientChange}
            />
          </div>
            
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="type">Tipo Appuntamento</Label>
            <Select value={newAppointment.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sopralluogo">Sopralluogo</SelectItem>
                <SelectItem value="installazione">Installazione</SelectItem>
                <SelectItem value="riunione">Riunione</SelectItem>
                <SelectItem value="consegna">Consegna</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="datetime">Data e Ora Inizio</Label>
              <div className="flex gap-2">
                <Input 
                  id="date" 
                  name="date" 
                  type="date"
                  min={currentDate}
                  value={newAppointment.datetime.split('T')[0] || currentDate}
                  onChange={(e) => {
                    const time = newAppointment.datetime.split('T')[1] || `${currentTime}:00`;
                    setNewAppointment(prev => ({
                      ...prev,
                      datetime: `${e.target.value}T${time}`
                    }));
                  }}
                />
                <Input 
                  id="time" 
                  name="time" 
                  type="time"
                  value={newAppointment.datetime.split('T')[1]?.substring(0, 5) || currentTime}
                  onChange={(e) => {
                    const date = newAppointment.datetime.split('T')[0] || currentDate;
                    setNewAppointment(prev => ({
                      ...prev,
                      datetime: `${date}T${e.target.value}:00`
                    }));
                  }}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endtime">Data e Ora Fine</Label>
              <div className="flex gap-2">
                <Input 
                  id="endDate" 
                  name="endDate" 
                  type="date"
                  min={newAppointment.datetime.split('T')[0] || currentDate}
                  value={newAppointment.endtime.split('T')[0] || newAppointment.datetime.split('T')[0] || currentDate}
                  onChange={(e) => {
                    const time = newAppointment.endtime.split('T')[1] || `${currentTime}:00`;
                    setNewAppointment(prev => ({
                      ...prev,
                      endtime: `${e.target.value}T${time}`
                    }));
                  }}
                />
                <Input 
                  id="endTime" 
                  name="endTime" 
                  type="time"
                  value={newAppointment.endtime.split('T')[1]?.substring(0, 5) || currentTime}
                  onChange={(e) => {
                    const date = newAppointment.endtime.split('T')[0] || newAppointment.datetime.split('T')[0] || currentDate;
                    setNewAppointment(prev => ({
                      ...prev,
                      endtime: `${date}T${e.target.value}:00`
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Luogo</Label>
              <Input 
                id="location" 
                name="location" 
                value={newAppointment.location} 
                onChange={handleInputChange}
                placeholder="Indirizzo o nome location"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="technician">Tecnico / Responsabile</Label>
              <Input 
                id="technician" 
                name="technician" 
                value={newAppointment.technician} 
                onChange={handleInputChange}
                placeholder="Nome del tecnico"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="venditore">Venditore</Label>
            <VenditoreSelect 
              value={newAppointment.venditoreId} 
              onChange={handleVenditoreChange}
              placeholder="Seleziona venditore"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={newAppointment.notes} 
              onChange={handleInputChange}
              placeholder="Inserisci eventuali note..."
              className="min-h-[100px]"
            />
          </div>
        </div>
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
