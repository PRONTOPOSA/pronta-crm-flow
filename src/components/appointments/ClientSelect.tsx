
import React, { useState, useEffect } from 'react';
import { Check, ChevronsUpDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

interface Client {
  id: string;
  nome: string;
}

interface ClientSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ClientSelect = ({ value, onChange }: ClientSelectProps) => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock client data (in caso di problemi con il DB)
  const mockClients = [
    { id: '1', nome: 'Marco Rossi' },
    { id: '2', nome: 'Laura Bianchi' },
    { id: '3', nome: 'Giuseppe Verdi' },
    { id: '4', nome: 'Francesca Neri' },
    { id: '5', nome: 'Antonio Russo' },
    { id: '6', nome: 'Serramenti Moderni SRL' },
    { id: '7', nome: 'Infissi Premium SpA' },
  ];

  // Fetch clients from database or use mock data
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        // Try to get clients from the database
        // Note: Adjust this query based on your actual database schema
        const { data, error } = await supabase
          .from('profiles')
          .select('id, nome, cognome')
          .order('nome');

        if (error || !data) {
          console.error("Error fetching clients:", error);
          // Fallback to mock data if database query fails
          setClients(mockClients);
        } else {
          // Format the data to include full name (nome + cognome)
          const formattedClients = data.map(client => ({
            id: client.id,
            nome: `${client.nome} ${client.cognome || ''}`.trim()
          }));
          setClients(formattedClients);
        }
      } catch (error) {
        console.error("Error:", error);
        setClients(mockClients);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Filter clients based on search input
  const filterClients = (searchValue: string) => {
    if (!searchValue) return clients;
    
    // Case-insensitive search
    const lowercaseSearch = searchValue.toLowerCase();
    return clients.filter(client => 
      client.nome.toLowerCase().includes(lowercaseSearch)
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Seleziona cliente..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command className="pointer-events-auto">
          <CommandInput placeholder="Cerca cliente..." />
          <CommandEmpty>
            {loading ? 'Caricamento...' : 'Nessun cliente trovato.'}
          </CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                value={client.nome}
                onSelect={() => {
                  onChange(client.nome);
                  setOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                {client.nome}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === client.nome ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ClientSelect;
