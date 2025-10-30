import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import PlaceDetail from "./pages/PlaceDetail";
import Auth from "./pages/Auth";
import MerchantPanel from "./pages/MerchantPanel";
import MerchantEventPanel from "./pages/MerchantEventPanel";
import CuratorPanel from "./pages/CuratorPanel";
import Dashboard from "./pages/Dashboard";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explorar" element={<Explore />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/eventos/:id" element={<EventDetail />} />
            <Route path="/lugares/:id" element={<PlaceDetail />} />
            <Route path="/ingresar" element={<Auth />} />
            <Route path="/registrarse" element={<Auth />} />
            <Route 
              path="/panel/comerciante" 
              element={
                <ProtectedRoute requiredRole="merchant">
                  <MerchantPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/panel/comerciante/eventos" 
              element={
                <ProtectedRoute requiredRole="merchant">
                  <MerchantEventPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/panel/curador" 
              element={
                <ProtectedRoute requiredRole="curator">
                  <CuratorPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="analyst">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/demo" element={<Demo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
