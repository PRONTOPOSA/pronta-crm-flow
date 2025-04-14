
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  client: string;
  description: string;
  status: 'preventivo' | 'approvato' | 'in-corso' | 'completato';
  deadline: string;
}

interface ProjectTableProps {
  projects: Project[];
}

const statusMap = {
  'preventivo': { label: 'Preventivo', color: 'bg-blue-100 text-blue-800' },
  'approvato': { label: 'Approvato', color: 'bg-purple-100 text-purple-800' },
  'in-corso': { label: 'In Corso', color: 'bg-yellow-100 text-yellow-800' },
  'completato': { label: 'Completato', color: 'bg-green-100 text-green-800' },
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Descrizione</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead className="text-right">Scadenza</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{project.client}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>
                <Badge variant="outline" className={`${statusMap[project.status].color}`}>
                  {statusMap[project.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{project.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectTable;
