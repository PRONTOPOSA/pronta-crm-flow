
import React from 'react';
import { Input } from "@/components/ui/input";

interface ClientSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClientSelect = ({ value, onChange }: ClientSelectProps) => {
  return (
    <Input
      placeholder="Inserisci nome e cognome del cliente..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ClientSelect;
