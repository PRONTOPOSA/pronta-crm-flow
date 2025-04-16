
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { UserRoleSelect } from './UserRoleSelect';
import type { User } from '@/types/users';

interface UserTableRowProps {
  user: User;
  isAdmin: boolean;
  editingUser: string | null;
  editingRoles: Record<string, User['ruolo']>;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onRoleChange: (userId: string, role: User['ruolo']) => void;
  onRoleUpdate: (userId: string) => void;
  onCancelEdit: () => void;
  formatDate: (date: string | null) => string;
  getRoleLabel: (role: string) => string;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  isAdmin,
  editingUser,
  editingRoles,
  onEdit,
  onDelete,
  onRoleChange,
  onRoleUpdate,
  onCancelEdit,
  formatDate,
  getRoleLabel,
}) => {
  return (
    <TableRow>
      <TableCell>{user.nome}</TableCell>
      <TableCell>{user.cognome}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        {editingUser === user.id ? (
          <UserRoleSelect
            currentRole={editingRoles[user.id] || user.ruolo}
            onRoleChange={(role) => onRoleChange(user.id, role)}
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
              onClick={() => onRoleUpdate(user.id)}
              className="cursor-pointer"
            >
              <Check className="h-4 w-4 text-green-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onCancelEdit}
              className="cursor-pointer"
            >
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            {isAdmin && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEdit(user)}
                  className="cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDelete(user.id)}
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
  );
};

