
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { AppointmentFormData, AppointmentType } from './types';

interface AddAppointmentDialogProps {
  onAddAppointment: (appointment: AppointmentFormData) => void;
}

export const AddAppointmentDialog = ({ onAddAppointment }: AddAppointmentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleAddAppointment = () => {
    // Create a new appointment with default values
    const newAppointment: AppointmentFormData = {
      id: uuidv4(),
      title: 'Nuovo appuntamento',
      client: '',
      type: 'sopralluogo', // Default type
      datetime: new Date().toISOString(),
      endtime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
      location: '',
      technician: '',
      notes: '',
    };
    
    onAddAppointment(newAppointment);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuovo appuntamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiungi appuntamento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Confermi di voler creare un nuovo appuntamento?</p>
          <Button onClick={handleAddAppointment}>
            Crea appuntamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
