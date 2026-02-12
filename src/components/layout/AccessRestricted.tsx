import { motion } from "framer-motion";
import { ShieldX, ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";

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

interface AccessRestrictedProps {
  requiredRole?: string;
}

const AccessRestricted = ({ requiredRole }: AccessRestrictedProps) => {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-2xl flex items-center justify-center">
          <ShieldX className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-page-title mb-3">Access Restricted</h1>
        <p className="text-muted-foreground mb-2">
          You don't have permission to access this feature.
        </p>
        {requiredRole && (
          <p className="text-sm text-muted-foreground mb-8">
            This page requires <span className="font-medium text-foreground">{requiredRole}</span> access.
            Your current role is <span className="font-medium text-foreground">{roleLabelMap[role] || role}</span>.
          </p>
        )}
        {!requiredRole && (
          <p className="text-sm text-muted-foreground mb-8">
            Contact your administrator to request the appropriate permissions.
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(roleHomeMap[role] || "/portal")}
            className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </button>
          <button
            onClick={() => {}}
            className="h-11 px-6 bg-secondary hover:bg-muted text-foreground font-medium rounded-xl flex items-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Request Access
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessRestricted;
