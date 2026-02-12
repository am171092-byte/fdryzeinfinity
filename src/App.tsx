import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flows" element={<Flows />} />
            <Route path="/flows/:flowId" element={<FlowEditor />} />
            <Route path="/query" element={<QueryAssistant />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/org-dashboard" element={<OrgDashboard />} />
            <Route path="/portal" element={<UserPortal />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
