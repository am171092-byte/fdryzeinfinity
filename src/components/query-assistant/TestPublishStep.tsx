import { motion } from "framer-motion";
import { Sparkles, ChevronRight, MessageSquare, Database, Users, Palette } from "lucide-react";

interface TestPublishStepProps {
  themeColor: string;
  assistantName: string;
  onBack: () => void;
  onPublish: () => void;
  isPublished: boolean;
  isPreviewOnly?: boolean;
}

const TestPublishStep = ({
  themeColor,
  assistantName,
  onBack,
  onPublish,
}: TestPublishStepProps) => {
  return (
    <div className="w-full max-w-[960px]">
      <div className="card-float p-8 mb-6">
        <h2 className="text-section-title mb-2">Preview Your Assistant</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Review how your assistant will appear to end users.
        </p>

        {/* Visual Preview - Chat Widget Mockup */}
        <div className="max-w-sm mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-float border border-border">
            {/* Widget Header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ backgroundColor: themeColor }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {assistantName.charAt(0) || "A"}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{assistantName || "Assistant"}</p>
                <p className="text-white/70 text-xs">Online</p>
              </div>
            </div>

            {/* Chat Body */}
            <div className="bg-card p-5 space-y-4 min-h-[280px]">
              {/* Welcome message */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-medium"
                  style={{ backgroundColor: themeColor }}
                >
                  {assistantName.charAt(0) || "A"}
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Hello! I'm <span className="font-medium">{assistantName || "your assistant"}</span>. How can I help you today?
                  </p>
                </div>
              </div>

              {/* Sample user message */}
              <div className="flex justify-end">
                <div
                  className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]"
                  style={{ backgroundColor: `${themeColor}15` }}
                >
                  <p className="text-sm text-foreground">Can you summarize the latest policy updates?</p>
                </div>
              </div>

              {/* Sample assistant reply */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-medium"
                  style={{ backgroundColor: themeColor }}
                >
                  {assistantName.charAt(0) || "A"}
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Based on the connected knowledge sources, here are the key policy updates from Q4…
                  </p>
                </div>
              </div>
            </div>

            {/* Input Bar (static) */}
            <div className="bg-card border-t border-border px-4 py-3">
              <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Ask a question…</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card-elevated p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${themeColor}15` }}>
            <Palette className="w-5 h-5" style={{ color: themeColor }} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Theme</p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: themeColor }} />
              <span className="text-sm font-medium text-foreground">{themeColor}</span>
            </div>
          </div>
        </div>
        <div className="card-elevated p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${themeColor}15` }}>
            <Database className="w-5 h-5" style={{ color: themeColor }} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Knowledge</p>
            <span className="text-sm font-medium text-foreground">Sources connected</span>
          </div>
        </div>
        <div className="card-elevated p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${themeColor}15` }}>
            <Users className="w-5 h-5" style={{ color: themeColor }} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Branding</p>
            <span className="text-sm font-medium text-foreground">{assistantName || "Unnamed"}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="h-11 px-5 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-muted transition-colors">
          Back to Assign
        </button>
        <motion.button
          onClick={onPublish}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-12 px-8 rounded-xl font-medium text-sm flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25 transition-all"
        >
          Continue to Publish
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default TestPublishStep;
