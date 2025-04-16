
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentFormData } from './types';
import { AppointmentListItem } from './AppointmentListItem';

interface AppointmentsListProps {
  appointments: AppointmentFormData[];
  selectedAppointment: AppointmentFormData | null;
  onSelectAppointment: (appointment: AppointmentFormData) => void;
  onCompleteAppointment?: (id: string) => void;
  readOnly?: boolean;
}

export const AppointmentsList = ({
  appointments,
  selectedAppointment,
  onSelectAppointment,
  onCompleteAppointment,
  readOnly = false
}: AppointmentsListProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>
          {appointments.length > 0 
            ? `Appuntamenti del giorno (${appointments.length})` 
            : 'Nessun appuntamento per la data selezionata'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {appointments.map((appointment) => (
            <AppointmentListItem
              key={appointment.id}
              appointment={appointment}
              isSelected={selectedAppointment?.id === appointment.id}
              onSelect={onSelectAppointment}
              onComplete={onCompleteAppointment}
              readOnly={readOnly}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
