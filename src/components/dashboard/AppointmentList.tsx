
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, MapPin, Clock, User } from 'lucide-react';
import VenditoreSelect from './VenditoreSelect';

interface Appointment {
  id: string;
  title: string;
  client: string;
  datetime: string;
  endtime?: string;
  location: string;
  type: 'sopralluogo' | 'installazione' | 'riunione' | 'consegna';
  notes?: string;
  venditore_id?: string;
  venditore_nome?: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  showVenditoreFilter?: boolean;
  onVenditoreChange?: (venditoreId: string | undefined) => void;
  selectedVenditoreId?: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  showVenditoreFilter = false,
  onVenditoreChange,
  selectedVenditoreId
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Prossimi appuntamenti</CardTitle>
          {showVenditoreFilter && onVenditoreChange && (
            <div className="w-full sm:w-64">
              <VenditoreSelect 
                value={selectedVenditoreId} 
                onChange={onVenditoreChange} 
                placeholder="Filtra per venditore" 
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Nessun appuntamento trovato
            </div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
                <div className="h-12 w-12 flex flex-col items-center justify-center rounded-md bg-primary/10 text-primary mr-4">
                  <span className="text-xs font-medium">{new Date(appointment.datetime).toLocaleString('it-IT', { month: 'short' })}</span>
                  <span className="text-lg font-bold">{new Date(appointment.datetime).getDate()}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{appointment.title}</h4>
                  <p className="text-sm text-gray-500">{appointment.client}</p>
                  
                  <div className="flex flex-wrap items-center mt-2 text-xs text-gray-500 gap-x-3 gap-y-1">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{new Date(appointment.datetime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                      {appointment.endtime && (
                        <span> - {new Date(appointment.endtime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{appointment.location}</span>
                    </div>
                    {appointment.venditore_nome && (
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        <span>{appointment.venditore_nome}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-2">
                  <Badge className={`${
                    appointment.type === 'sopralluogo' 
                      ? 'bg-blue-100 text-blue-700' 
                      : appointment.type === 'installazione'
                        ? 'bg-green-100 text-green-700'
                        : appointment.type === 'riunione'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.type === 'sopralluogo' 
                      ? 'Sopralluogo' 
                      : appointment.type === 'installazione'
                        ? 'Installazione'
                        : appointment.type === 'riunione'
                          ? 'Riunione'
                          : 'Consegna'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
