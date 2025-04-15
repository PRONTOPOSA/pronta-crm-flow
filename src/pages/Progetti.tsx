import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  Calendar, 
  FileText, 
  Clipboard, 
  CheckCircle2,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';

// Refined type definitions
type BasePreventivoItem = {
  id: string;
  cliente: string;
  descrizione: string;
  valore: string;
}

type PreventivoItem = BasePreventivoItem & {
  data: string;
  scadenza: string;
}

type ApprovatoItem = BasePreventivoItem & {
  data: string;
  inizio: string;
}

type InCorsoItem = BasePreventivoItem & {
  inizio: string;
  fine: string;
  stato: string;
}

type CompletatoItem = BasePreventivoItem & {
  completato: string;
  fatturato: string;
}

// Update the type to a discriminated union
type ProgettoItem = 
  | PreventivoItem 
  | ApprovatoItem 
  | InCorsoItem 
  | CompletatoItem;

// Mock data
const preventivi: PreventivoItem[] = [
  { id: '1', cliente: 'Marco Rossi', descrizione: 'Sostituzione finestre appartamento', valore: '4.800 €', data: '10/04/2025', scadenza: '25/04/2025' },
  { id: '2', cliente: 'Laura Bianchi', descrizione: 'Installazione porte interne', valore: '2.300 €', data: '08/04/2025', scadenza: '23/04/2025' },
  { id: '3', cliente: 'Antonio Russo', descrizione: 'Persiane in alluminio', valore: '1.950 €', data: '05/04/2025', scadenza: '20/04/2025' },
];

const approvati: ApprovatoItem[] = [
  { id: '4', cliente: 'Francesca Neri', descrizione: 'Porte blindate e serramenti', valore: '6.200 €', data: '28/03/2025', inizio: '18/04/2025' },
  { id: '5', cliente: 'Giuseppe Verdi', descrizione: 'Sostituzione infissi', valore: '3.800 €', data: '22/03/2025', inizio: '15/04/2025' },
];

const inCorso: InCorsoItem[] = [
  { id: '6', cliente: 'Costruzioni Veloci SRL', descrizione: 'Fornitura e posa serramenti edificio', valore: '18.500 €', inizio: '01/04/2025', fine: '30/04/2025', stato: '60%' },
  { id: '7', cliente: 'Progetti Edilizi SpA', descrizione: 'Porte tagliafuoco cantiere via Milano', valore: '9.300 €', inizio: '25/03/2025', fine: '20/04/2025', stato: '80%' },
];

const completati: CompletatoItem[] = [
  { id: '8', cliente: 'Maria Ferrari', descrizione: 'Sostituzione portoncino ingresso', valore: '1.800 €', completato: '01/04/2025', fatturato: 'Sì' },
  { id: '9', cliente: 'Roberto Esposito', descrizione: 'Finestre PVC doppio vetro', valore: '3.450 €', completato: '28/03/2025', fatturato: 'Sì' },
  { id: '10', cliente: 'Sofia Colombo', descrizione: 'Porte interne in legno', valore: '2.100 €', completato: '25/03/2025', fatturato: 'No' },
];

const PipeCard = ({ title, count, children }: { title: string, count: number, children: React.ReactNode }) => (
  <Card className="min-w-[280px]">
    <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-gray-500">{count} progetti</p>
      </div>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
    <CardContent className="p-3 space-y-3">
      {children}
    </CardContent>
  </Card>
);

const Progetti = () => {
  // Creiamo un array combinato con tutti i progetti esplicitamente tipizzato
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
              <PipeCard title="Preventivi" count={preventivi.length}>
                {preventivi.map((item) => (
                  <div key={item.id} className="bg-white border rounded-md p-3 hover:shadow-md cursor-pointer transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{item.descrizione}</h4>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Preventivo
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <User className="h-3 w-3 mr-1" /> {item.cliente}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm font-medium">{item.valore}</p>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> Scad: {item.scadenza}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t flex justify-end">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Approva
                      </Button>
                    </div>
                  </div>
                ))}
              </PipeCard>
              
              <PipeCard title="Approvati" count={approvati.length}>
                {approvati.map((item) => (
                  <div key={item.id} className="bg-white border rounded-md p-3 hover:shadow-md cursor-pointer transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{item.descrizione}</h4>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        Approvato
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <User className="h-3 w-3 mr-1" /> {item.cliente}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm font-medium">{item.valore}</p>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> Inizio: {item.inizio}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t flex justify-end">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Avvia
                      </Button>
                    </div>
                  </div>
                ))}
              </PipeCard>
              
              <PipeCard title="In Corso" count={inCorso.length}>
                {inCorso.map((item) => (
                  <div key={item.id} className="bg-white border rounded-md p-3 hover:shadow-md cursor-pointer transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{item.descrizione}</h4>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        In Corso
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <User className="h-3 w-3 mr-1" /> {item.cliente}
                    </p>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-secondary h-1.5 rounded-full" style={{ width: item.stato }}></div>
                      </div>
                      <p className="text-xs text-right mt-1">{item.stato}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm font-medium">{item.valore}</p>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> Fine: {item.fine}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t flex justify-end">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completa
                      </Button>
                    </div>
                  </div>
                ))}
              </PipeCard>
              
              <PipeCard title="Completati" count={completati.length}>
                {completati.map((item) => (
                  <div key={item.id} className="bg-white border rounded-md p-3 hover:shadow-md cursor-pointer transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{item.descrizione}</h4>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Completato
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <User className="h-3 w-3 mr-1" /> {item.cliente}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm font-medium">{item.valore}</p>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {item.completato}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.fatturato === 'Sì' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.fatturato === 'Sì' ? 'Fatturato' : 'Da fatturare'}
                      </span>
                      
                      {item.fatturato === 'No' && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Fattura
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </PipeCard>
            </div>
          </TabsContent>
          
          <TabsContent value="lista" className="mt-4">
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
                    {allProjects.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">{item.descrizione}</td>
                        <td className="p-4">{item.cliente}</td>
                        <td className="p-4">{item.valore}</td>
                        <td className="p-4">
                          {'data' in item 
                            ? item.data 
                            : 'inizio' in item && !('stato' in item) 
                              ? item.inizio 
                              : 'stato' in item 
                                ? item.inizio 
                                : 'completato' in item 
                                  ? item.completato 
                                  : ''}
                        </td>
                        <td className="p-4">
                          {'scadenza' in item ? (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">Preventivo</Badge>
                          ) : 'inizio' in item && !('stato' in item) ? (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800">Approvato</Badge>
                          ) : 'stato' in item ? (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">In Corso</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-800">Completato</Badge>
                          )}
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Progetti;
