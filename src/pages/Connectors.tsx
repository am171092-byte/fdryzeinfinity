import { useState } from "react";
import { motion } from "framer-motion";
import { UploadedFile } from "@/components/connectors/UploadProperties";
import { Sparkles, CheckCircle, ArrowLeft } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import AccessRestricted from "@/components/layout/AccessRestricted";
import ConnectorsGallery from "@/components/connectors/ConnectorsGallery";
import ConnectorDetails from "@/components/connectors/ConnectorDetails";
import SharePointProperties from "@/components/connectors/SharePointProperties";
import UploadProperties from "@/components/connectors/UploadProperties";
import GoogleDriveProperties from "@/components/connectors/GoogleDriveProperties";
import S3Properties from "@/components/connectors/S3Properties";
import {
  ConnectorData, ConnectorTypeId,
  SharePointSiteBlock, createEmptySiteBlock,
} from "@/components/connectors/types";

type View = "gallery" | "create" | "details";

const initialConnectors: ConnectorData[] = [
  {
    id: "c1", name: "SharePoint – Policies", type: "sharepoint",
    sourceUrl: "https://contoso.sharepoint.com/sites/Policies",
    status: "active", lastSync: "2 hours ago", sourcesSummary: "Doc Libraries: 2",
    usedByAssistants: 2, contentType: "document-library", filterMode: "include",
    selectedItems: ["Policies", "Contracts"], fileTypeFilterMode: null, selectedFileTypes: [],
  },
  {
    id: "c2", name: "S3 – Reports Bucket", type: "s3",
    sourceUrl: "s3://company-reports/quarterly/",
    status: "syncing", lastSync: "30 min ago", sourcesSummary: "Prefix: quarterly/",
    usedByAssistants: 1, fileTypeFilterMode: "include", selectedFileTypes: ["pdf", "docx"],
  },
  {
    id: "c3", name: "Google Drive – Training", type: "google-drive",
    sourceUrl: "https://drive.google.com/drive/folders/abc123",
    status: "active", lastSync: "1 day ago", sourcesSummary: "Folder",
    usedByAssistants: 0, fileTypeFilterMode: null, selectedFileTypes: [],
  },
];

const typeOptions: { id: ConnectorTypeId; label: string }[] = [
  { id: "upload", label: "Upload" },
  { id: "sharepoint", label: "SharePoint" },
  { id: "google-drive", label: "Google Drive" },
  { id: "s3", label: "Amazon S3" },
];

