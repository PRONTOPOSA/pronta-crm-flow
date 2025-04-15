
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Venditore } from '@/types/venditori';
import { supabase } from '@/integrations/supabase/client';

interface VenditoreSelectProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
}

const VenditoreSelect: React.FC<VenditoreSelectProps> = ({ 
  value, 
  onChange, 
  placeholder = "Seleziona venditore" 
}) => {
  const [venditori, setVenditori] = useState<Venditore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVenditori = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('venditori')
          .select('*')
          .order('cognome', { ascending: true });
        
        if (error) throw error;
        setVenditori(data as Venditore[]);
      } catch (error) {
        console.error('Errore nel caricamento dei venditori:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenditori();
  }, []);

  const handleChange = (val: string) => {
    onChange(val === "none" ? undefined : val);
  };

  return (
    <Select 
      value={value || "none"} 
      onValueChange={handleChange} 
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Nessun venditore</SelectItem>
        {venditori.map((venditore) => (
          <SelectItem key={venditore.id} value={venditore.id}>
            {venditore.nome} {venditore.cognome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VenditoreSelect;
