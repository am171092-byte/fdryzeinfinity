import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Search, Trash2 } from "lucide-react";
import { SharePointSiteBlock as SiteBlockType, ContentType, FilterMode } from "./types";
import FileTypeFilter from "./FileTypeFilter";

const LIBRARY_ITEMS = ["Shared Documents", "Knowledge Base", "Policies", "Contracts"];
const LIST_ITEMS = ["Requests", "Vendors", "Assets"];
const PAGE_ITEMS = ["Home.aspx", "FAQ.aspx", "SOP.aspx"];

interface SharePointSiteBlockProps {
  block: SiteBlockType;
  onChange: (block: SiteBlockType) => void;
  onRemove: () => void;
  canRemove: boolean;
  index: number;
}

const SharePointSiteBlockComponent = ({ block, onChange, onRemove, canRemove, index }: SharePointSiteBlockProps) => {
  const [itemSearch, setItemSearch] = useState("");

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
    update({
      contentType: ct === block.contentType ? null : ct,
      selectedItems: [],
    });
  };

  const handleFilterModeSwitch = (mode: FilterMode) => {
    update({ filterMode: mode, selectedItems: [] });
  };

  const toggleItem = (item: string) => {
    update({
      selectedItems: block.selectedItems.includes(item)
        ? block.selectedItems.filter((i) => i !== item)
        : [...block.selectedItems, item],
    });
  };

  const items = block.contentType === "document-library" ? LIBRARY_ITEMS
    : block.contentType === "list" ? LIST_ITEMS
    : block.contentType === "pages" ? PAGE_ITEMS : [];

  const filteredItems = items.filter((i) => i.toLowerCase().includes(itemSearch.toLowerCase()));

  const contentTypeLabel = block.contentType === "document-library" ? "document libraries"
    : block.contentType === "list" ? "lists" : block.contentType === "pages" ? "pages" : "";

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

      {/* Side-by-side: Content Type + File Type */}
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

        {/* Right: File Type Filter */}
        <div>
          <FileTypeFilter
            mode={block.fileTypeFilterMode}
            onModeChange={(mode) => update({ fileTypeFilterMode: mode, selectedFileTypes: mode ? block.selectedFileTypes : [] })}
            selected={block.selectedFileTypes}
            onSelectedChange={(types) => update({ selectedFileTypes: types })}
          />
        </div>
      </div>

      {/* Include/Exclude items — only if content type selected */}
      {block.contentType && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select Content</label>
          <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
            <button
              type="button"
              onClick={() => handleFilterModeSwitch("include")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                block.filterMode === "include" ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Include
            </button>
            <button
              type="button"
              onClick={() => handleFilterModeSwitch("exclude")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                block.filterMode === "exclude" ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Exclude
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {block.filterMode === "include"
              ? "Only the selected items will be ingested."
              : "Everything will be ingested except the selected items."}
          </p>

          {/* Item Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select {contentTypeLabel} to {block.filterMode === "include" ? "include" : "exclude"}
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
                    block.selectedItems.includes(item)
                      ? "bg-primary-subtle text-primary font-medium"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    block.selectedItems.includes(item) ? "bg-primary border-primary" : "border-input"
                  }`}>
                    {block.selectedItems.includes(item) && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SharePointSiteBlockComponent;
