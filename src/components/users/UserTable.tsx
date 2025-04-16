
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { UserRoleSelect } from './UserRoleSelect';
import { UserTableLoading } from './UserTableLoading';
import { useUserManagement } from '@/hooks/useUserManagement';

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
    setEditingUser
  } = useUserManagement();

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

  if (isLoading) {
    return <UserTableLoading />;
  }

  console.log('UserTable - Users:', users);
  console.log('UserTable - isAdmin:', isAdmin);
  console.log('UserTable - editingUser:', editingUser);
  console.log('UserTable - editingRoles:', editingRoles);

  return (
    <div>
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
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.cognome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {editingUser === user.id ? (
                  <UserRoleSelect
                    currentRole={editingRoles[user.id] || user.ruolo}
                    onRoleChange={(role) => {
                      console.log(`Changing role for user ${user.id} to ${role}`);
                      handleRoleChange(user.id, role);
                    }}
                  />
                ) : (
                  <span className="capitalize">{getRoleLabel(user.ruolo)}</span>
                )}
              </TableCell>
              <TableCell>{formatDate(user.data_creazione)}</TableCell>
              <TableCell className="text-right space-x-2">
                {editingUser === user.id ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        console.log(`Updating role for user ${user.id}`);
                        handleRoleUpdate(user.id);
                      }}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        console.log(`Cancelling role edit for user ${user.id}`);
                        setEditingUser(null);
                      }}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        console.log(`Starting edit for user ${user.id}`);
                        handleEditStart(user);
                      }}
                      disabled={!isAdmin}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        console.log(`Deleting user ${user.id}`);
                        handleDeleteUser(user.id);
                      }}
                      disabled={!isAdmin}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </>
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
