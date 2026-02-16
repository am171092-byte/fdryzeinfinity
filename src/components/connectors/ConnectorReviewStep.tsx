import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Cloud, Upload, HardDrive, Database, Shield, CheckCircle } from "lucide-react";
import { ConnectorTypeId, ContentType, FilterMode, FILE_TYPES } from "./types";

const typeInfo: Record<ConnectorTypeId, { label: string; Icon: React.ElementType }> = {
  sharepoint: { label: "SharePoint", Icon: Cloud },
  upload: { label: "Upload", Icon: Upload },
  "google-drive": { label: "Google Drive", Icon: HardDrive },
  s3: { label: "Amazon S3", Icon: Database },
};

const contentTypeLabels: Record<string, string> = {
  "document-library": "Document Library",
  "list": "List",
  "pages": "Pages",
};

interface ConnectorReviewStepProps {
  connectorName: string;
  connectorType: ConnectorTypeId;
  sourceUrl: string;
  contentType: ContentType;
  filterMode?: FilterMode;
  selectedItems: string[];
  fileTypeFilterMode: FilterMode | null;
  selectedFileTypes: string[];
  collectionName: string;
  driveContentType: "folder" | "shared-drive" | null;
  region: string;
  prefix: string;
  onBack: () => void;
  onCreate: () => void;
  isCreating: boolean;
}

const ConnectorReviewStep = ({
  connectorName, connectorType, sourceUrl,
  contentType, filterMode, selectedItems,
  fileTypeFilterMode, selectedFileTypes,
  collectionName, driveContentType, region, prefix,
  onBack, onCreate, isCreating,
}: ConnectorReviewStepProps) => {
  const { label, Icon } = typeInfo[connectorType];
  const fileTypeLabels = selectedFileTypes.map((id) => FILE_TYPES.find((ft) => ft.id === id)?.label).filter(Boolean);

  return (
    <div className="w-full max-w-[700px]">
      <div className="mb-6">
        <h2 className="text-section-title mb-1">Review & Create</h2>
        <p className="text-sm text-muted-foreground">Verify the connector settings before creating.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6 space-y-4 mb-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{connectorName || label + " Connector"}</h3>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>

        <div className="space-y-3">
          <Row label="Connector Type" value={label} />
          <Row label="Source URL" value={sourceUrl} />

          {connectorType === "sharepoint" && contentType && (
            <Row label="Content Type" value={contentTypeLabels[contentType] || ""} />
          )}
          {connectorType === "sharepoint" && contentType && filterMode && selectedItems.length > 0 && (
            <Row label={`${filterMode === "include" ? "Included" : "Excluded"} Items`} value={selectedItems.join(", ")} />
          )}
          {connectorType === "upload" && collectionName && (
            <Row label="Collection Name" value={collectionName} />
          )}
          {connectorType === "google-drive" && driveContentType && (
            <Row label="Content Type" value={driveContentType === "shared-drive" ? "Shared Drive" : "Folder"} />
          )}
          {connectorType === "s3" && region && <Row label="Region" value={region} />}
          {connectorType === "s3" && prefix && <Row label="Prefix" value={prefix} />}

          {fileTypeFilterMode && fileTypeLabels.length > 0 && (
            <Row
              label={`File Types (${fileTypeFilterMode})`}
              value={fileTypeLabels.join(", ")}
            />
          )}

          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Credentials: Managed by admin</span>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between">
        <button onClick={onBack} className="h-10 px-5 bg-secondary hover:bg-muted text-foreground font-medium rounded-xl flex items-center gap-2 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <motion.button
          onClick={onCreate}
          disabled={isCreating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all disabled:opacity-70"
        >
          {isCreating ? (
            <><CheckCircle className="w-5 h-5 animate-pulse" /> Creating...</>
          ) : (
            <><Sparkles className="w-5 h-5" /> Create Connector</>
          )}
        </motion.button>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm font-medium text-foreground text-right break-all">{value}</span>
  </div>
);

export default ConnectorReviewStep;
