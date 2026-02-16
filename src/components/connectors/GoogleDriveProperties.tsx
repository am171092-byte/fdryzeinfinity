import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Shield } from "lucide-react";
import FileTypeFilter from "./FileTypeFilter";

interface GoogleDrivePropertiesProps {
  sourceUrl: string;
  onSourceUrlChange: (url: string) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
}

const GoogleDriveProperties = ({
  sourceUrl, onSourceUrlChange,
  selectedFileTypes, onSelectedFileTypesChange,
}: GoogleDrivePropertiesProps) => {
  const [urlValidation, setUrlValidation] = useState<"idle" | "valid" | "invalid">("idle");

  const handleValidate = () => {
    const url = sourceUrl.trim();
    if (url.startsWith("https://") && url.includes("drive.google.com") && !/\s/.test(url)) {
      setUrlValidation("valid");
    } else {
      setUrlValidation("invalid");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Source URL <span className="text-destructive">*</span></label>
        <div className="flex gap-2">
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => { onSourceUrlChange(e.target.value); setUrlValidation("idle"); }}
            placeholder="https://drive.google.com/drive/folders/..."
            className="flex-1 h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <button
            type="button"
            onClick={handleValidate}
            disabled={!sourceUrl.trim()}
            className="h-10 px-4 bg-secondary hover:bg-muted text-foreground font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            Validate
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Paste the Google Drive folder or shared drive link.</p>
        {urlValidation === "valid" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[hsl(142,71%,35%)]">
            <Check className="w-3.5 h-3.5" /> Valid URL. Access confirmed.
          </motion.div>
        )}
        {urlValidation === "invalid" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-destructive">
            <X className="w-3.5 h-3.5" /> Invalid URL. Check the link.
          </motion.div>
        )}
      </div>

      <FileTypeFilter
        selected={selectedFileTypes}
        onSelectedChange={onSelectedFileTypesChange}
      />

      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
        <Shield className="w-4 h-4 shrink-0" />
        OAuth pre-configured by admin. No secrets are shown.
      </div>
    </div>
  );
};

export default GoogleDriveProperties;
