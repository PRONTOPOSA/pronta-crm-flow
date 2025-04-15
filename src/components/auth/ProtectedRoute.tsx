
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'venditore' | 'operatore')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    // Mostra un loader durante il caricamento
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  // Se l'utente non è autenticato, reindirizza alla pagina di login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Se sono specificati dei ruoli consentiti, verifica che l'utente abbia uno di quei ruoli
  if (allowedRoles && profile && !allowedRoles.includes(profile.ruolo)) {
    // Reindirizza alla dashboard se l'utente non ha i permessi necessari
    return <Navigate to="/dashboard" replace />;
  }

  // Se tutto è a posto, mostra il contenuto protetto
  return <>{children}</>;
};

export default ProtectedRoute;
