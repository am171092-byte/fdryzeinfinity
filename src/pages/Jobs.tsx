import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, XCircle, CheckCircle, Clock, Loader2, AlertCircle, RotateCcw } from "lucide-react";

type JobStatus = "pending" | "running" | "completed" | "failed";

interface Job {
  id: string;
  type: string;
  relatedSource: string;
  status: JobStatus;
  progress: number;
  startedAt: string;
  completedAt: string | null;
}

const initialJobs: Job[] = [
  { id: "JOB-001", type: "Indexing", relatedSource: "SharePoint - Policies", status: "completed", progress: 100, startedAt: "2025-02-12 09:15", completedAt: "2025-02-12 09:32" },
  { id: "JOB-002", type: "Syncing", relatedSource: "AWS S3 - Reports", status: "running", progress: 68, startedAt: "2025-02-12 10:00", completedAt: null },
  { id: "JOB-003", type: "Indexing", relatedSource: "PostgreSQL - Analytics", status: "pending", progress: 0, startedAt: "2025-02-12 10:15", completedAt: null },
  { id: "JOB-004", type: "Validation", relatedSource: "Uploaded Documents", status: "completed", progress: 100, startedAt: "2025-02-12 08:00", completedAt: "2025-02-12 08:05" },
  { id: "JOB-005", type: "Reindexing", relatedSource: "Training Materials", status: "failed", progress: 42, startedAt: "2025-02-12 07:30", completedAt: "2025-02-12 07:45" },
  { id: "JOB-006", type: "Syncing", relatedSource: "SharePoint - Policies", status: "completed", progress: 100, startedAt: "2025-02-11 14:00", completedAt: "2025-02-11 14:18" },
];

const statusConfig: Record<JobStatus, { icon: React.ElementType; label: string; className: string }> = {
  pending: { icon: Clock, label: "Pending", className: "bg-[hsl(32,95%,95%)] text-[hsl(32,95%,35%)]" },
  running: { icon: Loader2, label: "Running", className: "bg-primary-subtle text-primary" },
  completed: { icon: CheckCircle, label: "Completed", className: "bg-[hsl(142,71%,95%)] text-[hsl(142,71%,35%)]" },
  failed: { icon: XCircle, label: "Failed", className: "bg-[hsl(0,72%,95%)] text-[hsl(0,72%,45%)]" },
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const handleRetry = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: "pending" as JobStatus, progress: 0, completedAt: null } : j
      )
    );
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-page-title mb-2">Jobs</h1>
          <p className="text-muted-foreground">Background processing jobs for indexing, syncing, and validation</p>
        </div>
        <button className="h-10 px-4 bg-secondary hover:bg-muted text-foreground font-medium rounded-lg flex items-center gap-2 text-sm transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-elevated overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-4 text-table-header">Job ID</th>
              <th className="text-left px-6 py-4 text-table-header">Type</th>
              <th className="text-left px-6 py-4 text-table-header">Related Source</th>
              <th className="text-left px-6 py-4 text-table-header">Status</th>
              <th className="text-left px-6 py-4 text-table-header">Progress</th>
              <th className="text-left px-6 py-4 text-table-header">Started At</th>
              <th className="text-left px-6 py-4 text-table-header">Completed At</th>
              <th className="text-left px-6 py-4 text-table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const statusInfo = statusConfig[job.status];
              const StatusIcon = statusInfo.icon;
              return (
                <tr key={job.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-foreground">{job.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{job.type}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{job.relatedSource}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                      <StatusIcon className={`w-3 h-3 ${job.status === "running" ? "animate-spin" : ""}`} />
                      {statusInfo.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            job.status === "failed" ? "bg-destructive" : job.status === "completed" ? "bg-success" : "bg-primary"
                          }`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{job.startedAt}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{job.completedAt || "—"}</td>
                  <td className="px-6 py-4">
                    {job.status === "failed" && (
                      <button
                        onClick={() => handleRetry(job.id)}
                        className="h-8 px-3 bg-secondary hover:bg-muted text-foreground rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Retry
                      </button>
                    )}
                    {job.status === "running" && (
                      <button className="h-8 px-3 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <XCircle className="w-3 h-3" />
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Jobs;
