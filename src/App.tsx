import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const PendingRequests = lazy(() => import("./pages/PendingRequests"));
const MaterialManagement = lazy(() => import("./pages/MaterialManagement"));
const LoanRegistry = lazy(() => import("./pages/LoanRegistry"));
const BookFilterSearch = lazy(() => import("./pages/BookFilterSearch"));
const ReturnEntry = lazy(() => import("./pages/ReturnEntry"));
const Auth = lazy(() => import("./pages/Auth"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<MaterialManagement />} />
            <Route path="/admin" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/solicitudes-pendientes" element={<PendingRequests />} />
            <Route path="/gestion-material" element={<MaterialManagement />} />
            <Route path="/registro-prestamo" element={<LoanRegistry />} />
            <Route path="/ingreso-devolucion" element={<ReturnEntry />} />
            <Route path="/busqueda-filtros" element={<BookFilterSearch />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
