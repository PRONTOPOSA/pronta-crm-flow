
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';

interface AppointmentsCalendarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}

export const AppointmentsCalendar = ({
  date,
  onDateSelect,
  typeFilter,
  onTypeFilterChange
}: AppointmentsCalendarProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Calendario</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          className="rounded-md border"
          initialFocus
        />
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 inline-block mr-1" />
            {date ? (
              <span>{date.toLocaleDateString('it-IT', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            ) : (
              <span>Seleziona una data</span>
            )}
          </div>
          
          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filtra per" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti</SelectItem>
              <SelectItem value="sopralluogo">Sopralluoghi</SelectItem>
              <SelectItem value="installazione">Installazioni</SelectItem>
              <SelectItem value="riunione">Riunioni</SelectItem>
              <SelectItem value="consegna">Consegne</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
