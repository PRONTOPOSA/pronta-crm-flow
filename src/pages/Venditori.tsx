
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
import { useUserManagement } from '@/hooks/useUserManagement';
import { useVenditori } from '@/hooks/useVenditori';
import { VenditoreForm } from '@/components/venditori/VenditoreForm';
import { VenditoriTable } from '@/components/venditori/VenditoriTable';

const Venditori = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin, currentUserProfile } = useUserManagement();
  const { venditori, isLoading, createVenditore, deleteVenditore } = useVenditori();

  const handleSubmit = async (formData: any) => {
    try {
      await createVenditore(formData);
      setOpenDialog(false);
    } catch (error) {
      console.error("Errore durante la creazione del venditore:", error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestione Venditori</h1>
            <p className="text-gray-500">Questa sezione è dedicata esclusivamente alla gestione dei venditori</p>
          </div>
          
          {(isAdmin || currentUserProfile?.ruolo === 'operatore') && (
            <Button onClick={() => setOpenDialog(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuovo Venditore
            </Button>
          )}
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
              isLoading={isLoading}
              isAdmin={isAdmin}
              onDelete={deleteVenditore}
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
              Inserisci i dati del nuovo venditore da aggiungere al sistema.
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
