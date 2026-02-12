import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Shield, Bell, Palette, Database } from "lucide-react";
import DataConnectionsTab from "@/components/settings/DataConnectionsTab";
import { useRole } from "@/contexts/RoleContext";

const allTabs = [
  { id: "profile", label: "Profile", icon: User, roles: ["super-admin", "org-admin", "user"] },
  { id: "role", label: "Role", icon: Shield, roles: ["super-admin", "org-admin", "user"] },
  { id: "notifications", label: "Notifications", icon: Bell, roles: ["super-admin", "org-admin", "user"] },
  { id: "preferences", label: "Preferences", icon: Palette, roles: ["super-admin", "org-admin", "user"] },
  { id: "connections", label: "Data Connections", icon: Database, roles: ["org-admin"] },
] as const;

const Settings = () => {
  const [searchParams] = useSearchParams();
  const { role } = useRole();

  const tabs = useMemo(
    () => allTabs.filter((t) => (t.roles as readonly string[]).includes(role)),
    [role]
  );

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams, tabs]);

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-page-title mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </motion.div>

      <div className="flex gap-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-56 shrink-0"
        >
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary-subtle text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 card-elevated p-8"
        >
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-section-title mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-primary-subtle rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">
                    {role === "super-admin" ? "SA" : role === "org-admin" ? "SM" : "JC"}
                  </span>
                </div>
                <div>
                  <button className="text-sm text-primary hover:text-primary-hover transition-colors">
                    Change photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input
                    type="text"
                    defaultValue={role === "super-admin" ? "Platform" : role === "org-admin" ? "Sarah" : "James"}
                    className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input
                    type="text"
                    defaultValue={role === "super-admin" ? "Admin" : role === "org-admin" ? "Mitchell" : "Chen"}
                    className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    defaultValue={role === "super-admin" ? "admin@fdryze.com" : role === "org-admin" ? "sarah.mitchell@acme-corp.com" : "james.chen@acme-corp.com"}
                    className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <input
                    type="text"
                    defaultValue={role === "super-admin" ? "Platform Operations" : role === "org-admin" ? "Operations" : "Finance"}
                    className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "role" && (
            <div className="space-y-6">
              <h2 className="text-section-title mb-6">Role & Permissions</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Current Role</p>
                      <p className="text-sm text-muted-foreground">
                        {role === "super-admin" ? "Super Admin" : role === "org-admin" ? "Organization Admin" : "User"}
                      </p>
                    </div>
                    <span className="status-pill status-active">Active</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Permissions</p>
                  {(role === "super-admin"
                    ? ["Manage organizations", "Configure connector types", "View platform metrics", "Manage platform settings"]
                    : role === "org-admin"
                    ? ["Create and manage assistants", "Configure data connections", "Manage users and groups", "View performance metrics", "Publish assistants"]
                    : ["Use assigned assistants", "View assistant dashboard", "View personal profile"]
                  ).map((permission) => (
                    <div key={permission} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-success rounded-full" />
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-section-title mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { label: "Workflow completion alerts", description: "Get notified when workflows finish processing", enabled: true },
                  { label: "Error notifications", description: "Receive alerts when errors occur", enabled: true },
                  { label: "Daily summary", description: "Get a daily summary of workflow performance", enabled: false },
                  { label: "New agent recommendations", description: "Suggestions for new agents based on your usage", enabled: true },
                ].map((notification) => (
                  <div key={notification.label} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">{notification.label}</p>
                      <p className="text-xs text-muted-foreground">{notification.description}</p>
                    </div>
                    <button className={`w-12 h-6 rounded-full transition-colors relative ${notification.enabled ? "bg-primary" : "bg-border"}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-card rounded-full transition-transform shadow ${notification.enabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h2 className="text-section-title mb-6">Application Preferences</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Default Dashboard View</label>
                  <select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                    <option>Overview</option>
                    <option>Recent Activity</option>
                    <option>Performance Metrics</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Date Format</label>
                  <select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Time Zone</label>
                  <select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "connections" && <DataConnectionsTab />}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
