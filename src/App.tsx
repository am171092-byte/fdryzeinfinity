import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Flows from "./pages/Flows";
import FlowEditor from "./pages/FlowEditor";
import QueryAssistant from "./pages/QueryAssistant";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import OrgDashboard from "./pages/OrgDashboard";
import UserPortal from "./pages/UserPortal";
import AppLayout from "./components/layout/AppLayout";
import RoleGuard from "./components/layout/RoleGuard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RoleProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<RoleGuard allowedRoles={["org-admin"]}><Dashboard /></RoleGuard>} />
              <Route path="/flows" element={<RoleGuard allowedRoles={["org-admin"]}><Flows /></RoleGuard>} />
              <Route path="/flows/:flowId" element={<RoleGuard allowedRoles={["org-admin"]}><FlowEditor /></RoleGuard>} />
              <Route path="/query" element={<RoleGuard allowedRoles={["org-admin"]}><QueryAssistant /></RoleGuard>} />
              <Route path="/metrics" element={<RoleGuard allowedRoles={["org-admin"]}><Metrics /></RoleGuard>} />
              <Route path="/settings" element={<RoleGuard allowedRoles={["super-admin", "org-admin", "user"]}><Settings /></RoleGuard>} />
              <Route path="/super-admin" element={<RoleGuard allowedRoles={["super-admin"]}><SuperAdminDashboard /></RoleGuard>} />
              <Route path="/org-dashboard" element={<RoleGuard allowedRoles={["org-admin"]}><OrgDashboard /></RoleGuard>} />
              <Route path="/portal" element={<RoleGuard allowedRoles={["user"]}><UserPortal /></RoleGuard>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
