import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'operatore' | 'venditore')[];
}

export const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { user, loading, currentUserProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3 text-lg text-gray-600">Caricamento...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (allowedRoles && allowedRoles.length > 0 && currentUserProfile) {
    const userRole = currentUserProfile.ruolo as 'admin' | 'operatore' | 'venditore';
    
    if (!allowedRoles.includes(userRole)) {
      if (userRole === 'admin') {
        return <>{children}</>;
      }
      
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
