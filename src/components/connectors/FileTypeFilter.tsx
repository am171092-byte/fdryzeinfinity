import { FILE_TYPES } from "./types";
import { Checkbox } from "@/components/ui/checkbox";

interface FileTypeFilterProps {
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
}

const FileTypeFilter = ({ selected, onSelectedChange }: FileTypeFilterProps) => {
  const toggleFileType = (id: string) => {
    onSelectedChange(
      selected.includes(id) ? selected.filter((t) => t !== id) : [...selected, id]
    );
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">File Types (Optional)</label>
      <p className="text-xs text-muted-foreground">
        Select file types to ingest. If none are selected, ingest all supported types.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {FILE_TYPES.map((ft) => (
          <label
            key={ft.id}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground cursor-pointer hover:border-primary/40 transition-all"
          >
            <Checkbox
              checked={selected.includes(ft.id)}
              onCheckedChange={() => toggleFileType(ft.id)}
            />
            <span>{ft.icon}</span>
            {ft.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FileTypeFilter;
