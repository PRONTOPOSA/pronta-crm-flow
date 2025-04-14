
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, MapPin } from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  client: string;
  datetime: string;
  location: string;
  type: 'sopralluogo' | 'installazione' | 'riunione';
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Prossimi appuntamenti</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-start p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-colors">
              <div className="h-12 w-12 flex flex-col items-center justify-center rounded-md bg-primary/10 text-primary mr-4">
                <span className="text-xs font-medium">{new Date(appointment.datetime).toLocaleString('it-IT', { month: 'short' })}</span>
                <span className="text-lg font-bold">{new Date(appointment.datetime).getDate()}</span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium">{appointment.title}</h4>
                <p className="text-sm text-gray-500">{appointment.client}</p>
                
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <CalendarClock size={14} className="mr-1" />
                  <span>{new Date(appointment.datetime).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                  <MapPin size={14} className="ml-3 mr-1" />
                  <span>{appointment.location}</span>
                </div>
              </div>
              
              <div className="ml-2">
                <span className={`text-xs rounded-full px-2 py-1 ${
                  appointment.type === 'sopralluogo' 
                    ? 'bg-blue-100 text-blue-700' 
                    : appointment.type === 'installazione'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-100 text-purple-700'
                }`}>
                  {appointment.type === 'sopralluogo' 
                    ? 'Sopralluogo' 
                    : appointment.type === 'installazione'
                      ? 'Installazione'
                      : 'Riunione'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
