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
import Connectors from "./pages/Connectors";
import Jobs from "./pages/Jobs";
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
              <Route path="/dashboard" element={<RoleGuard allowedRoles={["org-admin"]} requiredRoleLabel="Organization Admin"><Dashboard /></RoleGuard>} />
              <Route path="/flows" element={<RoleGuard allowedRoles={["org-admin"]} requiredRoleLabel="Organization Admin"><Flows /></RoleGuard>} />
              <Route path="/flows/:flowId" element={<RoleGuard allowedRoles={["org-admin"]} requiredRoleLabel="Organization Admin"><FlowEditor /></RoleGuard>} />
              <Route path="/query" element={<RoleGuard allowedRoles={["org-admin"]} requiredRoleLabel="Organization Admin"><QueryAssistant /></RoleGuard>} />
              <Route path="/metrics" element={<RoleGuard allowedRoles={["org-admin"]} requiredRoleLabel="Organization Admin"><Metrics /></RoleGuard>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/super-admin" element={<RoleGuard allowedRoles={["super-admin"]} requiredRoleLabel="Super Admin"><SuperAdminDashboard /></RoleGuard>} />
              <Route path="/org-dashboard" element={<RoleGuard allowedRoles={["org-admin"]} requiredRoleLabel="Organization Admin"><OrgDashboard /></RoleGuard>} />
              <Route path="/portal" element={<UserPortal />} />
              <Route path="/connectors" element={<Connectors />} />
              <Route path="/jobs" element={<Jobs />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
