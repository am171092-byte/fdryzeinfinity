import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useSidebarCollapse } from "@/contexts/SidebarContext";
import logo from "@/assets/Ryze-Infinity-Logo.png";

const roleHomeMap: Record<string, string> = {
  "super-admin": "/super-admin",
  "org-admin": "/org-dashboard",
  "user": "/portal",
};

const roleLabelMap: Record<string, string> = {
  "super-admin": "Super Admin",
  "org-admin": "Organization Admin",
  "user": "User",
};

const roleEmailMap: Record<string, string> = {
  "super-admin": "superadmin@test.com",
  "org-admin": "admin@test.com",
  "user": "user@test.com",
};

const AppHeader = () => {
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const { collapsed } = useSidebarCollapse();

  return (
    <header
      className="h-14 bg-card border-b border-border flex items-center justify-between px-6 fixed top-0 right-0 z-30 transition-all duration-300"
      style={{ left: collapsed ? "68px" : "260px" }}
    >
      <button
        onClick={() => navigate(roleHomeMap[role] || "/portal")}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <img src={logo} alt="RYZE INFINITY" className="h-8 object-contain" />
      </button>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{roleEmailMap[role]}</p>
          <p className="text-xs text-muted-foreground">{roleLabelMap[role]}</p>
        </div>
        <div className="w-9 h-9 bg-primary-subtle rounded-full flex items-center justify-center">
          <span className="text-primary font-medium text-sm">
            {role === "super-admin" ? "SA" : role === "org-admin" ? "SM" : "JC"}
          </span>
        </div>
        <button
          onClick={() => {
            setRole("org-admin");
            navigate("/");
          }}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
