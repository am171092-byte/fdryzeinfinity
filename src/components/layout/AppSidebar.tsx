import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Workflow, MessageSquare, BarChart3, Settings, Shield, Building2 } from "lucide-react";

const navItems = [
  { label: "Super Admin", path: "/super-admin", icon: Shield, roles: ["super-admin"] },
  { label: "Organization", path: "/org-dashboard", icon: Building2, roles: ["org-admin"] },
  { label: "My Assistants", path: "/portal", icon: MessageSquare, roles: ["user"] },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "FDRYZE AI Studio", path: "/flows", icon: Workflow },
  { label: "FDRYZE Nexus", path: "/query", icon: MessageSquare },
  { label: "Performance & Metrics", path: "/metrics", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[260px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-40">
      <div className="h-16 px-6 flex items-center border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
            FDRYZE® INFINITY
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === "/flows" && location.pathname.startsWith("/flows"));
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-subtle rounded-full flex items-center justify-center">
            <span className="text-primary font-medium text-sm">SM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Sarah Mitchell</p>
            <p className="text-xs text-muted-foreground truncate">Org Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
