
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface ContactFiltersProps {
  onSearch?: (term: string) => void;
}

export const ContactFilters = ({ onSearch }: ContactFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          type="text" 
          placeholder="Cerca per nome, email, telefono..." 
          className="pl-10 w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <Button variant="outline" className="flex items-center">
        <Filter className="h-4 w-4 mr-2" />
        Filtri
      </Button>
    </div>
  );
};
