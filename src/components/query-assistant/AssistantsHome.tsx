import { motion } from "framer-motion";
import { Plus, Sparkles, Database, Clock, MoreHorizontal, Users } from "lucide-react";

interface Assistant {
  id: string;
  name: string;
  status: "draft" | "published";
  knowledgeSources: number;
  tone: "formal" | "neutral" | "friendly";
  assignedUsers: number;
  assignedGroups: number;
  lastUpdated: string;
}

interface AssistantsHomeProps {
  onCreateNew: () => void;
  onSelectAssistant: (id: string, status: "draft" | "published") => void;
}

const assistants: Assistant[] = [
  { id: "1", name: "Policy Inquiry Assistant", status: "published", knowledgeSources: 4, tone: "formal", assignedUsers: 18, assignedGroups: 2, lastUpdated: "2 hours ago" },
  { id: "2", name: "Claims Support Bot", status: "published", knowledgeSources: 3, tone: "friendly", assignedUsers: 24, assignedGroups: 3, lastUpdated: "1 day ago" },
  { id: "3", name: "Risk Analysis Helper", status: "draft", knowledgeSources: 2, tone: "neutral", assignedUsers: 0, assignedGroups: 0, lastUpdated: "3 days ago" },
  { id: "4", name: "Compliance Checker", status: "published", knowledgeSources: 5, tone: "formal", assignedUsers: 12, assignedGroups: 1, lastUpdated: "1 week ago" },
];

const AssistantsHome = ({ onCreateNew, onSelectAssistant }: AssistantsHomeProps) => {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-page-title mb-2">FDRYZE Nexus</h1>
          <p className="text-muted-foreground">AI assistants configured for your teams</p>
        </div>
        <motion.button
          onClick={onCreateNew}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl flex items-center gap-2 shadow-lg shadow-primary/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create New Assistant
        </motion.button>
      </motion.div>

      {assistants.length > 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assistants.map((assistant, index) => (
            <motion.div
              key={assistant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => onSelectAssistant(assistant.id, assistant.status)}
              className="card-elevated p-6 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`status-pill ${assistant.status === "published" ? "status-active" : "bg-warning/10 text-warning"}`}>
                    {assistant.status === "published" ? "Active" : "Draft"}
                  </span>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {assistant.name}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
                  <Database className="w-3 h-3" />
                  {assistant.knowledgeSources} sources
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {assistant.assignedUsers} users, {assistant.assignedGroups} groups
                </div>
                <div className="px-2.5 py-1 bg-primary-subtle rounded-lg text-xs text-primary font-medium capitalize">
                  {assistant.tone}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                <Clock className="w-3 h-3" />
                Updated {assistant.lastUpdated}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-float p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-section-title mb-2">No assistants yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create your first assistant to answer business questions using your connected knowledge sources.
          </p>
          <motion.button onClick={onCreateNew} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-11 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl inline-flex items-center gap-2 shadow-lg shadow-primary/25 transition-all">
            <Plus className="w-5 h-5" />
            Create New Assistant
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default AssistantsHome;
