import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  UsersRound,
  Database,
  Sparkles,
  Plus,
  Search,
  Shield,
  ArrowUpRight,
  Clock,
} from "lucide-react";

type Tab = "users" | "groups" | "connectors" | "assistants";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "users", label: "Users", icon: Users },
  { id: "groups", label: "User Groups", icon: UsersRound },
  { id: "connectors", label: "Data Connectors", icon: Database },
  { id: "assistants", label: "Query Assistants", icon: Sparkles },
];

const usersData = [
  { id: "1", name: "Sarah Mitchell", email: "sarah@acme-corp.com", role: "Org Admin", group: "Operations", status: "active" },
  { id: "2", name: "James Chen", email: "james@acme-corp.com", role: "User", group: "Finance", status: "active" },
  { id: "3", name: "Maria Garcia", email: "maria@acme-corp.com", role: "User", group: "Risk", status: "active" },
  { id: "4", name: "David Kim", email: "david@acme-corp.com", role: "User", group: "Operations", status: "active" },
  { id: "5", name: "Lisa Wang", email: "lisa@acme-corp.com", role: "User", group: "Support", status: "inactive" },
];

const groupsData = [
  { id: "1", name: "Operations", members: 12, assistants: 3 },
  { id: "2", name: "Finance", members: 8, assistants: 2 },
  { id: "3", name: "Risk & Compliance", members: 6, assistants: 4 },
  { id: "4", name: "Support", members: 15, assistants: 2 },
  { id: "5", name: "HR", members: 4, assistants: 1 },
];

const connectorsData = [
  { id: "1", name: "SharePoint - Policies", type: "SharePoint", status: "connected", lastSynced: "2 hours ago" },
  { id: "2", name: "AWS S3 - Reports", type: "S3", status: "connected", lastSynced: "30 min ago" },
  { id: "3", name: "PostgreSQL - Analytics", type: "Database", status: "connected", lastSynced: "5 min ago" },
  { id: "4", name: "Training Documents", type: "Documents", status: "connected", lastSynced: "1 day ago" },
];

const assistantsData = [
  { id: "1", name: "Policy Inquiry Assistant", status: "active", users: 18, groups: 2, sources: 4 },
  { id: "2", name: "Claims Support Bot", status: "active", users: 24, groups: 3, sources: 3 },
  { id: "3", name: "Risk Analysis Helper", status: "draft", users: 0, groups: 0, sources: 2 },
  { id: "4", name: "Compliance Checker", status: "active", users: 12, groups: 1, sources: 5 },
];

const OrgDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title mb-2">Organization Dashboard</h1>
            <p className="text-muted-foreground">Manage users, groups, connectors, and assistants</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Users", value: usersData.length, icon: Users, change: "+3 this month" },
          { label: "User Groups", value: groupsData.length, icon: UsersRound, change: "5 active" },
          { label: "Data Connectors", value: connectorsData.length, icon: Database, change: "All connected" },
          { label: "Assistants", value: assistantsData.length, icon: Sparkles, change: "3 active" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-float p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <button
            onClick={() => {
              if (activeTab === "connectors") navigate("/settings?tab=connections");
              if (activeTab === "assistants") navigate("/query");
            }}
            className="h-10 px-4 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            {activeTab === "users" && "Add User"}
            {activeTab === "groups" && "Create Group"}
            {activeTab === "connectors" && "Add Connector"}
            {activeTab === "assistants" && "Create Assistant"}
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-2">
            {usersData.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-muted/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-subtle rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{user.name.split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.role}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">{user.group}</span>
                  <span className={`status-pill ${user.status === "active" ? "status-active" : "bg-muted text-muted-foreground"}`}>
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === "groups" && (
          <div className="space-y-2">
            {groupsData.map((group) => (
              <div key={group.id} className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-muted/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center">
                    <UsersRound className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{group.name}</h3>
                    <p className="text-xs text-muted-foreground">{group.members} members</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{group.assistants} assistants assigned</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connectors Tab */}
        {activeTab === "connectors" && (
          <div className="space-y-2">
            {connectorsData.map((conn) => (
              <div key={conn.id} className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-muted/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{conn.name}</h3>
                    <p className="text-xs text-muted-foreground">{conn.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Synced {conn.lastSynced}
                  </div>
                  <span className="status-pill status-active">Connected</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assistants Tab */}
        {activeTab === "assistants" && (
          <div className="space-y-2">
            {assistantsData.map((asst) => (
              <div key={asst.id} className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-muted/50 transition-all cursor-pointer" onClick={() => navigate("/query")}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{asst.name}</h3>
                    <p className="text-xs text-muted-foreground">{asst.sources} knowledge sources</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-muted-foreground">{asst.users} users, {asst.groups} groups</span>
                  <span className={`status-pill ${asst.status === "active" ? "status-active" : "bg-warning/10 text-warning"}`}>
                    {asst.status === "active" ? "Active" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrgDashboard;
