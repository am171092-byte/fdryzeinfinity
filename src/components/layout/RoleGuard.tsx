import { useRole, UserRole } from "@/contexts/RoleContext";
import AccessRestricted from "./AccessRestricted";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  requiredRoleLabel?: string;
  children: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, requiredRoleLabel, children }: RoleGuardProps) => {
  const { role } = useRole();

  if (!allowedRoles.includes(role)) {
    return <AccessRestricted requiredRole={requiredRoleLabel} />;
  }

  return <>{children}</>;
};

export default RoleGuard;
