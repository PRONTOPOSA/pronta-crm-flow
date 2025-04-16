
import React, { useState } from 'react';
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
import { useUserManagement } from '@/hooks/useUserManagement';
import { useVenditori } from '@/hooks/useVenditori';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const venditoreSchema = z.object({
  nome: z.string().min(2, { message: 'Il nome deve avere almeno 2 caratteri' }),
  cognome: z.string().min(2, { message: 'Il cognome deve avere almeno 2 caratteri' }),
  email: z.string().email({ message: 'Email non valida' }),
  password: z.string().min(6, { message: 'La password deve avere almeno 6 caratteri' }),
  telefono: z.string().optional()
});

const Venditori = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin, currentUserProfile } = useUserManagement();
  const { venditori, isLoading, createVenditore, deleteVenditore } = useVenditori();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof venditoreSchema>>({
    resolver: zodResolver(venditoreSchema),
  });

  const onSubmit = async (data: z.infer<typeof venditoreSchema>) => {
    try {
      await createVenditore(data);
      setOpenDialog(false);
      form.reset();
      toast({
        title: "Successo",
        description: "Venditore creato con successo",
      });
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive"
      });
    }
  };

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
                        {isAdmin && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteVenditore(venditore.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
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
            <DialogTitle>Nuovo Venditore</DialogTitle>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
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
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                  Annulla
                </Button>
                <Button type="submit">
                  Crea
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
