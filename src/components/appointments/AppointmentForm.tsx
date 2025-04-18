
import React from 'react';
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
import VenditoreSelect from '@/components/dashboard/VenditoreSelect';
import ClientSelect from './ClientSelect';
import { AppointmentFormData } from './types';

interface AppointmentFormProps {
  appointment: AppointmentFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTypeChange: (value: string) => void;
  onVenditoreChange: (venditoreId: string | undefined) => void;
  onClientChange: (clientName: string) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  onInputChange,
  onTypeChange,
  onVenditoreChange,
  onClientChange
}) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  // Generate datetime string from date and time
  const handleDateTimeChange = (fieldName: string, value: string, timeOrDate: 'time' | 'date') => {
    // Get the current date/time values
    const currentValues = appointment[fieldName as keyof AppointmentFormData] as string || '';
    const [datePart, timePart] = currentValues.split('T');
    
    // Update either time or date part
    let newDateTime: string;
    if (timeOrDate === 'date') {
      const time = timePart || `${currentTime}:00`;
      newDateTime = `${value}T${time}`;
    } else {
      const date = datePart || currentDate;
      newDateTime = `${date}T${value}:00`;
    }
    
    // Create a synthetic event
    const syntheticEvent = {
      target: {
        name: fieldName,
        value: newDateTime
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInputChange(syntheticEvent);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="title">Titolo Appuntamento *</Label>
        <Input 
          id="title" 
          name="title" 
          value={appointment.title} 
          onChange={onInputChange}
          placeholder="Es. Sopralluogo per infissi"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="client">Cliente *</Label>
        <ClientSelect
          value={appointment.client}
          onChange={onClientChange}
        />
      </div>
        
      <div className="grid grid-cols-1 gap-2">
        <Label htmlFor="type">Tipo Appuntamento</Label>
        <Select value={appointment.type} onValueChange={onTypeChange}>
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
          <Label htmlFor="datetime">Data e Ora Inizio *</Label>
          <div className="flex gap-2">
            <Input 
              id="date" 
              name="date" 
              type="date"
              min={currentDate}
              value={appointment.datetime.split('T')[0] || currentDate}
              onChange={(e) => handleDateTimeChange('datetime', e.target.value, 'date')}
              required
            />
            <Input 
              id="time" 
              name="time" 
              type="time"
              value={appointment.datetime.split('T')[1]?.substring(0, 5) || currentTime}
              onChange={(e) => handleDateTimeChange('datetime', e.target.value, 'time')}
              required
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
              min={appointment.datetime.split('T')[0] || currentDate}
              value={appointment.endtime.split('T')[0] || appointment.datetime.split('T')[0] || currentDate}
              onChange={(e) => handleDateTimeChange('endtime', e.target.value, 'date')}
            />
            <Input 
              id="endTime" 
              name="endTime" 
              type="time"
              value={appointment.endtime.split('T')[1]?.substring(0, 5) || currentTime}
              onChange={(e) => handleDateTimeChange('endtime', e.target.value, 'time')}
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
            value={appointment.location} 
            onChange={onInputChange}
            placeholder="Indirizzo o nome location"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="technician">Tecnico / Responsabile</Label>
          <Input 
            id="technician" 
            name="technician" 
            value={appointment.technician} 
            onChange={onInputChange}
            placeholder="Nome del tecnico"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="venditore">Venditore</Label>
        <VenditoreSelect 
          value={appointment.venditoreId} 
          onChange={onVenditoreChange}
          placeholder="Seleziona venditore"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="notes">Note</Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={appointment.notes} 
          onChange={onInputChange}
          placeholder="Inserisci eventuali note..."
          className="min-h-[100px]"
        />
      </div>
      
      <div className="text-sm text-muted-foreground">
        I campi con * sono obbligatori
      </div>
    </div>
  );
};
