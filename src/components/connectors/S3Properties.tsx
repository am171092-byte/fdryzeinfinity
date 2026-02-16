import { Shield } from "lucide-react";
import { FilterMode } from "./types";
import FileTypeFilter from "./FileTypeFilter";

const REGIONS = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "eu-west-1", "eu-west-2", "eu-central-1",
  "ap-southeast-1", "ap-northeast-1",
];

interface S3PropertiesProps {
  sourceUrl: string;
  onSourceUrlChange: (url: string) => void;
  region: string;
  onRegionChange: (region: string) => void;
  prefix: string;
  onPrefixChange: (prefix: string) => void;
  fileTypeFilterMode: FilterMode | null;
  onFileTypeFilterModeChange: (mode: FilterMode | null) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
}

const S3Properties = ({
  sourceUrl, onSourceUrlChange,
  region, onRegionChange,
  prefix, onPrefixChange,
  fileTypeFilterMode, onFileTypeFilterModeChange,
  selectedFileTypes, onSelectedFileTypesChange,
}: S3PropertiesProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Source URL <span className="text-destructive">*</span></label>
        <input
          type="text"
          value={sourceUrl}
          onChange={(e) => onSourceUrlChange(e.target.value)}
          placeholder="s3://company-knowledge/policies/"
          className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
        <p className="text-xs text-muted-foreground">Enter the S3 bucket URI (e.g. s3://bucket-name/path/).</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Region (Optional)</label>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          >
            <option value="">Select region</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Prefix Filter (Optional)</label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            placeholder="documents/"
            className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
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
        IAM role configured by admin.
      </div>
    </div>
  );
};

export default S3Properties;
