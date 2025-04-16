
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, MapPin, Users, UserCheck } from 'lucide-react';
import { AppointmentFormData } from './types';
import { mockVenditori } from '@/types/venditori';

interface AppointmentListItemProps {
  appointment: AppointmentFormData;
  isSelected: boolean;
  onSelect: (appointment: AppointmentFormData) => void;
  onComplete?: (id: string) => void;
  readOnly?: boolean;
}

export const AppointmentListItem = ({
  appointment,
  isSelected,
  onSelect,
  onComplete,
  readOnly = false
}: AppointmentListItemProps) => {
  const getVenditoreName = (venditoreId: string | undefined) => {
    if (!venditoreId) return null;
    const venditore = mockVenditori.find(v => v.id === venditoreId);
    return venditore ? `${venditore.nome} ${venditore.cognome}` : null;
  };

  return (
    <div 
      className={`p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'border-primary bg-primary/5' : ''
      }`}
      onClick={() => onSelect(appointment)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{appointment.title}</h3>
          <p className="text-sm text-gray-500">{appointment.client}</p>
        </div>
        
        <Badge variant="outline" className={`
          ${appointment.type === 'sopralluogo' ? 'bg-blue-100 text-blue-800' : 
            appointment.type === 'installazione' ? 'bg-green-100 text-green-800' : 
            appointment.type === 'riunione' ? 'bg-purple-100 text-purple-800' : 
            'bg-yellow-100 text-yellow-800'}
        `}>
          {appointment.type === 'sopralluogo' ? 'Sopralluogo' : 
           appointment.type === 'installazione' ? 'Installazione' : 
           appointment.type === 'riunione' ? 'Riunione' : 'Consegna'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          {new Date(appointment.datetime).toLocaleTimeString('it-IT', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })} - {new Date(appointment.endtime).toLocaleTimeString('it-IT', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {appointment.location}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          {appointment.technician}
        </div>

        {appointment.venditoreId && (
          <div className="flex items-center text-sm text-gray-500">
            <UserCheck className="h-4 w-4 mr-1" />
            {getVenditoreName(appointment.venditoreId)}
          </div>
        )}
      </div>
      
      {isSelected && (
        <div className="mt-3 pt-3 border-t text-sm">
          <p className="font-medium mb-1">Note:</p>
          <p className="text-gray-600">{appointment.notes}</p>
          
          {!readOnly && onComplete && (
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                Modifica
              </Button>
              <Button 
                size="sm" 
                className="text-xs bg-green-600 hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(appointment.id);
                }}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completa
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
