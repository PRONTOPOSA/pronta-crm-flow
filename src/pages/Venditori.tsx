
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Venditore, VenditoreFormValues } from '@/types/venditori';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const venditoreSchema = z.object({
  nome: z.string().min(2, { message: 'Il nome deve avere almeno 2 caratteri' }),
  cognome: z.string().min(2, { message: 'Il cognome deve avere almeno 2 caratteri' }),
  email: z.string().email({ message: 'Email non valida' }),
  telefono: z.string().optional()
});

const Venditori = () => {
  const [venditori, setVenditori] = useState<Venditore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVenditore, setEditingVenditore] = useState<Venditore | null>(null);
  const { toast } = useToast();

  const form = useForm<VenditoreFormValues>({
    resolver: zodResolver(venditoreSchema),
    defaultValues: {
      nome: '',
      cognome: '',
      email: '',
      telefono: ''
    }
  });

  const fetchVenditori = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('venditori')
        .select('*')
        .order('cognome', { ascending: true });
      
      if (error) throw error;
      setVenditori(data as Venditore[]);
    } catch (error) {
      console.error('Errore nel caricamento dei venditori:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i venditori",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenditori();
  }, []);

  const handleOpenForm = (venditore?: Venditore) => {
    if (venditore) {
      setEditingVenditore(venditore);
      form.reset({
        nome: venditore.nome,
        cognome: venditore.cognome,
        email: venditore.email,
        telefono: venditore.telefono || ''
      });
    } else {
      setEditingVenditore(null);
      form.reset({
        nome: '',
        cognome: '',
        email: '',
        telefono: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseForm = () => {
    setOpenDialog(false);
    setEditingVenditore(null);
  };

  const onSubmit = async (data: VenditoreFormValues) => {
    try {
      if (editingVenditore) {
        // Updating existing venditore
        const { error } = await supabase
          .from('venditori')
          .update(data)
          .eq('id', editingVenditore.id);
        
        if (error) throw error;
        
        toast({
          title: "Successo",
          description: "Venditore aggiornato con successo",
        });
      } else {
        // Creating new venditore
        // In a real scenario, we would need to create a user account first
        // and then link it to the venditore
        const { data: userData, error: userError } = await supabase.auth.admin.createUser({
          email: data.email,
          password: 'password123', // This should be generated or provided by the user
          email_confirm: true
        });
        
        if (userError) throw userError;
        
        const { error } = await supabase
          .from('venditori')
          .insert([
            { 
              ...data,
              user_id: userData.user.id 
            }
          ]);
        
        if (error) throw error;
        
        toast({
          title: "Successo",
          description: "Venditore creato con successo",
        });
      }
      
      fetchVenditori();
      handleCloseForm();
    } catch (error: any) {
      console.error('Errore nel salvataggio del venditore:', error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile salvare il venditore",
        variant: "destructive"
      });
    }
  };

  const handleDeleteVenditore = async (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo venditore?')) {
      try {
        const { error } = await supabase
          .from('venditori')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        toast({
          title: "Successo",
          description: "Venditore eliminato con successo",
        });
        fetchVenditori();
      } catch (error) {
        console.error('Errore nell\'eliminazione del venditore:', error);
        toast({
          title: "Errore",
          description: "Impossibile eliminare il venditore",
          variant: "destructive"
        });
      }
    }
  };

  // Filter venditori based on search query
  const filteredVenditori = venditori.filter(venditore => 
    venditore.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venditore.cognome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venditore.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestione Venditori</h1>
            <p className="text-gray-500">Gestisci il tuo team di venditori</p>
          </div>
          
          <Button onClick={() => handleOpenForm()}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nuovo Venditore
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Lista Venditori</CardTitle>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cognome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">Caricamento...</TableCell>
                  </TableRow>
                ) : filteredVenditori.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      {searchQuery ? 'Nessun venditore corrisponde alla ricerca' : 'Nessun venditore disponibile'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVenditori.map((venditore) => (
                    <TableRow key={venditore.id}>
                      <TableCell>{venditore.nome}</TableCell>
                      <TableCell>{venditore.cognome}</TableCell>
                      <TableCell>{venditore.email}</TableCell>
                      <TableCell>{venditore.telefono || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenForm(venditore)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteVenditore(venditore.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingVenditore ? 'Modifica Venditore' : 'Nuovo Venditore'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cognome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cognome</FormLabel>
                      <FormControl>
                        <Input placeholder="Cognome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseForm}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingVenditore ? 'Aggiorna' : 'Crea'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Venditori;
