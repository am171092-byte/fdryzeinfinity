import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Organization Admin");
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const roles = [
    { label: "Super Admin", route: "/super-admin" },
    { label: "Organization Admin", route: "/org-dashboard" },
    { label: "User", route: "/portal" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find((r) => r.label === selectedRole);
    navigate(role?.route || "/portal");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[420px] bg-card rounded-panel p-8 shadow-float"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-semibold text-foreground tracking-tight">
              FDRYZE® INFINITY
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Enterprise AI platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Role Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Role</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleOpen(!isRoleOpen)}
                className="w-full h-12 px-4 bg-background border border-input rounded-lg flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <span className="text-foreground">{selectedRole}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    isRoleOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isRoleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-card border border-input rounded-lg shadow-float z-50 overflow-hidden"
                >
                  {roles.map((role) => (
                    <button
                      key={role.label}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.label);
                        setIsRoleOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors ${
                        selectedRole === role.label
                          ? "bg-primary-subtle text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input
              type="text"
              defaultValue="admin@acme-corp.com"
              className="w-full h-12 px-4 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="••••••••••••"
                className="w-full h-12 px-4 pr-12 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-helper text-xs mt-6">
          FDRYZE® INFINITY — Enterprise Edition
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
