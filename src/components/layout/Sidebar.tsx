
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  PieChart, 
  FileText,
  Settings,
  LogOut,
  Mail,
  UserCircle,
  UsersIcon
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Define static roles for demonstration purposes
  const isAdmin = true; // For demo, we'll show all admin features
  const isVenditore = true; // For demo, we'll show all vendor features

  const handleLogout = async () => {
    try {
      // Se utilizzi Supabase auth, usa il metodo signOut
      // await supabase.auth.signOut();
      
      // Per demo, semplicemente mostra un toast di conferma
      toast({
        title: "Logout effettuato",
        description: "Sei stato disconnesso con successo.",
      });
      
      console.log("Logout clicked");
      // In una applicazione reale, qui redirigeresti alla pagina di login
      // navigate('/login');
    } catch (error) {
      console.error("Errore durante il logout:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il logout.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col shadow-lg hidden md:flex">
      <div className="p-4 border-b border-blue-800">
        <h1 className="text-xl font-bold text-center">ProntoPosa CRM</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/dashboard'} />
          <SidebarItem to="/contatti" icon={<Users size={20} />} label="Contatti" active={location.pathname === '/contatti'} />
          <SidebarItem to="/appuntamenti" icon={<Calendar size={20} />} label="Calendario" active={location.pathname === '/appuntamenti'} />
          <SidebarItem to="/progetti" icon={<FileText size={20} />} label="Progetti" active={location.pathname === '/progetti'} />
          <SidebarItem to="/venditori" icon={<UserCircle size={20} />} label="Venditori" active={location.pathname === '/venditori'} />
          <SidebarItem to="/comunicazioni" icon={<Mail size={20} />} label="Comunicazioni" active={location.pathname === '/comunicazioni'} />
          <SidebarItem to="/reportistica" icon={<PieChart size={20} />} label="Reportistica" active={location.pathname === '/reportistica'} />
          <SidebarItem to="/users" icon={<UsersIcon size={20} />} label="Utenti" active={location.pathname === '/users'} />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-800">
        <ul className="space-y-1 px-2">
          <SidebarItem to="/impostazioni" icon={<Settings size={20} />} label="Impostazioni" active={location.pathname === '/impostazioni'} />
          <li 
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md cursor-pointer transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active }) => {
  return (
    <li>
      <Link 
        to={to} 
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          active 
            ? 'bg-blue-800 text-white' 
            : 'text-gray-300 hover:bg-blue-800 hover:text-white'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
