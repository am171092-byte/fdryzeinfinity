import { motion } from "framer-motion";
import { FILE_TYPES, FilterMode } from "./types";

interface FileTypeFilterProps {
  mode: FilterMode | null;
  onModeChange: (mode: FilterMode | null) => void;
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
}

const FileTypeFilter = ({ mode, onModeChange, selected, onSelectedChange }: FileTypeFilterProps) => {
  const handleModeSwitch = (newMode: FilterMode) => {
    if (mode === newMode) {
      onModeChange(null);
      onSelectedChange([]);
    } else {
      onModeChange(newMode);
      onSelectedChange([]);
    }
  };

  const toggleFileType = (id: string) => {
    onSelectedChange(
      selected.includes(id) ? selected.filter((t) => t !== id) : [...selected, id]
    );
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">File Type Filter (Optional)</label>
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        <button
          type="button"
          onClick={() => handleModeSwitch("include")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === "include" ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Include file types
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch("exclude")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === "exclude" ? "bg-card text-foreground shadow" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Exclude file types
        </button>
      </div>

      {mode && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
          <p className="text-xs text-muted-foreground">
            {mode === "include"
              ? "Only the selected file types will be ingested."
              : "All file types except the selected ones will be ingested."}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FILE_TYPES.map((ft) => (
              <button
                key={ft.id}
                type="button"
                onClick={() => toggleFileType(ft.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  selected.includes(ft.id)
                    ? "border-primary bg-primary-subtle text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <span>{ft.icon}</span>
                {ft.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileTypeFilter;
