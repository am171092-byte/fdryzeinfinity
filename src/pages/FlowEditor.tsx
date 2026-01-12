import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Pencil,
  X,
  FileText,
  Brain,
  Calculator,
  CheckCircle,
  Sparkles,
  Shield,
  Search,
} from "lucide-react";

interface FlowNode {
  id: string;
  type: string;
  label: string;
  description: string;
  icon: React.ElementType;
  x: number;
  y: number;
}

const initialNodes: FlowNode[] = [
  {
    id: "1",
    type: "intake",
    label: "Application Intake",
    description: "Receives and validates incoming applications",
    icon: FileText,
    x: 100,
    y: 100,
  },
  {
    id: "2",
    type: "agent",
    label: "Document Review Agent",
    description: "AI agent for document analysis",
    icon: Search,
    x: 100,
    y: 230,
  },
  {
    id: "3",
    type: "agent",
    label: "Risk Classification Agent",
    description: "Classifies risk level based on criteria",
    icon: Shield,
    x: 100,
    y: 360,
  },
  {
    id: "4",
    type: "agent",
    label: "Premium Calculation Agent",
    description: "Calculates premium based on risk factors",
    icon: Calculator,
    x: 100,
    y: 490,
  },
  {
    id: "5",
    type: "outcome",
    label: "Approval Outcome",
    description: "Final decision and policy generation",
    icon: CheckCircle,
    x: 100,
    y: 620,
  },
];

const agentCatalogue = [
  {
    id: "a1",
    name: "Fraud Detection Agent",
    description: "Identifies potential fraud patterns in applications",
    capability: "Risk Analysis",
    icon: Shield,
  },
  {
    id: "a2",
    name: "Claims History Agent",
    description: "Analyzes historical claims data for risk assessment",
    capability: "Data Processing",
    icon: Brain,
  },
  {
    id: "a3",
    name: "Compliance Check Agent",
    description: "Ensures regulatory compliance across jurisdictions",
    capability: "Compliance",
    icon: CheckCircle,
  },
  {
    id: "a4",
    name: "Market Rate Agent",
    description: "Compares pricing against current market rates",
    capability: "Pricing",
    icon: Calculator,
  },
  {
    id: "a5",
    name: "Medical Underwriting Agent",
    description: "Specialized agent for health and life insurance evaluation",
    capability: "Healthcare",
    icon: Sparkles,
  },
];

const FlowEditor = () => {
  const { flowId } = useParams();
  const navigate = useNavigate();
  const [nodes] = useState<FlowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [showAgentPanel, setShowAgentPanel] = useState(false);

  const flowName = flowId === "new" 
    ? "New Workflow" 
    : "Commercial Property Assessment";

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 px-6 bg-card border-b border-border flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/flows")}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{flowName}</h1>
            <p className="text-xs text-muted-foreground">Flow Editor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCatalogue(!showCatalogue)}
            className="h-9 px-4 bg-muted hover:bg-border text-foreground font-medium rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Agent
          </button>
          <button className="h-9 px-4 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">
            Save Flow
          </button>
        </div>
      </motion.div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-canvas-workspace canvas-grid" />

        {/* Nodes */}
        <div className="relative p-8">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNode?.id === node.id;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                style={{ position: "absolute", left: node.x, top: node.y }}
                onClick={() => {
                  setSelectedNode(node);
                  if (node.type === "agent") {
                    setShowAgentPanel(true);
                  }
                }}
                className={`flow-node ${isSelected ? "selected" : ""} group`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-subtle rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground mb-1">
                      {node.label}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
                <button className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-3 h-3 text-muted-foreground" />
                </button>
                {index < nodes.length - 1 && (
                  <div className="absolute left-1/2 -bottom-[42px] w-px h-10 bg-border -translate-x-1/2" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Agent Catalogue Panel */}
        <AnimatePresence>
          {showCatalogue && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[380px] bg-card shadow-float border-l border-border overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-section-title">Agent Catalogue</h2>
                  <button
                    onClick={() => setShowCatalogue(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3">
                  {agentCatalogue.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <div key={agent.id} className="agent-card">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-foreground mb-1">
                              {agent.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {agent.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-primary-subtle text-primary px-2 py-1 rounded">
                            {agent.capability}
                          </span>
                          <button className="text-xs text-primary font-medium hover:text-primary-hover transition-colors">
                            Add to Flow
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Agent Panel */}
        <AnimatePresence>
          {showAgentPanel && selectedNode?.type === "agent" && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[380px] bg-card shadow-float border-l border-border overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-section-title">Edit Agent</h2>
                  <button
                    onClick={() => setShowAgentPanel(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Agent Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedNode.label}
                      className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>

                  {/* Model Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Model
                    </label>
                    <select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all">
                      <option>Balanced (Best for most tasks)</option>
                      <option>Precise (Best for complex analysis)</option>
                      <option>Fast (Best for high-volume tasks)</option>
                    </select>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Instructions
                    </label>
                    <textarea
                      rows={5}
                      defaultValue="Review all submitted documents for completeness and accuracy. Flag any missing information or inconsistencies for manual review."
                      className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe what this agent should do in plain language
                    </p>
                  </div>

                  {/* Data Sources */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Connected Data Sources
                    </label>
                    <div className="space-y-2">
                      {["Policy Database", "Claims History", "Risk Scores API", "Document Store"].map(
                        (source) => (
                          <label
                            key={source}
                            className="flex items-center gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-border transition-colors"
                          >
                            <input
                              type="checkbox"
                              defaultChecked={source !== "Risk Scores API"}
                              className="w-4 h-4 rounded border-input accent-primary"
                            />
                            <span className="text-sm text-foreground">{source}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Save Button */}
                  <button className="w-full h-10 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlowEditor;
