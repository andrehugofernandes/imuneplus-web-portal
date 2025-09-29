
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminFiles from "./pages/AdminFiles";
import AdminCategories from "./pages/AdminCategories";
import AdminSettings from "./pages/AdminSettings";
import AdminLogs from "./pages/AdminLogs";
import AdminApiDocs from "./pages/AdminApiDocs";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="usuarios" element={<AdminUsers />} />
              <Route path="arquivos" element={<AdminFiles />} />
              <Route path="categorias" element={<AdminCategories />} />
              <Route path="configuracoes" element={<AdminSettings />} />
              <Route path="logs" element={<AdminLogs />} />
              <Route path="api-docs"  element={<AdminApiDocs />} />
              <Route path="perfil" element={<UserProfile />} />
              <Route path="conta" element={<UserSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
