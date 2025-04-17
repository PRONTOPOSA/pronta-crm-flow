
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { PlusCircle, Search, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { VenditoriTable } from '@/components/venditori/VenditoriTable';
import { VenditoreForm } from '@/components/venditori/VenditoreForm';

// Venditore mock data
const initialVenditori = [
  { id: '1', nome: 'Marco', cognome: 'Rossi', email: 'marco.rossi@example.com' },
  { id: '2', nome: 'Laura', cognome: 'Bianchi', email: 'laura.bianchi@example.com' },
  { id: '3', nome: 'Giuseppe', cognome: 'Verdi', email: 'giuseppe.verdi@example.com' }
];

const Venditori = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [venditori, setVenditori] = useState(initialVenditori);
  const { toast } = useToast();

  const handleSubmit = async (formData: any) => {
    try {
      // Add venditore to our local state
      const newVenditore = {
        id: Date.now().toString(),
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email
      };
      
      setVenditori([...venditori, newVenditore]);
      
      toast({
        title: "Successo",
        description: "Venditore creato con successo",
      });
      
      setOpenDialog(false);
    } catch (error) {
      console.error("Errore durante la creazione del venditore:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la creazione del venditore",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = (id: string) => {
    setVenditori(venditori.filter(v => v.id !== id));
    toast({
      title: "Successo",
      description: "Venditore rimosso con successo",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestione Venditori</h1>
            <p className="text-gray-500">Qui puoi registrare i venditori che riceveranno gli appuntamenti dai lead</p>
          </div>
          
          <Button onClick={() => setOpenDialog(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nuovo Venditore
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Lista Venditori
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cerca venditori..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <VenditoriTable
              venditori={venditori}
              isLoading={false}
              isAdmin={true} // Always allow editing
              onDelete={handleDelete}
              searchQuery={searchQuery}
            />
          </CardContent>
        </Card>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nuovo Venditore</DialogTitle>
            <DialogDescription>
              Inserisci i dati del nuovo venditore. I venditori potranno accedere per controllare i propri appuntamenti.
            </DialogDescription>
          </DialogHeader>
          <VenditoreForm
            onSubmit={handleSubmit}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Venditori;
