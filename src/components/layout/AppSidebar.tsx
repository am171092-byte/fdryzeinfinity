import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Workflow, MessageSquare, BarChart3, Settings, Shield, Building2, LogOut, Plug, Briefcase, PanelLeftClose, PanelLeft } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useSidebarCollapse } from "@/contexts/SidebarContext";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Super Admin Dashboard", path: "/super-admin", icon: Shield },
  { label: "Organization", path: "/org-dashboard", icon: Building2 },
  { label: "FDRYZE Nexus", path: "/query", icon: MessageSquare },
  { label: "FDRYZE AI Studio", path: "/flows", icon: Workflow },
  { label: "Connectors", path: "/connectors", icon: Plug },
  { label: "Jobs", path: "/jobs", icon: Briefcase },
  { label: "My Assistants", path: "/portal", icon: MessageSquare },
  { label: "Metrics", path: "/metrics", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

const AppSidebar = () => {
  const location = useLocation();
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const { collapsed, toggle } = useSidebarCollapse();

  return (
    <aside
      className={`h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 z-40 transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[260px]"
      }`}
    >
      {/* Logo + collapse toggle */}
      <div className="h-16 px-3 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 pl-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
              FDRYZE® INFINITY
            </span>
          </div>
        )}
        <button
          onClick={toggle}
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all ${
            collapsed ? "mx-auto" : ""
          }`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === "/flows" && location.pathname.startsWith("/flows"));
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-muted"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                  )}
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border">
        {collapsed ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 bg-primary-subtle rounded-full flex items-center justify-center">
              <span className="text-primary font-medium text-sm">
                {role === "super-admin" ? "SA" : role === "org-admin" ? "SM" : "JC"}
              </span>
            </div>
            <button
              onClick={() => { setRole("org-admin"); navigate("/"); }}
              title="Sign Out"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="w-9 h-9 bg-primary-subtle rounded-full flex items-center justify-center shrink-0">
                <span className="text-primary font-medium text-sm">
                  {role === "super-admin" ? "SA" : role === "org-admin" ? "SM" : "JC"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {role === "super-admin" ? "Platform Admin" : role === "org-admin" ? "Sarah Mitchell" : "James Chen"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {role === "super-admin" ? "Super Admin" : role === "org-admin" ? "Org Admin" : "User"}
                </p>
              </div>
            </div>
            <button
              onClick={() => { setRole("org-admin"); navigate("/"); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
