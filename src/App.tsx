
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Contatti from "./pages/Contatti";
import Appuntamenti from "./pages/Appuntamenti";
import Progetti from "./pages/Progetti";
import Venditori from "./pages/Venditori";
import Impostazioni from "./pages/Impostazioni";
import Comunicazioni from "./pages/Comunicazioni";
import Reportistica from "./pages/Reportistica";
import NotFound from "./pages/NotFound";
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<AuthGuard><Navigate to="/dashboard" replace /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/contatti" element={<AuthGuard><Contatti /></AuthGuard>} />
            <Route path="/appuntamenti" element={<AuthGuard><Appuntamenti /></AuthGuard>} />
            <Route path="/progetti" element={<AuthGuard><Progetti /></AuthGuard>} />
            <Route path="/venditori" element={<AuthGuard><Venditori /></AuthGuard>} />
            <Route path="/impostazioni" element={<AuthGuard><Impostazioni /></AuthGuard>} />
            <Route path="/comunicazioni" element={<AuthGuard><Comunicazioni /></AuthGuard>} />
            <Route path="/reportistica" element={<AuthGuard><Reportistica /></AuthGuard>} />
            <Route path="/users" element={<AuthGuard><UserManagement /></AuthGuard>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
