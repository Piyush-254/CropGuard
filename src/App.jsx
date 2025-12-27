import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import LanguageSelection from "./pages/LanguageSelection";
import Home from "./pages/Home";
import CropSelection from "./pages/CropSelection";
import Detection from "./pages/Detection";
import Result from "./pages/Result";
import Treatment from "./pages/Treatment";
import History from "./pages/History";
import Knowledge from "./pages/Knowledge";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/language" element={<LanguageSelection />} />
              <Route path="/home" element={<Home />} />
              <Route path="/crops" element={<CropSelection />} />
              <Route path="/detect" element={<Detection />} />
              <Route path="/result" element={<Result />} />
              <Route path="/treatment/:pestId" element={<Treatment />} />
              <Route path="/history" element={<History />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
