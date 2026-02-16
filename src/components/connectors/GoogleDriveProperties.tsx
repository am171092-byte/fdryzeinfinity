import { Shield } from "lucide-react";
import { FilterMode } from "./types";
import FileTypeFilter from "./FileTypeFilter";

interface GoogleDrivePropertiesProps {
  sourceUrl: string;
  onSourceUrlChange: (url: string) => void;
  driveContentType: "folder" | "shared-drive" | null;
  onDriveContentTypeChange: (type: "folder" | "shared-drive" | null) => void;
  fileTypeFilterMode: FilterMode | null;
  onFileTypeFilterModeChange: (mode: FilterMode | null) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
}

const GoogleDriveProperties = ({
  sourceUrl, onSourceUrlChange,
  driveContentType, onDriveContentTypeChange,
  fileTypeFilterMode, onFileTypeFilterModeChange,
  selectedFileTypes, onSelectedFileTypesChange,
}: GoogleDrivePropertiesProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Source URL <span className="text-destructive">*</span></label>
        <input
          type="url"
          value={sourceUrl}
          onChange={(e) => onSourceUrlChange(e.target.value)}
          placeholder="https://drive.google.com/drive/folders/..."
          className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        <p className="text-xs text-muted-foreground">Paste the Google Drive folder or shared drive link.</p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Content Type (Optional)</label>
        <div className="grid grid-cols-2 gap-3">
          {([
            { id: "folder" as const, label: "Folder" },
            { id: "shared-drive" as const, label: "Shared Drive" },
          ]).map((ct) => (
            <button
              key={ct.id}
              type="button"
              onClick={() => onDriveContentTypeChange(driveContentType === ct.id ? null : ct.id)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all text-center ${
                driveContentType === ct.id
                  ? "border-primary bg-primary-subtle text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </div>

      <FileTypeFilter
        mode={fileTypeFilterMode}
        onModeChange={onFileTypeFilterModeChange}
        selected={selectedFileTypes}
        onSelectedChange={onSelectedFileTypesChange}
      />

      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
        <Shield className="w-4 h-4 shrink-0" />
        OAuth pre-configured by admin.
      </div>
    </div>
  );
};

export default GoogleDriveProperties;
