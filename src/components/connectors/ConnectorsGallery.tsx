import { motion } from "framer-motion";
import { Plus, Cloud, Upload, HardDrive, Database, Clock, MoreHorizontal, Link2 } from "lucide-react";
import { ConnectorData, ConnectorTypeId } from "./types";

const typeIcons: Record<ConnectorTypeId, React.ElementType> = {
  upload: Upload,
  sharepoint: Cloud,
  "google-drive": HardDrive,
  s3: Database,
};

const typeLabels: Record<ConnectorTypeId, string> = {
  upload: "Upload",
  sharepoint: "SharePoint",
  "google-drive": "Google Drive",
  s3: "Amazon S3",
};

const statusStyles: Record<string, string> = {
  draft: "bg-warning/10 text-warning",
  active: "status-active",
  syncing: "bg-primary-subtle text-primary",
  error: "status-error",
};

interface ConnectorsGalleryProps {
  connectors: ConnectorData[];
  onCreateNew: () => void;
  onSelectConnector: (id: string) => void;
}

const maskUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.hostname + (u.pathname.length > 1 ? u.pathname.substring(0, 30) + (u.pathname.length > 30 ? "…" : "") : "");
  } catch {
    return url.length > 40 ? url.substring(0, 40) + "…" : url;
  }
};

const ConnectorsGallery = ({ connectors, onCreateNew, onSelectConnector }: ConnectorsGalleryProps) => {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-page-title mb-2">Data Connectors</h1>
          <p className="text-muted-foreground">Manage external data integrations</p>
        </div>
        <motion.button
          onClick={onCreateNew}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Connector
        </motion.button>
      </motion.div>

      {connectors.length > 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {connectors.map((connector, index) => {
            const Icon = typeIcons[connector.type];
            return (
              <motion.div
                key={connector.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => onSelectConnector(connector.id)}
                className="card-elevated p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`status-pill ${statusStyles[connector.status]}`}>
                      {connector.status.charAt(0).toUpperCase() + connector.status.slice(1)}
                    </span>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {connector.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Link2 className="w-3 h-3" />
                  {maskUrl(connector.sourceUrl)}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-2.5 py-1 bg-primary-subtle rounded-lg text-xs text-primary font-medium">
                    {typeLabels[connector.type]}
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
                    {connector.sourcesSummary}
                  </div>
                  {connector.usedByAssistants > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
                      Used by {connector.usedByAssistants} assistant{connector.usedByAssistants > 1 ? "s" : ""}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                  <Clock className="w-3 h-3" />
                  Last sync: {connector.lastSync}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-float p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <Database className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-section-title mb-2">No connectors configured yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Connect your first data source to start building knowledge for your AI assistants.
          </p>
          <motion.button onClick={onCreateNew} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl inline-flex items-center gap-2 shadow-lg shadow-primary/25 transition-all">
            <Plus className="w-5 h-5" />
            New Connector
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ConnectorsGallery;
