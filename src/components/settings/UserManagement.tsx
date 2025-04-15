
import React from 'react';
import { Button } from '@/components/ui/button';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="outline">+ Aggiungi Utente</Button>
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
