import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  ToggleLeft,
  ToggleRight,
  Cloud,
  HardDrive,
  FileText,
  Database,
  Users,
  Shield,
  Activity,
  ArrowUpRight,
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
  industry: string;
  users: number;
  assistants: number;
  status: "active" | "inactive";
  createdAt: string;
}

const organizations: Organization[] = [
  { id: "1", name: "Acme Corp", industry: "Finance", users: 48, assistants: 6, status: "active", createdAt: "Jan 2025" },
  { id: "2", name: "MedTech Solutions", industry: "Healthcare", users: 32, assistants: 4, status: "active", createdAt: "Feb 2025" },
  { id: "3", name: "RetailMax Inc", industry: "Retail", users: 25, assistants: 3, status: "active", createdAt: "Mar 2025" },
  { id: "4", name: "CloudBase SaaS", industry: "SaaS Support", users: 18, assistants: 2, status: "inactive", createdAt: "Apr 2025" },
  { id: "5", name: "BuildRight Mfg", industry: "Manufacturing", users: 40, assistants: 5, status: "active", createdAt: "May 2025" },
];

const connectorTypes = [
  { id: "sharepoint", name: "SharePoint", icon: Cloud, enabled: true },
  { id: "s3", name: "Amazon S3", icon: HardDrive, enabled: true },
  { id: "documents", name: "Document Uploads", icon: FileText, enabled: true },
  { id: "databases", name: "Databases", icon: Database, enabled: false },
];

const SuperAdminDashboard = () => {
  const [connectors, setConnectors] = useState(connectorTypes);

  const toggleConnector = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const activeOrgs = organizations.filter((o) => o.status === "active").length;
  const totalUsers = organizations.reduce((acc, o) => acc + o.users, 0);

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-page-title mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform-wide management and configuration</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Organizations", value: organizations.length, icon: Building2, change: `${activeOrgs} active` },
          { label: "Total Users", value: totalUsers, icon: Users, change: "+12 this month" },
          { label: "Active Assistants", value: 20, icon: Activity, change: "across all orgs" },
          { label: "Connector Types", value: connectors.filter((c) => c.enabled).length, icon: Shield, change: `of ${connectors.length} enabled` },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-elevated p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="w-9 h-9 bg-primary-subtle rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Organizations */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-float p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-section-title">Manage Organizations</h2>
              <button className="h-10 px-4 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg flex items-center gap-2 transition-colors text-sm">
                <Plus className="w-4 h-4" />
                Add Organization
              </button>
            </div>

            <div className="space-y-3">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between p-4 bg-background rounded-xl border border-transparent hover:border-border transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{org.name}</h3>
                      <p className="text-xs text-muted-foreground">{org.industry} • Created {org.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground">{org.users}</span> users
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground">{org.assistants}</span> assistants
                    </div>
                    <span className={`status-pill ${org.status === "active" ? "status-active" : "bg-muted text-muted-foreground"}`}>
                      {org.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Connector Types Toggle */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-float p-6">
            <h2 className="text-section-title mb-2">Connector Types</h2>
            <p className="text-xs text-muted-foreground mb-6">Enable or disable connector types platform-wide</p>

            <div className="space-y-3">
              {connectors.map((connector) => {
                const Icon = connector.icon;
                return (
                  <div
                    key={connector.id}
                    className="flex items-center justify-between p-4 bg-background rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{connector.name}</span>
                    </div>
                    <button
                      onClick={() => toggleConnector(connector.id)}
                      className="text-primary"
                    >
                      {connector.enabled ? (
                        <ToggleRight className="w-8 h-8" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
