
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
  UserCircle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, currentUserProfile } = useAuth();
  
  const userRole = currentUserProfile?.ruolo || 'operatore';
  const isAdmin = userRole === 'admin';
  const isVenditore = userRole === 'venditore';

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout effettuato",
        description: "Sei stato disconnesso con successo.",
      });
      navigate('/auth');
    } catch (error) {
      console.error("Errore durante il logout:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il logout",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col shadow-lg hidden md:flex">
      <div className="p-4 border-b border-blue-800">
        <h1 className="text-xl font-bold text-center">ProntoPosa CRM</h1>
        {currentUserProfile && (
          <p className="text-sm text-center text-gray-300 mt-1">
            {currentUserProfile.nome} {currentUserProfile.cognome} - {userRole === 'admin' ? 'Amministratore' : userRole === 'venditore' ? 'Venditore' : 'Operatore'}
          </p>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={location.pathname === '/dashboard'} />
          
          {/* Menu items accessible to admin and operators only */}
          {!isVenditore && (
            <SidebarItem to="/contatti" icon={<Users size={20} />} label="Contatti" active={location.pathname === '/contatti'} />
          )}
          
          {/* Appointment menu visible to all roles */}
          <SidebarItem to="/appuntamenti" icon={<Calendar size={20} />} label="Calendario" active={location.pathname === '/appuntamenti'} />
          
          {/* Projects visible to all roles */}
          <SidebarItem to="/progetti" icon={<FileText size={20} />} label="Progetti" active={location.pathname === '/progetti'} />
          
          {/* Admin only menu items */}
          {isAdmin && (
            <>
              <SidebarItem to="/venditori" icon={<UserCircle size={20} />} label="Venditori" active={location.pathname === '/venditori'} />
              <SidebarItem to="/comunicazioni" icon={<Mail size={20} />} label="Comunicazioni" active={location.pathname === '/comunicazioni'} />
              <SidebarItem to="/reportistica" icon={<PieChart size={20} />} label="Reportistica" active={location.pathname === '/reportistica'} />
            </>
          )}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-800">
        <ul className="space-y-1 px-2">
          {isAdmin && (
            <SidebarItem to="/impostazioni" icon={<Settings size={20} />} label="Impostazioni" active={location.pathname === '/impostazioni'} />
          )}
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
