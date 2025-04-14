
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TopBar = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Menu size={24} />
        </Button>
      </div>
      
      <div className="flex-1 max-w-lg mx-4 hidden md:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Cerca clienti, progetti..." 
            className="pl-10 w-full bg-gray-50 focus:bg-white"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative text-gray-500">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-white">UT</AvatarFallback>
          </Avatar>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium">Utente Demo</p>
            <p className="text-xs text-gray-500">Amministratore</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
