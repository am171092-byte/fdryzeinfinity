import { Shield } from "lucide-react";
import { FilterMode } from "./types";
import FileTypeFilter from "./FileTypeFilter";

interface UploadPropertiesProps {
  sourceUrl: string;
  onSourceUrlChange: (url: string) => void;
  collectionName: string;
  onCollectionNameChange: (name: string) => void;
  fileTypeFilterMode: FilterMode | null;
  onFileTypeFilterModeChange: (mode: FilterMode | null) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
}

const UploadProperties = ({
  sourceUrl, onSourceUrlChange,
  collectionName, onCollectionNameChange,
  fileTypeFilterMode, onFileTypeFilterModeChange,
  selectedFileTypes, onSelectedFileTypesChange,
}: UploadPropertiesProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Source URL <span className="text-destructive">*</span></label>
        <input
          type="text"
          value={sourceUrl}
          onChange={(e) => onSourceUrlChange(e.target.value)}
          placeholder="uploads://team-collection"
          className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        <p className="text-xs text-muted-foreground">Enter a collection URL identifier for this upload connector.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Collection Name (Optional)</label>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => onCollectionNameChange(e.target.value)}
          placeholder="e.g. Corporate Documents"
          className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      <FileTypeFilter
        mode={fileTypeFilterMode}
        onModeChange={onFileTypeFilterModeChange}
        selected={selectedFileTypes}
        onSelectedChange={onSelectedFileTypesChange}
      />

      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
        <Shield className="w-4 h-4 shrink-0" />
        Credentials are pre-configured by your administrator.
      </div>
    </div>
  );
};

export default UploadProperties;
