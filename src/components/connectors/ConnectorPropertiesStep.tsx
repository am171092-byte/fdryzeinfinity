import { ArrowLeft, ArrowRight, Cloud, Upload, HardDrive, Database } from "lucide-react";
import { ConnectorTypeId, ContentType, FilterMode } from "./types";
import SharePointProperties from "./SharePointProperties";
import UploadProperties, { UploadedFile } from "./UploadProperties";
import GoogleDriveProperties from "./GoogleDriveProperties";
import S3Properties from "./S3Properties";

const typeInfo: Record<ConnectorTypeId, { label: string; Icon: React.ElementType }> = {
  sharepoint: { label: "SharePoint", Icon: Cloud },
  upload: { label: "Upload", Icon: Upload },
  "google-drive": { label: "Google Drive", Icon: HardDrive },
  s3: { label: "Amazon S3", Icon: Database },
};

interface ConnectorPropertiesStepProps {
  connectorType: ConnectorTypeId;
  connectorName: string;
  onConnectorNameChange: (name: string) => void;
  sourceUrl: string;
  onSourceUrlChange: (url: string) => void;
  // SharePoint
  contentType: ContentType;
  onContentTypeChange: (ct: ContentType) => void;
  filterMode: FilterMode | undefined;
  onFilterModeChange: (mode: FilterMode) => void;
  selectedItems: string[];
  onSelectedItemsChange: (items: string[]) => void;
  // File types (shared)
  fileTypeFilterMode: FilterMode | null;
  onFileTypeFilterModeChange: (mode: FilterMode | null) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
  // Upload
  collectionName: string;
  onCollectionNameChange: (name: string) => void;
  uploadedFiles: UploadedFile[];
  onUploadedFilesChange: (files: UploadedFile[]) => void;
  // Google Drive
  driveContentType: "folder" | "shared-drive" | null;
  onDriveContentTypeChange: (type: "folder" | "shared-drive" | null) => void;
  // S3
  region: string;
  onRegionChange: (region: string) => void;
  prefix: string;
  onPrefixChange: (prefix: string) => void;
  // Navigation
  onContinue: () => void;
  onBack: () => void;
}

const ConnectorPropertiesStep = (props: ConnectorPropertiesStepProps) => {
  const { connectorType, connectorName, sourceUrl, onContinue, onBack, uploadedFiles } = props;
  const { label, Icon } = typeInfo[connectorType];

  const isUpload = connectorType === "upload";
  const hasName = connectorName.trim().length > 0;
  const hasSource = isUpload ? uploadedFiles.length > 0 : sourceUrl.trim().length > 0;
  const canContinue = hasName && hasSource;
  const validationMessage = !hasName
    ? "Connector name is required."
    : isUpload
    ? "Upload at least one file to create this connector."
    : "Source URL is required.";

  return (
    <div className="w-full max-w-[700px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-section-title">{label} — Configure Properties</h2>
          <p className="text-xs text-muted-foreground">
            {isUpload ? "Upload documents to build your knowledge sources." : "Only Source URL is required. Everything else is optional."}
          </p>
        </div>
      </div>

      <div className="card-elevated p-6 mb-6 space-y-6">
        {/* Connector Name — mandatory for all types */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Connector Name <span className="text-destructive">*</span></label>
          <input
            type="text"
            value={connectorName}
            onChange={(e) => props.onConnectorNameChange(e.target.value)}
            placeholder="e.g. SharePoint – Policies"
            maxLength={100}
            className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <p className="text-xs text-muted-foreground">This name will appear in Nexus when linking to assistants.</p>
        </div>

        {connectorType === "sharepoint" && (
          <SharePointProperties
            sourceUrl={props.sourceUrl} onSourceUrlChange={props.onSourceUrlChange}
            contentType={props.contentType} onContentTypeChange={props.onContentTypeChange}
            filterMode={props.filterMode} onFilterModeChange={props.onFilterModeChange}
            selectedItems={props.selectedItems} onSelectedItemsChange={props.onSelectedItemsChange}
            fileTypeFilterMode={props.fileTypeFilterMode} onFileTypeFilterModeChange={props.onFileTypeFilterModeChange}
            selectedFileTypes={props.selectedFileTypes} onSelectedFileTypesChange={props.onSelectedFileTypesChange}
          />
        )}
        {connectorType === "upload" && (
          <UploadProperties
            uploadedFiles={props.uploadedFiles}
            onUploadedFilesChange={props.onUploadedFilesChange}
            fileTypeFilterMode={props.fileTypeFilterMode} onFileTypeFilterModeChange={props.onFileTypeFilterModeChange}
            selectedFileTypes={props.selectedFileTypes} onSelectedFileTypesChange={props.onSelectedFileTypesChange}
          />
        )}
        {connectorType === "google-drive" && (
          <GoogleDriveProperties
            sourceUrl={props.sourceUrl} onSourceUrlChange={props.onSourceUrlChange}
            driveContentType={props.driveContentType} onDriveContentTypeChange={props.onDriveContentTypeChange}
            fileTypeFilterMode={props.fileTypeFilterMode} onFileTypeFilterModeChange={props.onFileTypeFilterModeChange}
            selectedFileTypes={props.selectedFileTypes} onSelectedFileTypesChange={props.onSelectedFileTypesChange}
          />
        )}
        {connectorType === "s3" && (
          <S3Properties
            sourceUrl={props.sourceUrl} onSourceUrlChange={props.onSourceUrlChange}
            region={props.region} onRegionChange={props.onRegionChange}
            prefix={props.prefix} onPrefixChange={props.onPrefixChange}
            fileTypeFilterMode={props.fileTypeFilterMode} onFileTypeFilterModeChange={props.onFileTypeFilterModeChange}
            selectedFileTypes={props.selectedFileTypes} onSelectedFileTypesChange={props.onSelectedFileTypesChange}
          />
        )}
      </div>

      {!canContinue && (
        <div className="flex items-center gap-2 text-xs text-destructive mb-4">
          {validationMessage}
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={onBack} className="h-10 px-5 bg-secondary hover:bg-muted text-foreground font-medium rounded-xl flex items-center gap-2 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl flex items-center gap-2 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConnectorPropertiesStep;
