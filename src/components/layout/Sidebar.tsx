
import React from 'react';
import { Link } from 'react-router-dom';
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

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col shadow-lg hidden md:flex">
      <div className="p-4 border-b border-blue-800">
        <h1 className="text-xl font-bold text-center">ProntoPosa CRM</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/contatti" icon={<Users size={20} />} label="Contatti" />
          <SidebarItem to="/appuntamenti" icon={<Calendar size={20} />} label="Calendario" />
          <SidebarItem to="/progetti" icon={<FileText size={20} />} label="Progetti" />
          <SidebarItem to="/venditori" icon={<UserCircle size={20} />} label="Venditori" />
          <SidebarItem to="/comunicazioni" icon={<Mail size={20} />} label="Comunicazioni" />
          <SidebarItem to="/reportistica" icon={<PieChart size={20} />} label="Reportistica" />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-800">
        <ul className="space-y-1 px-2">
          <SidebarItem to="/impostazioni" icon={<Settings size={20} />} label="Impostazioni" />
          <li className="flex items-center px-4 py-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md cursor-pointer transition-colors">
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
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="flex items-center px-4 py-2 text-gray-300 hover:bg-blue-800 hover:text-white rounded-md transition-colors"
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
