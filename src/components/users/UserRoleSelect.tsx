
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User } from '@/hooks/useUserManagement';

interface UserRoleSelectProps {
  currentRole: 'admin' | 'operatore';
  onRoleChange: (role: 'admin' | 'operatore') => void;
}

export const UserRoleSelect = ({ currentRole, onRoleChange }: UserRoleSelectProps) => {
  return (
    <Select
      value={currentRole}
      onValueChange={onRoleChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleziona ruolo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Amministratore</SelectItem>
        <SelectItem value="operatore">Operatore</SelectItem>
      </SelectContent>
    </Select>
  );
};
