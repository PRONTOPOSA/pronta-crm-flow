
import React from 'react';
import { AppointmentsList } from '@/components/appointments/AppointmentsList';
import { AppointmentDialog } from '@/components/appointments/AppointmentDialog';
import { DateSelector } from '@/components/appointments/DateSelector';
import { AppointmentsFilters } from '@/components/appointments/AppointmentsFilters';
import { useAppointments } from '@/hooks/useAppointments';

const Appuntamenti = () => {
  const {
    date,
    setDate,
    appointments,
    selectedAppointment,
    setSelectedAppointment,
    isVenditore,
    selectedType,
    setSelectedType,
    venditori,
    selectedVenditoreId,
    setSelectedVenditoreId
  } = useAppointments();

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <DateSelector date={date} onDateSelect={setDate} />

          <div className="mt-4">
            <AppointmentsFilters
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              isVenditore={isVenditore}
              venditori={venditori}
              selectedVenditoreId={selectedVenditoreId}
              onVenditoreChange={setSelectedVenditoreId}
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <AppointmentsList 
            appointments={appointments}
            selectedAppointment={selectedAppointment}
            onSelectAppointment={setSelectedAppointment}
            readOnly={isVenditore}
          />
        </div>
        
        <div className="md:col-span-1">
          <AppointmentDialog />
        </div>
      </div>
    </div>
  );
};

export default Appuntamenti;
