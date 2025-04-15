
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/contatti" element={
              <ProtectedRoute>
                <Contatti />
              </ProtectedRoute>
            } />
            <Route path="/appuntamenti" element={
              <ProtectedRoute>
                <Appuntamenti />
              </ProtectedRoute>
            } />
            <Route path="/progetti" element={
              <ProtectedRoute>
                <Progetti />
              </ProtectedRoute>
            } />
            <Route path="/venditori" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Venditori />
              </ProtectedRoute>
            } />
            <Route path="/impostazioni" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Impostazioni />
              </ProtectedRoute>
            } />
            <Route path="/comunicazioni" element={
              <ProtectedRoute>
                <Comunicazioni />
              </ProtectedRoute>
            } />
            <Route path="/reportistica" element={
              <ProtectedRoute allowedRoles={['admin', 'venditore']}>
                <Reportistica />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
