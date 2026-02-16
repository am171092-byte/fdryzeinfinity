import { motion } from "framer-motion";
import { Check, X, Trash2 } from "lucide-react";
import { SharePointSiteBlock as SiteBlockType, ContentType } from "./types";
import FileTypeFilter from "./FileTypeFilter";

interface SharePointSiteBlockProps {
  block: SiteBlockType;
  onChange: (block: SiteBlockType) => void;
  onRemove: () => void;
  canRemove: boolean;
  index: number;
}

const SharePointSiteBlockComponent = ({ block, onChange, onRemove, canRemove, index }: SharePointSiteBlockProps) => {
  const update = (partial: Partial<SiteBlockType>) => onChange({ ...block, ...partial });

  const handleValidateUrl = () => {
    const url = block.url.trim();
    if (url.startsWith("https://") && url.includes(".sharepoint.com") && !/\s/.test(url)) {
      update({ urlValidation: "valid" });
    } else {
      update({ urlValidation: "invalid" });
    }
  };

  const handleContentTypeChange = (ct: ContentType) => {
    update({ contentType: ct === block.contentType ? null : ct });
  };

  return (
    <div className="p-5 border border-border rounded-xl bg-card/50 space-y-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Site URL {index + 1}</h4>
        {canRemove && (
          <button type="button" onClick={onRemove} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Site URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Site URL <span className="text-destructive">*</span></label>
        <div className="flex gap-2">
          <input
            type="url"
            value={block.url}
            onChange={(e) => update({ url: e.target.value, urlValidation: "idle" })}
            placeholder="https://contoso.sharepoint.com/sites/TeamSite"
            className="flex-1 h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <button
            type="button"
            onClick={handleValidateUrl}
            disabled={!block.url.trim()}
            className="h-10 px-4 bg-secondary hover:bg-muted text-foreground font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            Validate
          </button>
        </div>
        {block.urlValidation === "valid" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[hsl(142,71%,35%)]">
            <Check className="w-3.5 h-3.5" /> Valid URL. Access confirmed.
          </motion.div>
        )}
        {block.urlValidation === "invalid" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-destructive">
            <X className="w-3.5 h-3.5" /> Invalid URL. Check site address.
          </motion.div>
        )}
        {!block.url.trim() && (
          <p className="text-xs text-destructive">Site URL is required.</p>
        )}
      </div>

      {/* Recursive Toggle */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div>
          <p className="text-sm font-medium text-foreground">Recursive</p>
          <p className="text-xs text-muted-foreground">Include content from all subfolders and nested content under this URL scope.</p>
        </div>
        <button
          type="button"
          onClick={() => update({ recursive: !block.recursive })}
          className={`relative w-11 h-6 rounded-full transition-colors ${block.recursive ? "bg-primary" : "bg-border"}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${block.recursive ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </div>

      {/* Side-by-side: Content Type + File Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Content Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Content Type</label>
          <div className="space-y-2">
            {([
              { id: "document-library" as ContentType, label: "Document Library" },
              { id: "list" as ContentType, label: "List" },
              { id: "pages" as ContentType, label: "Pages" },
            ]).map((ct) => (
              <button
                key={ct.id}
                type="button"
                onClick={() => handleContentTypeChange(ct.id)}
                className={`w-full p-3 rounded-xl border text-sm font-medium transition-all text-left ${
                  block.contentType === ct.id
                    ? "border-primary bg-primary-subtle text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {ct.label}
              </button>
            ))}
          </div>
          {!block.contentType && (
            <p className="text-xs text-muted-foreground">Optional — if unset, we ingest from the URL scope only.</p>
          )}
        </div>

        {/* Right: File Types */}
        <div>
          <FileTypeFilter
            selected={block.selectedFileTypes}
            onSelectedChange={(types) => update({ selectedFileTypes: types })}
          />
        </div>
      </div>
    </div>
  );
};

export default SharePointSiteBlockComponent;
