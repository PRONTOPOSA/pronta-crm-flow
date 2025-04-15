
import React, { useState, useMemo } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for clients - in a real app, this would come from an API or database
const clientsData = [
  { id: '1', name: 'Marco Rossi', email: 'marco.rossi@email.it' },
  { id: '2', name: 'Laura Bianchi', email: 'laura.b@email.it' },
  { id: '3', name: 'Giuseppe Verdi', email: 'g.verdi@email.it' },
  { id: '4', name: 'Francesca Neri', email: 'franc.neri@email.it' },
  { id: '5', name: 'Antonio Russo', email: 'a.russo@email.it' },
  { id: '6', name: 'Costruzioni Veloci SRL', email: 'info@costruzioniveloci.it' },
  { id: '7', name: 'Progetti Edilizi SpA', email: 'info@progettiedilizi.it' },
  { id: '8', name: 'Serramenti Moderni SRL', email: 'info@serramentimoderni.it' },
];

interface ClientSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClientSelect = ({ value, onChange }: ClientSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Defensive programming: ensure filteredClients is always an array
  const filteredClients = useMemo(() => {
    const filteredData = clientsData.filter(client => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return client.name.toLowerCase().includes(searchLower) || 
             client.email.toLowerCase().includes(searchLower);
    });
    
    return filteredData || []; // Return empty array if undefined
  }, [searchQuery]);

  const displayValue = value || "Seleziona cliente...";
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {displayValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Cerca cliente..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>Nessun cliente trovato.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {filteredClients.map((client) => (
              <CommandItem
                key={client.id}
                value={client.name}
                onSelect={() => {
                  onChange(client.name);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === client.name ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{client.name}</span>
                  <span className="text-xs text-muted-foreground">{client.email}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ClientSelect;
