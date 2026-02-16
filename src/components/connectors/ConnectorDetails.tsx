import { motion } from "framer-motion";
import { ArrowLeft, Cloud, Upload, HardDrive, Database, ExternalLink, Settings, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ConnectorData, ConnectorTypeId, FILE_TYPES } from "./types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const typeIcons: Record<ConnectorTypeId, React.ElementType> = {
  upload: Upload, sharepoint: Cloud, "google-drive": HardDrive, s3: Database,
};
const typeLabels: Record<ConnectorTypeId, string> = {
  upload: "Upload", sharepoint: "SharePoint", "google-drive": "Google Drive", s3: "Amazon S3",
};
const statusStyles: Record<string, string> = {
  draft: "bg-warning/10 text-warning",
  active: "status-active",
  syncing: "bg-primary-subtle text-primary",
  error: "status-error",
};
const contentTypeLabels: Record<string, string> = {
  "document-library": "Document Library", list: "List", pages: "Pages",
};

interface ConnectorDetailsProps {
  connector: ConnectorData;
  onBack: () => void;
  onEdit: () => void;
}

const ConnectorDetails = ({ connector, onBack, onEdit }: ConnectorDetailsProps) => {
  const navigate = useNavigate();
  const Icon = typeIcons[connector.type];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (connector.status === "draft" || connector.status === "syncing") {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 95 ? 95 : p + Math.random() * 8));
      }, 600);
      return () => clearInterval(interval);
    }
  }, [connector.status]);

  const fileTypeLabels = (connector.selectedFileTypes || [])
    .map((id) => FILE_TYPES.find((ft) => ft.id === id)?.label).filter(Boolean);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Connectors
        </button>

        <div className="card-elevated p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-page-title">{connector.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2.5 py-1 bg-primary-subtle rounded-lg text-xs text-primary font-medium">
                    {typeLabels[connector.type]}
                  </span>
                  <span className={`status-pill ${statusStyles[connector.status]}`}>
                    {connector.status.charAt(0).toUpperCase() + connector.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={onEdit} className="h-10 px-4 bg-secondary hover:bg-muted text-foreground font-medium rounded-xl flex items-center gap-2 transition-colors text-sm">
              <Settings className="w-4 h-4" /> Edit Properties
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <Row label="Source URL" value={connector.sourceUrl} />
            <Row label="Last Sync" value={connector.lastSync} />
            <Row label="Sources" value={connector.sourcesSummary} />
            {connector.contentType && <Row label="Content Type" value={contentTypeLabels[connector.contentType] || ""} />}
            {connector.filterMode && connector.selectedItems && connector.selectedItems.length > 0 && (
              <Row label={`${connector.filterMode === "include" ? "Included" : "Excluded"} Items`} value={connector.selectedItems.join(", ")} />
            )}
            {connector.fileTypeFilterMode && fileTypeLabels.length > 0 && (
              <Row label={`File Types (${connector.fileTypeFilterMode})`} value={fileTypeLabels.join(", ")} />
            )}
            {connector.region && <Row label="Region" value={connector.region} />}
            {connector.usedByAssistants > 0 && (
              <Row label="Used By" value={`${connector.usedByAssistants} assistant${connector.usedByAssistants > 1 ? "s" : ""}`} />
            )}
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
            <Shield className="w-4 h-4 shrink-0" />
            Credentials are pre-configured by your administrator.
          </div>
        </div>

        {/* Indexing Status */}
        {(connector.status === "draft" || connector.status === "syncing") && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Indexing Job Started</h3>
            <p className="text-sm text-muted-foreground mb-4">Your connector data is being indexed. This may take a few minutes.</p>
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-xs text-muted-foreground mb-4">{Math.round(progress)}% complete</p>
            <button
              onClick={() => navigate("/jobs")}
              className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Jobs
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-1">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm font-medium text-foreground text-right break-all">{value}</span>
  </div>
);

export default ConnectorDetails;
