
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const UserTableLoading = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="ml-3">Caricamento...</span>
    </div>
  );
};
