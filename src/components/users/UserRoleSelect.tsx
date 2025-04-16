
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserRoleSelectProps {
  currentRole: 'admin' | 'operatore' | 'venditore';
  onRoleChange: (role: 'admin' | 'operatore' | 'venditore') => void;
}

export const UserRoleSelect = ({ currentRole, onRoleChange }: UserRoleSelectProps) => {
  return (
    <Select
      value={currentRole}
      onValueChange={(value: 'admin' | 'operatore' | 'venditore') => onRoleChange(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleziona ruolo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Amministratore</SelectItem>
        <SelectItem value="operatore">Operatore</SelectItem>
        <SelectItem value="venditore">Venditore</SelectItem>
      </SelectContent>
    </Select>
  );
};