const Connectors = () => {
  const { role } = useRole();
  const [view, setView] = useState<View>("gallery");
  const [connectors, setConnectors] = useState<ConnectorData[]>(initialConnectors);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Create form state
  const [connectorName, setConnectorName] = useState("");
  const [connectorType, setConnectorType] = useState<ConnectorTypeId | null>(null);
  // SharePoint
  const [siteBlocks, setSiteBlocks] = useState<SharePointSiteBlock[]>([createEmptySiteBlock()]);
  // Upload
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadSelectedFileTypes, setUploadSelectedFileTypes] = useState<string[]>([]);
  // Google Drive
  const [gdSourceUrl, setGdSourceUrl] = useState("");
  const [gdSelectedFileTypes, setGdSelectedFileTypes] = useState<string[]>([]);
  // S3
  const [s3SourceUrl, setS3SourceUrl] = useState("");
  const [s3SelectedFileTypes, setS3SelectedFileTypes] = useState<string[]>([]);

  if (role !== "org-admin") {
    return <AccessRestricted requiredRole="Organization Admin" />;
  }

  const resetForm = () => {
    setConnectorName("");
    setConnectorType(null);
    setSiteBlocks([createEmptySiteBlock()]);
    setUploadedFiles([]);
    setUploadSelectedFileTypes([]);
    setGdSourceUrl("");
    setGdSelectedFileTypes([]);
    setS3SourceUrl("");
    setS3SelectedFileTypes([]);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    resetForm();
    setView("create");
  };

  const handleSelectConnector = (id: string) => {
    setSelectedConnectorId(id);
    setView("details");
  };

  // Validation
  const canCreate = (() => {
    if (!connectorType) return false;
    if (connectorType === "upload") return uploadedFiles.length > 0;
    if (connectorType === "sharepoint") return siteBlocks.every((b) => b.url.trim().length > 0);
    if (connectorType === "google-drive") return gdSourceUrl.trim().length > 0;
    if (connectorType === "s3") return s3SourceUrl.trim().length > 0;
    return false;
  })();

  const handleCreate = () => {
    if (!connectorType || !canCreate) return;
    setIsCreating(true);
    const typeLabels: Record<ConnectorTypeId, string> = {
      upload: "Upload", sharepoint: "SharePoint", "google-drive": "Google Drive", s3: "Amazon S3",
    };

    const sourceUrl = connectorType === "sharepoint"
      ? siteBlocks[0].url
      : connectorType === "upload"
      ? `uploads://${uploadedFiles.length}-files`
      : connectorType === "google-drive"
      ? gdSourceUrl
      : s3SourceUrl;

    const summary = connectorType === "sharepoint"
      ? `${siteBlocks.length} site(s)`
      : connectorType === "upload"
      ? `${uploadedFiles.length} file(s)`
      : "Configured";

    const newConnector: ConnectorData = {
      id: `c${Date.now()}`,
      name: connectorName.trim() || `${typeLabels[connectorType]} Connector`,
      type: connectorType,
      sourceUrl,
      status: "draft",
      lastSync: "Just now",
      sourcesSummary: summary,
      usedByAssistants: 0,
      siteBlocks: connectorType === "sharepoint" ? siteBlocks : undefined,
    };

    setTimeout(() => {
      setConnectors((prev) => [newConnector, ...prev]);
      setSelectedConnectorId(newConnector.id);
      setView("details");
      setIsCreating(false);
    }, 1200);
  };

  const selectedConnector = connectors.find((c) => c.id === selectedConnectorId);

  // Details view
  if (view === "details" && selectedConnector) {
    return (
      <ConnectorDetails
        connector={selectedConnector}
        onBack={() => setView("gallery")}
        onEdit={() => {
          // For now just go to create with type pre-selected
          setConnectorType(selectedConnector.type);
          setConnectorName(selectedConnector.name);
          setView("create");
        }}
      />
    );
  }

  // Gallery view
  if (view === "gallery") {
    return (
      <ConnectorsGallery
        connectors={connectors}
        onCreateNew={handleCreateNew}
        onSelectConnector={handleSelectConnector}
      />
    );
  }

  // Single-page Create view
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => setView("gallery")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Connectors
        </button>

        <h1 className="text-page-title mb-1">Create Connector</h1>
        <p className="text-muted-foreground mb-8">Set up a new data source for your AI assistants.</p>

        <div className="card-elevated p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Connector Name</label>
            <input
              type="text"
              value={connectorName}
              onChange={(e) => setConnectorName(e.target.value)}
              placeholder="e.g. SharePoint – Policies"
              maxLength={100}
              className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <p className="text-xs text-muted-foreground">This name will appear in Nexus when linking to assistants.</p>
          </div>

          {/* Type dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Connector Type <span className="text-destructive">*</span></label>
            <select
              value={connectorType || ""}
              onChange={(e) => setConnectorType(e.target.value ? (e.target.value as ConnectorTypeId) : null)}
              className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            >
              <option value="">Select connector type…</option>
              {typeOptions.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Connector Properties — rendered after type selection */}
          {connectorType && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-border space-y-2">
              <h2 className="text-base font-semibold text-foreground mb-4">Connector Properties</h2>

              {connectorType === "sharepoint" && (
                <SharePointProperties
                  siteBlocks={siteBlocks}
                  onSiteBlocksChange={setSiteBlocks}
                />
              )}

              {connectorType === "upload" && (
                <UploadProperties
                  uploadedFiles={uploadedFiles}
                  onUploadedFilesChange={setUploadedFiles}
                  selectedFileTypes={uploadSelectedFileTypes}
                  onSelectedFileTypesChange={setUploadSelectedFileTypes}
                />
              )}

              {connectorType === "google-drive" && (
                <GoogleDriveProperties
                  sourceUrl={gdSourceUrl}
                  onSourceUrlChange={setGdSourceUrl}
                  selectedFileTypes={gdSelectedFileTypes}
                  onSelectedFileTypesChange={setGdSelectedFileTypes}
                />
              )}

              {connectorType === "s3" && (
                <S3Properties
                  sourceUrl={s3SourceUrl}
                  onSourceUrlChange={setS3SourceUrl}
                  selectedFileTypes={s3SelectedFileTypes}
                  onSelectedFileTypesChange={setS3SelectedFileTypes}
                />
              )}
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setView("gallery")}
            className="h-10 px-5 bg-secondary hover:bg-muted text-foreground font-medium rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleCreate}
            disabled={!canCreate || isCreating}
            whileHover={canCreate ? { scale: 1.02 } : {}}
            whileTap={canCreate ? { scale: 0.98 } : {}}
            className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <><CheckCircle className="w-5 h-5 animate-pulse" /> Creating...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Create Connector</>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Connectors;
