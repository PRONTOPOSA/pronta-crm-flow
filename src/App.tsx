
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/appuntamenti" element={<Appuntamenti />} />
          <Route path="/progetti" element={<Progetti />} />
          <Route path="/venditori" element={<Venditori />} />
          <Route path="/impostazioni" element={<Impostazioni />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
