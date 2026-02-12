import { useRole } from "@/contexts/RoleContext";
import AccessRestricted from "@/components/layout/AccessRestricted";
import DataConnectionsTab from "@/components/settings/DataConnectionsTab";
import { motion } from "framer-motion";

const Connectors = () => {
  const { role } = useRole();

  if (role !== "org-admin") {
    return <AccessRestricted requiredRole="Organization Admin" />;
  }

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-page-title mb-2">Data Connectors</h1>
        <p className="text-muted-foreground">
          Manage external data integrations
        </p>
      </motion.div>

      <DataConnectionsTab />
    </div>
  );
};

export default Connectors;
