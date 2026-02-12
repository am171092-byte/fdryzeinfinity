import { motion } from "framer-motion";
import { Sparkles, CheckCircle, AlertCircle, Users, Database, Palette, Briefcase, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PublishStepProps {
  assistantName: string;
  themeColor: string;
  tone: string;
  selectedSourceCount: number;
  assignedCount: number;
  onBack: () => void;
  onPublish: () => void;
  isPublished: boolean;
}

// Simulated job status for selected knowledge sources
const pendingJobs = [
  { id: "JOB-002", source: "AWS S3 - Reports", status: "running", progress: 68 },
  { id: "JOB-003", source: "PostgreSQL - Analytics", status: "pending", progress: 0 },
];

const PublishStep = ({
  assistantName,
  themeColor,
  tone,
  selectedSourceCount,
  assignedCount,
  onBack,
  onPublish,
  isPublished,
}: PublishStepProps) => {
  const navigate = useNavigate();
  const hasIncompleteJobs = pendingJobs.length > 0;
  const canPublish = assignedCount > 0 && selectedSourceCount > 0 && assistantName.trim().length > 0 && !hasIncompleteJobs;

  return (
    <div className="w-full max-w-[700px]">
      <div className="card-float p-8">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${themeColor}15` }}
          >
            <Sparkles className="w-8 h-8" style={{ color: themeColor }} />
          </div>
          <h2 className="text-section-title mb-2">Ready to Publish?</h2>
          <p className="text-muted-foreground text-sm">
            Review the summary below and publish your assistant.
          </p>
        </div>

        {/* Summary */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Name</span>
            </div>
            <span className="text-sm text-foreground">{assistantName || "Unnamed"}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Knowledge Sources</span>
            </div>
            <span className="text-sm text-foreground">{selectedSourceCount} selected</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Tone</span>
            </div>
            <span className="text-sm text-foreground capitalize">{tone}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Assigned</span>
            </div>
            <span className={`text-sm ${assignedCount > 0 ? "text-foreground" : "text-destructive"}`}>
              {assignedCount > 0 ? `${assignedCount} users/groups` : "None assigned"}
            </span>
          </div>
        </div>

        {/* Job Blocking Banner */}
        {hasIncompleteJobs && (
          <div className="p-4 bg-[hsl(32,95%,95%)] rounded-xl mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Briefcase className="w-5 h-5 text-[hsl(32,95%,44%)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[hsl(32,95%,30%)]">
                  Publishing is blocked until all indexing and sync jobs complete.
                </p>
                <div className="mt-2 space-y-1">
                  {pendingJobs.map((job) => (
                    <p key={job.id} className="text-xs text-[hsl(32,95%,35%)]">
                      {job.id}: {job.source} — {job.status} ({job.progress}%)
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/jobs")}
              className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1 ml-8"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Jobs
            </button>
          </div>
        )}

        {/* Validation */}
        {!canPublish && !hasIncompleteJobs && (
          <div className="flex items-start gap-3 p-4 bg-[hsl(32,95%,95%)] rounded-xl mb-6">
            <AlertCircle className="w-5 h-5 text-[hsl(32,95%,44%)] shrink-0 mt-0.5" />
            <div className="text-sm text-[hsl(32,95%,30%)]">
              {assignedCount === 0 && <p>At least one user or group must be assigned before publishing.</p>}
              {selectedSourceCount === 0 && <p>At least one knowledge source must be selected.</p>}
              {!assistantName.trim() && <p>Assistant name is required.</p>}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={onBack}
            className="h-11 px-5 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-muted transition-colors"
          >
            Back
          </button>
          <motion.button
            onClick={onPublish}
            disabled={!canPublish}
            whileHover={canPublish ? { scale: 1.02 } : {}}
            whileTap={canPublish ? { scale: 0.98 } : {}}
            className={`h-12 px-8 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              isPublished
                ? "bg-success text-success-foreground"
                : canPublish
                ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isPublished ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Published Successfully!
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Publish Assistant
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PublishStep;
