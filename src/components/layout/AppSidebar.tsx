import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Workflow, MessageSquare, BarChart3, Settings, Shield, Building2, LogOut } from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: "Super Admin Dashboard", path: "/super-admin", icon: Shield, roles: ["super-admin"] },
  { label: "Organization", path: "/org-dashboard", icon: Building2, roles: ["org-admin"] },
  { label: "FDRYZE Nexus", path: "/query", icon: MessageSquare, roles: ["org-admin"] },
  { label: "FDRYZE AI Studio", path: "/flows", icon: Workflow, roles: ["org-admin"] },
  { label: "Performance & Metrics", path: "/metrics", icon: BarChart3, roles: ["org-admin"] },
  { label: "My Assistants", path: "/portal", icon: MessageSquare, roles: ["user"] },
  { label: "Settings", path: "/settings", icon: Settings, roles: ["super-admin", "org-admin", "user"] },
];

const AppSidebar = () => {
  const location = useLocation();
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const visibleItems = navItems.filter((item) => item.roles.includes(role));

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
          {visibleItems.map((item) => {
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
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-primary-subtle rounded-full flex items-center justify-center">
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
          onClick={() => {
            setRole("org-admin");
            navigate("/");
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
