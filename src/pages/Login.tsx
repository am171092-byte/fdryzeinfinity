import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";
import logo from "@/assets/Ryze-Infinity-Logo.png";

const EMAIL_ROLE_MAP: Record<string, { role: UserRole; route: string }> = {
  "superadmin@test.com": { role: "super-admin", route: "/super-admin" },
  "admin@test.com": { role: "org-admin", route: "/org-dashboard" },
  "user@test.com": { role: "user", route: "/portal" },
};

const Login = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [showLimitedBanner, setShowLimitedBanner] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const mapping = EMAIL_ROLE_MAP[normalizedEmail];

    if (mapping) {
      setShowLimitedBanner(false);
      setRole(mapping.role);
      navigate(mapping.route);
    } else {
      // Default to user role with limited access banner
      setRole("user");
      setShowLimitedBanner(true);
      setTimeout(() => navigate("/portal"), 1200);
    }
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
          <img src={logo} alt="RYZE INFINITY" className="h-20 mb-3 object-contain" />
          <p className="text-muted-foreground text-sm">
            Enterprise AI Platform
          </p>
        </div>

        {/* Limited Access Banner */}
        {showLimitedBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 bg-[hsl(32,95%,95%)] rounded-lg mb-5"
          >
            <AlertTriangle className="w-5 h-5 text-[hsl(32,95%,44%)] shrink-0" />
            <p className="text-sm text-[hsl(32,95%,30%)]">Limited access demo account</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
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
