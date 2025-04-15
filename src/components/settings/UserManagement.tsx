
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const UserManagement = () => {
  const [newUserData, setNewUserData] = useState({
    nome: '',
    email: '',
    ruolo: 'Operatore'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    // This would typically connect to a backend API
    // For now, we'll just show a success message
    toast({
      title: "Utente aggiunto",
      description: `${newUserData.nome} è stato aggiunto con successo.`,
    });
    
    // Reset form
    setNewUserData({
      nome: '',
      email: '',
      ruolo: 'Operatore'
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">+ Aggiungi Utente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Aggiungi Nuovo Utente</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome" 
                    name="nome" 
                    value={newUserData.nome} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={newUserData.email} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ruolo">Ruolo</Label>
                  <select 
                    id="ruolo" 
                    name="ruolo" 
                    className="w-full p-2 border rounded-md"
                    value={newUserData.ruolo}
                    onChange={handleInputChange}
                  >
                    <option value="Amministratore">Amministratore</option>
                    <option value="Venditore">Venditore</option>
                    <option value="Operatore">Operatore</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Aggiungi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Nome</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Ruolo</th>
                <th className="text-left py-3 px-4">Stato</th>
                <th className="text-right py-3 px-4">Azioni</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Marco Rossi</td>
                <td className="py-3 px-4">marco.rossi@prontoposa.it</td>
                <td className="py-3 px-4">Amministratore</td>
                <td className="py-3 px-4">
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Attivo</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">Modifica</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Laura Bianchi</td>
                <td className="py-3 px-4">laura.bianchi@prontoposa.it</td>
                <td className="py-3 px-4">Venditore</td>
                <td className="py-3 px-4">
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Attivo</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">Modifica</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Giuseppe Verdi</td>
                <td className="py-3 px-4">giuseppe.verdi@prontoposa.it</td>
                <td className="py-3 px-4">Operatore</td>
                <td className="py-3 px-4">
                  <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">In attesa</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">Modifica</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
