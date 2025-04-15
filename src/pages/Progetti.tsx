import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter } from 'lucide-react';
import { PipelineColumn } from '@/components/progetti/PipelineColumn';
import { ProjectList } from '@/components/progetti/ProjectList';
import { PreventivoItem, ApprovatoItem, InCorsoItem, CompletatoItem, ProgettoItem } from '@/types/progetti';

// Mock data
const preventivi: PreventivoItem[] = [
  { id: '1', cliente: 'Marco Rossi', descrizione: 'Sostituzione finestre appartamento', valore: '4.800 €', data: '10/04/2025', scadenza: '25/04/2025', tipo: 'preventivo' },
  { id: '2', cliente: 'Laura Bianchi', descrizione: 'Installazione porte interne', valore: '2.300 €', data: '08/04/2025', scadenza: '23/04/2025', tipo: 'preventivo' },
  { id: '3', cliente: 'Antonio Russo', descrizione: 'Persiane in alluminio', valore: '1.950 €', data: '05/04/2025', scadenza: '20/04/2025', tipo: 'preventivo' },
];

const approvati: ApprovatoItem[] = [
  { id: '4', cliente: 'Francesca Neri', descrizione: 'Porte blindate e serramenti', valore: '6.200 €', data: '28/03/2025', inizio: '18/04/2025', tipo: 'approvato' },
  { id: '5', cliente: 'Giuseppe Verdi', descrizione: 'Sostituzione infissi', valore: '3.800 €', data: '22/03/2025', inizio: '15/04/2025', tipo: 'approvato' },
];

const inCorso: InCorsoItem[] = [
  { id: '6', cliente: 'Costruzioni Veloci SRL', descrizione: 'Fornitura e posa serramenti edificio', valore: '18.500 €', inizio: '01/04/2025', fine: '30/04/2025', stato: '60%', tipo: 'in-corso' },
  { id: '7', cliente: 'Progetti Edilizi SpA', descrizione: 'Porte tagliafuoco cantiere via Milano', valore: '9.300 €', inizio: '25/03/2025', fine: '20/04/2025', stato: '80%', tipo: 'in-corso' },
];

const completati: CompletatoItem[] = [
  { id: '8', cliente: 'Maria Ferrari', descrizione: 'Sostituzione portoncino ingresso', valore: '1.800 €', completato: '01/04/2025', fatturato: 'Sì', tipo: 'completato' },
  { id: '9', cliente: 'Roberto Esposito', descrizione: 'Finestre PVC doppio vetro', valore: '3.450 €', completato: '28/03/2025', fatturato: 'Sì', tipo: 'completato' },
  { id: '10', cliente: 'Sofia Colombo', descrizione: 'Porte interne in legno', valore: '2.100 €', completato: '25/03/2025', fatturato: 'No', tipo: 'completato' },
];

const Progetti = () => {
  const allProjects: ProgettoItem[] = [...preventivi, ...approvati, ...inCorso, ...completati];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Progetti</h1>
            <p className="text-gray-500">Gestisci preventivi e lavori in corso</p>
          </div>
          
          <Button className="bg-secondary hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Progetto
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Cerca progetti..." 
              className="pl-10 w-full"
            />
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </Button>
        </div>
        
        <Tabs defaultValue="pipeline">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="lista">Lista</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pipeline" className="mt-4">
            <div className="flex overflow-x-auto pb-4 gap-4">
              <PipelineColumn title="Preventivi" items={preventivi} />
              <PipelineColumn title="Approvati" items={approvati} />
              <PipelineColumn title="In Corso" items={inCorso} />
              <PipelineColumn title="Completati" items={completati} />
            </div>
          </TabsContent>
          
          <TabsContent value="lista" className="mt-4">
            <ProjectList projects={allProjects} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Progetti;
