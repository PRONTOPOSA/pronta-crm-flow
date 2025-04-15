
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { ProgettoItem } from '@/types/progetti';

interface ProjectListProps {
  projects: ProgettoItem[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="bg-white rounded-md shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium">Progetto</th>
              <th className="text-left p-4 font-medium">Cliente</th>
              <th className="text-left p-4 font-medium">Valore</th>
              <th className="text-left p-4 font-medium">Data</th>
              <th className="text-left p-4 font-medium">Stato</th>
              <th className="text-right p-4 font-medium">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.descrizione}</td>
                <td className="p-4">{item.cliente}</td>
                <td className="p-4">{item.valore}</td>
                <td className="p-4">
                  {item.tipo === 'preventivo' 
                    ? item.data 
                    : item.tipo === 'approvato' 
                      ? item.inizio 
                      : item.tipo === 'in-corso' 
                        ? item.inizio 
                        : item.completato}
                </td>
                <td className="p-4">
                  <Badge variant="outline" className={
                    item.tipo === 'preventivo' 
                      ? 'bg-blue-100 text-blue-800'
                      : item.tipo === 'approvato'
                        ? 'bg-purple-100 text-purple-800'
                        : item.tipo === 'in-corso'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                  }>
                    {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
