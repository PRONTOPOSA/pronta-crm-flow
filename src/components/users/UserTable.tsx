
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserTableLoading } from './UserTableLoading';
import { useUserManagement } from '@/hooks/useUserManagement';
import { AdminPromotionAlert } from './AdminPromotionAlert';
import { DeleteUserDialog } from './DeleteUserDialog';
import { UserTableRow } from './UserTableRow';
import type { User } from '@/types/users';

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

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [recentlyPromoted, setRecentlyPromoted] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (users) {
      const filtered = users.filter(user => user.ruolo !== 'venditore');
      setFilteredUsers(filtered);
    }
  }, [users]);

  useEffect(() => {
    if (isAdmin && recentlyPromoted) {
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

  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialog(true);
  };

  const executeDelete = async () => {
    if (userToDelete) {
      try {
        await handleDeleteUser(userToDelete);
        // Immediately remove the user from the filtered list
        setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));
        setUserToDelete(null);
        setDeleteDialog(false);
      } catch (error) {
        console.error("Error deleting user:", error);
        setDeleteDialog(false);
      }
    }
  };

  if (isLoading) {
    return <UserTableLoading />;
  }

  return (
    <div className="space-y-4">
      {!isAdmin && <AdminPromotionAlert onPromote={handlePromote} />}
      
      <DeleteUserDialog 
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        onConfirm={executeDelete}
      />
      
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
            <UserTableRow
              key={user.id}
              user={user}
              isAdmin={isAdmin}
              editingUser={editingUser}
              editingRoles={editingRoles}
              onEdit={handleEditStart}
              onDelete={confirmDelete}
              onRoleChange={handleRoleChange}
              onRoleUpdate={handleRoleUpdate}
              onCancelEdit={() => setEditingUser(null)}
              formatDate={formatDate}
              getRoleLabel={getRoleLabel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
