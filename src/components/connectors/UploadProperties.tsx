import { useState, useRef } from "react";
import { Shield, Upload, FileText, File, X, CheckCircle, Loader2 } from "lucide-react";
import { FilterMode } from "./types";
import FileTypeFilter from "./FileTypeFilter";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploaded" | "indexing" | "complete" | "failed";
}

interface UploadPropertiesProps {
  uploadedFiles: UploadedFile[];
  onUploadedFilesChange: (files: UploadedFile[]) => void;
  fileTypeFilterMode: FilterMode | null;
  onFileTypeFilterModeChange: (mode: FilterMode | null) => void;
  selectedFileTypes: string[];
  onSelectedFileTypesChange: (types: string[]) => void;
}

const fileIcon = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["pdf"].includes(ext || "")) return "📄";
  if (["doc", "docx"].includes(ext || "")) return "📝";
  if (["ppt", "pptx"].includes(ext || "")) return "📊";
  if (["xls", "xlsx"].includes(ext || "")) return "📈";
  if (["csv"].includes(ext || "")) return "📋";
  if (["txt"].includes(ext || "")) return "📃";
  if (["html"].includes(ext || "")) return "🌐";
  return "📎";
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const statusPill = (status: UploadedFile["status"]) => {
  const styles: Record<string, string> = {
    uploaded: "bg-blue-500/10 text-blue-400",
    indexing: "bg-yellow-500/10 text-yellow-400",
    complete: "bg-emerald-500/10 text-emerald-400",
    failed: "bg-red-500/10 text-red-400",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${styles[status]}`}>
      {status === "uploaded" && <CheckCircle className="w-3 h-3 inline mr-1" />}
      {status === "indexing" && <Loader2 className="w-3 h-3 inline mr-1 animate-spin" />}
      {status}
    </span>
  );
};

const UploadProperties = ({
  uploadedFiles, onUploadedFilesChange,
  fileTypeFilterMode, onFileTypeFilterModeChange,
  selectedFileTypes, onSelectedFileTypesChange,
}: UploadPropertiesProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploaded" as const,
    }));
    onUploadedFilesChange([...uploadedFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    onUploadedFilesChange(uploadedFiles.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary-subtle flex items-center justify-center">
            <Upload className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isDragOver ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or <span className="text-primary font-medium">browse files</span> to upload
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground">Upload documents to build your knowledge sources.</p>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Uploaded Files ({uploadedFiles.length})</label>
          <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
            {uploadedFiles.map((f) => (
              <div key={f.id} className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-lg group">
                <span className="text-base shrink-0">{fileIcon(f.name)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                  <p className="text-[11px] text-muted-foreground">{formatSize(f.size)}</p>
                </div>
                {statusPill(f.status)}
                <button
                  onClick={() => removeFile(f.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
