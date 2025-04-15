
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin, isVenditore, signOut } = useAuth();

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
          
          {/* I venditori possono vedere solo determinate sezioni */}
          {isAdmin && (
            <SidebarItem to="/venditori" icon={<UserCircle size={20} />} label="Venditori" active={location.pathname === '/venditori'} />
          )}
          
          <SidebarItem to="/comunicazioni" icon={<Mail size={20} />} label="Comunicazioni" active={location.pathname === '/comunicazioni'} />
          
          {/* Solo admin e venditori possono accedere alla reportistica */}
          {(isAdmin || isVenditore) && (
            <SidebarItem to="/reportistica" icon={<PieChart size={20} />} label="Reportistica" active={location.pathname === '/reportistica'} />
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
            onClick={() => signOut()}
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
