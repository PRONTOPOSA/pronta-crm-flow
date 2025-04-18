
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AppointmentsFiltersProps {
  selectedType: string;
  setSelectedType: (value: string) => void;
  isVenditore: boolean;
  venditori: Array<{ id: string; nome: string; cognome: string }>;
  selectedVenditoreId?: string;
  onVenditoreChange: (value: string | undefined) => void;
}

export const AppointmentsFilters: React.FC<AppointmentsFiltersProps> = ({
  selectedType,
  setSelectedType,
  isVenditore,
  venditori,
  selectedVenditoreId,
  onVenditoreChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="type">Filtra per tipo:</Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Tutti" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti</SelectItem>
            <SelectItem value="sopralluogo">Sopralluogo</SelectItem>
            <SelectItem value="installazione">Installazione</SelectItem>
            <SelectItem value="riunione">Riunione</SelectItem>
            <SelectItem value="consegna">Consegna</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!isVenditore && (
        <div>
          <Label htmlFor="venditore">Filtra per venditore:</Label>
          <Select 
            value={selectedVenditoreId || "all"} 
            onValueChange={(value) => onVenditoreChange(value === "all" ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tutti i venditori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti i venditori</SelectItem>
              {venditori.map((venditore) => (
                <SelectItem key={venditore.id} value={venditore.id}>
                  {venditore.nome} {venditore.cognome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
