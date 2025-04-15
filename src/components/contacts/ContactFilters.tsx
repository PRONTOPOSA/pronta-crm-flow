
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  SheetFooter, 
  SheetClose 
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface ContactFiltersProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: any) => void;
}

export const ContactFilters = ({ onSearch, onFilterChange }: ContactFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    tipo: 'tutti',
    fonte: '',
    città: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    onFilterChange && onFilterChange(filters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      tipo: 'tutti',
      fonte: '',
      città: '',
    };
    setFilters(defaultFilters);
    onFilterChange && onFilterChange(defaultFilters);
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
      
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtri Contatti</SheetTitle>
            <SheetDescription>
              Filtra i contatti per trovare esattamente ciò che stai cercando.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <Label>Tipo contatto</Label>
              <Select value={filters.tipo} onValueChange={(value) => handleFilterChange('tipo', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutti">Tutti</SelectItem>
                  <SelectItem value="privato">Privato</SelectItem>
                  <SelectItem value="azienda">Azienda</SelectItem>
                  <SelectItem value="fornitore">Fornitore</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Fonte</Label>
              <Select value={filters.fonte} onValueChange={(value) => handleFilterChange('fonte', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona fonte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tutte</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="sito">Sito Web</SelectItem>
                  <SelectItem value="fiera">Fiera</SelectItem>
                  <SelectItem value="passaparola">Passaparola</SelectItem>
                  <SelectItem value="pubblicità">Pubblicità</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Città</Label>
              <Input 
                placeholder="Filtra per città"
                value={filters.città}
                onChange={(e) => handleFilterChange('città', e.target.value)}
              />
            </div>
          </div>
          
          <SheetFooter className="flex flex-row justify-between sm:justify-between">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <SheetClose asChild>
              <Button onClick={applyFilters}>Applica Filtri</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
