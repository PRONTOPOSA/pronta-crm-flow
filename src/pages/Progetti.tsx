
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';
import { PipelineColumn } from '@/components/progetti/PipelineColumn';
import { ProjectList } from '@/components/progetti/ProjectList';
import { NewProjectDialog } from '@/components/progetti/NewProjectDialog';
import { PreventivoItem, ApprovatoItem, InCorsoItem, CompletatoItem, ProgettoItem } from '@/types/progetti';

// Mock data
const initialPreventivi: PreventivoItem[] = [
  { id: '1', cliente: 'Marco Rossi', descrizione: 'Sostituzione finestre appartamento', valore: '4.800 €', data: '10/04/2025', scadenza: '25/04/2025', tipo: 'preventivo' },
  { id: '2', cliente: 'Laura Bianchi', descrizione: 'Installazione porte interne', valore: '2.300 €', data: '08/04/2025', scadenza: '23/04/2025', tipo: 'preventivo' },
  { id: '3', cliente: 'Antonio Russo', descrizione: 'Persiane in alluminio', valore: '1.950 €', data: '05/04/2025', scadenza: '20/04/2025', tipo: 'preventivo' },
];

const initialApprovati: ApprovatoItem[] = [
  { id: '4', cliente: 'Francesca Neri', descrizione: 'Porte blindate e serramenti', valore: '6.200 €', data: '28/03/2025', inizio: '18/04/2025', tipo: 'approvato' },
  { id: '5', cliente: 'Giuseppe Verdi', descrizione: 'Sostituzione infissi', valore: '3.800 €', data: '22/03/2025', inizio: '15/04/2025', tipo: 'approvato' },
];

const initialInCorso: InCorsoItem[] = [
  { id: '6', cliente: 'Costruzioni Veloci SRL', descrizione: 'Fornitura e posa serramenti edificio', valore: '18.500 €', inizio: '01/04/2025', fine: '30/04/2025', stato: '60%', tipo: 'in-corso' },
  { id: '7', cliente: 'Progetti Edilizi SpA', descrizione: 'Porte tagliafuoco cantiere via Milano', valore: '9.300 €', inizio: '25/03/2025', fine: '20/04/2025', stato: '80%', tipo: 'in-corso' },
];

const initialCompletati: CompletatoItem[] = [
  { id: '8', cliente: 'Maria Ferrari', descrizione: 'Sostituzione portoncino ingresso', valore: '1.800 €', completato: '01/04/2025', fatturato: 'Sì', tipo: 'completato' },
  { id: '9', cliente: 'Roberto Esposito', descrizione: 'Finestre PVC doppio vetro', valore: '3.450 €', completato: '28/03/2025', fatturato: 'Sì', tipo: 'completato' },
  { id: '10', cliente: 'Sofia Colombo', descrizione: 'Porte interne in legno', valore: '2.100 €', completato: '25/03/2025', fatturato: 'No', tipo: 'completato' },
];

const Progetti = () => {
  const [preventivi, setPreventivi] = useState<PreventivoItem[]>(initialPreventivi);
  const [approvati, setApprovati] = useState<ApprovatoItem[]>(initialApprovati);
  const [inCorso, setInCorso] = useState<InCorsoItem[]>(initialInCorso);
  const [completati, setCompletati] = useState<CompletatoItem[]>(initialCompletati);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calcola tutti i progetti combinando gli array
  const allProjects: ProgettoItem[] = [...preventivi, ...approvati, ...inCorso, ...completati];
  
  // Funzione per aggiungere un nuovo progetto
  const handleAddProject = (project: PreventivoItem) => {
    setPreventivi(prev => [...prev, project]);
  };

  // Filtra progetti in base al termine di ricerca
  const filteredProjects = searchTerm
    ? allProjects.filter(
        project => 
          project.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allProjects;

  // Filtra i progetti per tipo
  const filteredPreventivi = searchTerm 
    ? preventivi.filter(
        project => 
          project.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : preventivi;

  const filteredApprovati = searchTerm
    ? approvati.filter(
        project => 
          project.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : approvati;

  const filteredInCorso = searchTerm
    ? inCorso.filter(
        project => 
          project.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inCorso;

  const filteredCompletati = searchTerm
    ? completati.filter(
        project => 
          project.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.descrizione.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : completati;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Progetti</h1>
            <p className="text-gray-500">Gestisci preventivi e lavori in corso</p>
          </div>
          
          <NewProjectDialog onAddProject={handleAddProject} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Cerca progetti..." 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <PipelineColumn title="Preventivi" items={filteredPreventivi} />
              <PipelineColumn title="Approvati" items={filteredApprovati} />
              <PipelineColumn title="In Corso" items={filteredInCorso} />
              <PipelineColumn title="Completati" items={filteredCompletati} />
            </div>
          </TabsContent>
          
          <TabsContent value="lista" className="mt-4">
            <ProjectList projects={filteredProjects} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Progetti;
