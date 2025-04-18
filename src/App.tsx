
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Dashboard from "./pages/Dashboard";
import Contatti from "./pages/Contatti";
import Appuntamenti from "./pages/Appuntamenti";
import Progetti from "./pages/Progetti";
import Venditori from "./pages/Venditori";
import Impostazioni from "./pages/Impostazioni";
import Comunicazioni from "./pages/Comunicazioni";
import Reportistica from "./pages/Reportistica";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import UserManagement from "./pages/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Routes accessible by all authenticated users */}
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/appuntamenti" element={<AuthGuard><Appuntamenti /></AuthGuard>} />
            <Route path="/progetti" element={<AuthGuard><Progetti /></AuthGuard>} />
            
            {/* Routes restricted to admin and operatore roles */}
            <Route 
              path="/contatti" 
              element={
                <AuthGuard allowedRoles={['admin', 'operatore']}>
                  <Contatti />
                </AuthGuard>
              } 
            />
            <Route 
              path="/comunicazioni" 
              element={
                <AuthGuard allowedRoles={['admin', 'operatore']}>
                  <Comunicazioni />
                </AuthGuard>
              } 
            />
            <Route 
              path="/reportistica" 
              element={
                <AuthGuard allowedRoles={['admin', 'operatore']}>
                  <Reportistica />
                </AuthGuard>
              } 
            />
            
            {/* Routes restricted to admin role only */}
            <Route 
              path="/venditori" 
              element={
                <AuthGuard allowedRoles={['admin']}>
                  <Venditori />
                </AuthGuard>
              } 
            />
            <Route 
              path="/impostazioni" 
              element={
                <AuthGuard allowedRoles={['admin']}>
                  <Impostazioni />
                </AuthGuard>
              } 
            />
            <Route 
              path="/user-management" 
              element={
                <AuthGuard allowedRoles={['admin']}>
                  <UserManagement />
                </AuthGuard>
              } 
            />
            
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
