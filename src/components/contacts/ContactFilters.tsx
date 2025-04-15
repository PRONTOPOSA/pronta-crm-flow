
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export const ContactFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          type="text" 
          placeholder="Cerca per nome, email, telefono..." 
          className="pl-10 w-full"
        />
      </div>
      
      <Button variant="outline" className="flex items-center">
        <Filter className="h-4 w-4 mr-2" />
        Filtri
      </Button>
    </div>
  );
};
