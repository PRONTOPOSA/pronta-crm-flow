
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProgettoItem } from '@/types/progetti';

interface ProjectCardProps {
  item: ProgettoItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
  const getBadgeStyles = (tipo: ProgettoItem['tipo']) => {
    switch (tipo) {
      case 'preventivo':
        return 'bg-blue-100 text-blue-800';
      case 'approvato':
        return 'bg-purple-100 text-purple-800';
      case 'in-corso':
        return 'bg-yellow-100 text-yellow-800';
      case 'completato':
        return 'bg-green-100 text-green-800';
    }
  };

  const renderCardContent = () => {
    return (
      <>
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{item.descrizione}</h4>
          <Badge variant="outline" className={getBadgeStyles(item.tipo)}>
            {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          <User className="h-3 w-3 mr-1" /> {item.cliente}
        </p>
        
        {item.tipo === 'in-corso' && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: item.stato }}></div>
            </div>
            <p className="text-xs text-right mt-1">{item.stato}</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <p className="text-sm font-medium">{item.valore}</p>
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {item.tipo === 'preventivo' && `Scad: ${item.scadenza}`}
            {item.tipo === 'approvato' && `Inizio: ${item.inizio}`}
            {item.tipo === 'in-corso' && `Fine: ${item.fine}`}
            {item.tipo === 'completato' && item.completato}
          </div>
        </div>
        
        <div className="mt-3 pt-2 border-t flex justify-end">
          {item.tipo === 'preventivo' && (
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <ArrowRight className="h-3 w-3 mr-1" />
              Approva
            </Button>
          )}
          {item.tipo === 'approvato' && (
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <ArrowRight className="h-3 w-3 mr-1" />
              Avvia
            </Button>
          )}
          {item.tipo === 'in-corso' && (
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completa
            </Button>
          )}
          {item.tipo === 'completato' && !item.fatturato && (
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Fattura
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="bg-white border rounded-md p-3 hover:shadow-md cursor-pointer transition-shadow">
      {renderCardContent()}
    </div>
  );
};
