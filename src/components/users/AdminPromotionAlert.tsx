
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

interface AdminPromotionAlertProps {
  onPromote: () => void;
}

export const AdminPromotionAlert: React.FC<AdminPromotionAlertProps> = ({ onPromote }) => {
  return (
    <div className="mb-4">
      <Alert className="bg-amber-50 border-amber-200">
        <AlertDescription className="flex items-center justify-between">
          <span>Non hai i privilegi di amministratore. Vuoi promuoverti ad amministratore?</span>
          <Button 
            variant="outline" 
            className="ml-4 bg-amber-100 hover:bg-amber-200 border-amber-300"
            onClick={onPromote}
          >
            <ShieldAlert className="mr-2 h-4 w-4" />
            Diventa Amministratore
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
