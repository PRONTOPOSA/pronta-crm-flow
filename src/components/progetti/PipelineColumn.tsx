
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MoreHorizontal } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { ProgettoItem } from '@/types/progetti';

interface PipelineColumnProps {
  title: string;
  items: ProgettoItem[];
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({ title, items }) => {
  return (
    <Card className="min-w-[280px]">
      <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{items.length} progetti</p>
        </div>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-3 space-y-3">
        {items.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
};
