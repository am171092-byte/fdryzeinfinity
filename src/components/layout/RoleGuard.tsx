import { Navigate } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const roleHomeMap: Record<UserRole, string> = {
  "super-admin": "/super-admin",
  "org-admin": "/org-dashboard",
  "user": "/portal",
};

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { role } = useRole();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!allowedRoles.includes(role) && !toastShown.current) {
      toastShown.current = true;
      toast({
        title: "Access Denied",
        description: "You don't have access to this page.",
        variant: "destructive",
      });
    }
  }, [allowedRoles, role]);

  if (!allowedRoles.includes(role)) {
    return <Navigate to={roleHomeMap[role]} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
