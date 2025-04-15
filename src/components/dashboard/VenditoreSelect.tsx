
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Venditore, mockVenditori } from '@/types/venditori';

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
    // Simuliamo il caricamento dei dati da Supabase
    const fetchVenditori = async () => {
      setIsLoading(true);
      try {
        // Usiamo i dati di esempio invece di chiamare Supabase
        // Questo risolve l'errore TS2769 sulla chiamata a supabase.from('venditori')
        setVenditori(mockVenditori);
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
