
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X, ShieldAlert, RefreshCw } from 'lucide-react';
import { UserRoleSelect } from './UserRoleSelect';
import { UserTableLoading } from './UserTableLoading';
import { useUserManagement } from '@/hooks/useUserManagement';
import { Alert, AlertDescription } from '@/components/ui/alert';

const UserTable = () => {
  const {
    users,
    isLoading,
    editingUser,
    editingRoles,
    isAdmin,
    handleEditStart,
    handleRoleChange,
    handleRoleUpdate,
    handleDeleteUser,
    setEditingUser,
    promoteToAdmin
  } = useUserManagement();

  // Stato locale per tenere traccia se è stato promosso di recente
  const [recentlyPromoted, setRecentlyPromoted] = useState(false);

  // Log isAdmin all'inizializzazione e quando cambia
  useEffect(() => {
    console.log("UserTable - isAdmin value:", isAdmin, typeof isAdmin);
    
    // Se l'utente è diventato admin, registra questo cambiamento
    if (isAdmin && recentlyPromoted) {
      console.log("User is now admin, hiding promotion banner");
      setRecentlyPromoted(false);
    }
  }, [isAdmin, recentlyPromoted]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Amministratore';
      case 'operatore': return 'Operatore';
      default: return role;
    }
  };

  const handlePromote = async () => {
    setRecentlyPromoted(true);
    await promoteToAdmin();
  };

  if (isLoading) {
    return <UserTableLoading />;
  }

  // Filter out users with 'venditore' role - this is the key change
  const filteredUsers = users.filter(user => user.ruolo !== 'venditore');
  
  console.log("UserTable rendering. Admin status:", isAdmin);
  console.log("Filtered users (excluding vendors):", filteredUsers.length);

  return (
    <div className="space-y-4">
      {!isAdmin && (
        <div className="mb-4">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription className="flex items-center justify-between">
              <span>Non hai i privilegi di amministratore. Vuoi promuoverti ad amministratore?</span>
              <Button 
                variant="outline" 
                className="ml-4 bg-amber-100 hover:bg-amber-200 border-amber-300"
                onClick={handlePromote}
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                Diventa Amministratore
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cognome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ruolo</TableHead>
            <TableHead>Data Creazione</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.cognome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {editingUser === user.id ? (
                  <UserRoleSelect
                    currentRole={editingRoles[user.id] || user.ruolo}
                    onRoleChange={(role) => handleRoleChange(user.id, role)}
                  />
                ) : (
                  <span className="capitalize">{getRoleLabel(user.ruolo)}</span>
                )}
              </TableCell>
              <TableCell>{formatDate(user.data_creazione)}</TableCell>
              <TableCell className="text-right">
                {editingUser === user.id ? (
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRoleUpdate(user.id)}
                      className="cursor-pointer"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingUser(null)}
                      className="cursor-pointer"
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end space-x-2">
                    {/* Sempre mostra i pulsanti per l'amministratore */}
                    {isAdmin && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditStart(user)}
                          className="cursor-pointer"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                          className="cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
