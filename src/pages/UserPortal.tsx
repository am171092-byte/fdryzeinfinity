import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Database, Clock, MessageSquare } from "lucide-react";
import LiveAssistant from "@/components/query-assistant/LiveAssistant";

interface AssignedAssistant {
  id: string;
  name: string;
  description: string;
  sources: number;
  tone: "formal" | "neutral" | "friendly";
  themeColor: string;
  lastUpdated: string;
}

const assignedAssistants: AssignedAssistant[] = [
  {
    id: "1",
    name: "Policy Inquiry Assistant",
    description: "Search and ask questions about company policies and procedures",
    sources: 4,
    tone: "formal",
    themeColor: "#6D28D9",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Claims Support Bot",
    description: "Get help with claims processing, status checks, and documentation",
    sources: 3,
    tone: "friendly",
    themeColor: "#2563EB",
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Compliance Checker",
    description: "Verify compliance requirements and regulatory guidelines",
    sources: 5,
    tone: "formal",
    themeColor: "#16A34A",
    lastUpdated: "1 week ago",
  },
];

const UserPortal = () => {
  const [selectedAssistant, setSelectedAssistant] = useState<AssignedAssistant | null>(null);

  if (selectedAssistant) {
    return (
      <LiveAssistant
        assistantName={selectedAssistant.name}
        themeColor={selectedAssistant.themeColor}
        tone={selectedAssistant.tone}
        responseLength={[50]}
        riskSensitivity={[50]}
        onBack={() => setSelectedAssistant(null)}
        onEditConfiguration={() => {}}
        onOpenIntegration={() => {}}
        isUserPortal
      />
    );
  }

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-page-title mb-2">My Assistants</h1>
        <p className="text-muted-foreground">
          AI assistants assigned to you and your groups
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {assignedAssistants.map((assistant, index) => (
          <motion.div
            key={assistant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => setSelectedAssistant(assistant)}
            className="card-elevated p-6 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${assistant.themeColor}15` }}
              >
                <Sparkles className="w-6 h-6" style={{ color: assistant.themeColor }} />
              </div>
              <span className="status-pill status-active">Active</span>
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {assistant.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {assistant.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
                <Database className="w-3 h-3" />
                {assistant.sources} sources
              </div>
              <div className="px-2.5 py-1 bg-primary-subtle rounded-lg text-xs text-primary font-medium capitalize">
                {assistant.tone}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                Updated {assistant.lastUpdated}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <MessageSquare className="w-3 h-3" />
                Open
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UserPortal;
