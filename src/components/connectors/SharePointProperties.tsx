import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Search, Shield } from "lucide-react";
import { ContentType, FilterMode } from "./types";
import FileTypeFilter from "./FileTypeFilter";

const LIBRARY_ITEMS = ["Shared Documents", "Policies", "Contracts", "Knowledge Base"];
const LIST_ITEMS = ["Issue Tracker", "Customer Requests", "Vendor Directory"];
const PAGE_ITEMS = ["Home.aspx", "FAQ.aspx", "SOP-Returns.aspx"];

interface SharePointPropertiesProps {
  sourceUrl: string;
  onSourceUrlChange: (url: string) => void;
  contentType: ContentType;
  onContentTypeChange: (ct: ContentType) => void;
  filterMode: FilterMode | undefined;
  onFilterModeChange: (mode: FilterMode) => void;
  selectedItems: string[];
  onSelectedItemsChange: (items: string[]) => void;
  fileTypeFilterMode: FilterMode | null;
  onFileTypeFilterModeChange: (mode: FilterMode | null) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
}

const SharePointProperties = ({
  sourceUrl, onSourceUrlChange,
  contentType, onContentTypeChange,
  filterMode, onFilterModeChange,
  selectedItems, onSelectedItemsChange,
  fileTypeFilterMode, onFileTypeFilterModeChange,
  selectedFileTypes, onSelectedFileTypesChange,
}: SharePointPropertiesProps) => {
  const [urlValidation, setUrlValidation] = useState<"idle" | "valid" | "invalid">("idle");
  const [itemSearch, setItemSearch] = useState("");

  const handleValidateUrl = () => {
    const url = sourceUrl.trim();
    if (url.startsWith("https://") && url.includes(".sharepoint.com") && !/\s/.test(url)) {
      setUrlValidation("valid");
    } else {
      setUrlValidation("invalid");
    }
  };

  const handleContentTypeChange = (ct: ContentType) => {
    onContentTypeChange(ct === contentType ? null : ct);
    onSelectedItemsChange([]);
  };

  const handleFilterModeSwitch = (mode: FilterMode) => {
    onFilterModeChange(mode);
    onSelectedItemsChange([]);
  };

  const toggleItem = (item: string) => {
    onSelectedItemsChange(
      selectedItems.includes(item) ? selectedItems.filter((i) => i !== item) : [...selectedItems, item]
    );
  };

  const items = contentType === "document-library" ? LIBRARY_ITEMS
    : contentType === "list" ? LIST_ITEMS
    : contentType === "pages" ? PAGE_ITEMS : [];

  const filteredItems = items.filter((i) => i.toLowerCase().includes(itemSearch.toLowerCase()));

  const contentTypeLabel = contentType === "document-library" ? "document libraries"
    : contentType === "list" ? "lists" : contentType === "pages" ? "pages" : "";

  return (
    <div className="space-y-6">
      {/* Source URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">SharePoint Site or Resource URL <span className="text-destructive">*</span></label>
        <div className="flex gap-2">
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => { onSourceUrlChange(e.target.value); setUrlValidation("idle"); }}
            placeholder="https://contoso.sharepoint.com/sites/Operations"
            className="flex-1 h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <button
            type="button"
            onClick={handleValidateUrl}
            disabled={!sourceUrl.trim()}
            className="h-10 px-4 bg-secondary hover:bg-muted text-foreground font-medium rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            Validate
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Paste the SharePoint site URL. We'll validate it before saving.</p>
        {urlValidation === "valid" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-[hsl(142,71%,35%)]">
            <Check className="w-3.5 h-3.5" /> Valid SharePoint URL. Access confirmed.
          </motion.div>
        )}
        {urlValidation === "invalid" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-destructive">
            <X className="w-3.5 h-3.5" /> Invalid SharePoint URL. Check the site address.
          </motion.div>
        )}
      </div>

      {/* Content Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">What do you want to ingest?</label>
        <div className="grid grid-cols-3 gap-3">
          {([
            { id: "document-library" as ContentType, label: "Document Library" },
            { id: "list" as ContentType, label: "List" },
            { id: "pages" as ContentType, label: "Pages" },
          ]).map((ct) => (
            <button
              key={ct.id}
              type="button"
              onClick={() => handleContentTypeChange(ct.id)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all text-center ${
                contentType === ct.id
                  ? "border-primary bg-primary-subtle text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {ct.label}
            </button>
          ))}
        </div>
        {!contentType && (
          <p className="text-xs text-muted-foreground">If you don't select a content type, we'll ingest from the URL scope only.</p>
        )}
      </div>

      {/* Include/Exclude Mode */}
      {contentType && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <label className="text-sm font-medium text-foreground">Filter Mode</label>
          <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
            <button
              type="button"
              onClick={() => handleFilterModeSwitch("include")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filterMode === "include" ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Include
            </button>
            <button
              type="button"
              onClick={() => handleFilterModeSwitch("exclude")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filterMode === "exclude" ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Exclude
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {filterMode === "include"
              ? "Only the selected items will be ingested."
              : "Everything will be ingested except the selected items."}
          </p>

          {/* Item Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select {contentTypeLabel} to {filterMode === "include" ? "Include" : "Exclude"}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={itemSearch}
                onChange={(e) => setItemSearch(e.target.value)}
                placeholder="Search..."
                className="w-full h-9 pl-9 pr-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleItem(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                    selectedItems.includes(item)
                      ? "bg-primary-subtle text-primary font-medium"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    selectedItems.includes(item) ? "bg-primary border-primary" : "border-input"
                  }`}>
                    {selectedItems.includes(item) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* File Type Filter */}
      <FileTypeFilter
        mode={fileTypeFilterMode}
        onModeChange={onFileTypeFilterModeChange}
        selected={selectedFileTypes}
        onSelectedChange={onSelectedFileTypesChange}
      />

      {/* Security Note */}
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
        <Shield className="w-4 h-4 shrink-0" />
        Credentials are pre-configured by your administrator.
      </div>
    </div>
  );
};

export default SharePointProperties;
