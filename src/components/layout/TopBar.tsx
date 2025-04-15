
import React from 'react';
import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopBar = () => {
  // Demo user profile
  const profile = {
    nome: "Mario",
    cognome: "Rossi",
    email: "mario.rossi@example.com"
  };
  
  // Define static roles for demo
  const isAdmin = true;
  const isVenditore = false;
  const isOperatore = false;

  const getRoleName = () => {
    if (isAdmin) return "Amministratore";
    if (isVenditore) return "Venditore";
    if (isOperatore) return "Operatore";
    return "Utente";
  };

  const getInitials = () => {
    if (!profile) return "U";
    return `${profile.nome.charAt(0)}${profile.cognome.charAt(0)}`;
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // In a real app, this would handle logout
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-white">{getInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {profile ? `${profile.nome} ${profile.cognome}` : "Utente"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profilo
              </DropdownMenuItem>
              <DropdownMenuItem>
                {getRoleName()}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium">
              {profile ? `${profile.nome} ${profile.cognome}` : "Utente"}
            </p>
            <p className="text-xs text-gray-500">{getRoleName()}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
