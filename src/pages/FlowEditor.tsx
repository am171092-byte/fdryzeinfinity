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
  AlertTriangle,
  DollarSign,
  GitBranch,
  Eye,
  Zap,
  Check,
  ChevronDown,
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

interface Agent {
  id: string;
  name: string;
  description: string;
  capability: string;
  icon: React.ElementType;
  modelIcons: string[];
}

interface AgentGroup {
  id: string;
  name: string;
  agents: Agent[];
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

const agentGroups: AgentGroup[] = [
  {
    id: "doc",
    name: "Document Intelligence",
    agents: [
      {
        id: "a1",
        name: "Document Extraction Agent",
        description: "Extracts key data from policy documents",
        capability: "OCR & NLP",
        icon: FileText,
        modelIcons: ["GPT-4.1", "Claude"],
      },
      {
        id: "a2",
        name: "Form Validation Agent",
        description: "Validates application form completeness",
        capability: "Validation",
        icon: CheckCircle,
        modelIcons: ["GPT-4.1", "Gemini"],
      },
    ],
  },
  {
    id: "risk",
    name: "Risk & Scoring",
    agents: [
      {
        id: "a3",
        name: "Risk Assessment Agent",
        description: "Evaluates overall risk exposure and scoring",
        capability: "Risk Analysis",
        icon: Shield,
        modelIcons: ["GPT-4.1", "Claude"],
      },
      {
        id: "a4",
        name: "Claims History Agent",
        description: "Analyzes historical claims data for patterns",
        capability: "Data Processing",
        icon: Brain,
        modelIcons: ["GPT-4.1", "Gemini"],
      },
    ],
  },
  {
    id: "fraud",
    name: "Fraud Detection",
    agents: [
      {
        id: "a5",
        name: "Fraud Detection Agent",
        description: "Identifies potential fraud patterns in applications",
        capability: "ML Detection",
        icon: AlertTriangle,
        modelIcons: ["GPT-4.1", "Claude"],
      },
      {
        id: "a6",
        name: "Identity Verification Agent",
        description: "Verifies applicant identity and credentials",
        capability: "Verification",
        icon: Eye,
        modelIcons: ["GPT-4.1"],
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing & Validation",
    agents: [
      {
        id: "a7",
        name: "Premium Calculation Agent",
        description: "Calculates premiums based on risk factors",
        capability: "Pricing",
        icon: DollarSign,
        modelIcons: ["GPT-4.1", "Gemini"],
      },
      {
        id: "a8",
        name: "Market Rate Agent",
        description: "Compares pricing against current market rates",
        capability: "Benchmarking",
        icon: Calculator,
        modelIcons: ["GPT-4.1", "Claude"],
      },
    ],
  },
  {
    id: "decision",
    name: "Decision & Routing",
    agents: [
      {
        id: "a9",
        name: "Approval Routing Agent",
        description: "Routes applications based on decision criteria",
        capability: "Workflow",
        icon: GitBranch,
        modelIcons: ["GPT-4.1", "Claude"],
      },
      {
        id: "a10",
        name: "Escalation Agent",
        description: "Escalates complex cases to senior underwriters",
        capability: "Escalation",
        icon: Zap,
        modelIcons: ["GPT-4.1"],
      },
    ],
  },
];

const models = [
  { id: "gpt-4.1", name: "GPT-4.1", description: "Best for nuanced underwriting and reasoning" },
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", description: "Fast decisions for high-volume cases" },
  { id: "claude-opus", name: "Claude Opus", description: "Strong policy and document reasoning" },
  { id: "claude-sonnet", name: "Claude Sonnet", description: "Balanced speed and accuracy" },
  { id: "gemini-pro", name: "Gemini Pro", description: "Best for structured datasets" },
];

const dataSources = [
  { id: "policy", name: "Policy documents", connected: true },
  { id: "claims", name: "Historical claims", connected: true },
  { id: "property", name: "Property risk data", connected: false },
  { id: "external", name: "External benchmarks", connected: false },
];

const FlowEditor = () => {
  const { flowId } = useParams();
  const navigate = useNavigate();
  const [nodes] = useState<FlowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [showCatalogue, setShowCatalogue] = useState(true);
  const [showAgentPanel, setShowAgentPanel] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["doc", "risk"]);
  const [selectedModel, setSelectedModel] = useState("gpt-4.1");
  const [connectedSources, setConnectedSources] = useState<string[]>(["policy", "claims"]);
  const [agentInstruction, setAgentInstruction] = useState(
    "Review all submitted documents for completeness and accuracy. Flag any missing information or inconsistencies for manual review. Focus on policy limits, coverage dates, and named insured details."
  );

  const flowName = flowId === "new" 
    ? "New Workflow" 
    : "Commercial Property Assessment";

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleSource = (sourceId: string) => {
    setConnectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-canvas-workspace">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-16 px-6 bg-card border-b border-border flex items-center justify-between shrink-0 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/flows")}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-all hover:scale-105"
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
            className={`h-9 px-4 font-medium rounded-lg flex items-center gap-2 transition-all text-sm ${
              showCatalogue 
                ? "bg-primary-subtle text-primary" 
                : "bg-muted hover:bg-border text-foreground"
            }`}
          >
            <Plus className="w-4 h-4" />
            Agent Catalogue
          </button>
          <button className="h-9 px-4 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-all text-sm shadow-lg shadow-primary/20 hover:scale-105">
            Save Flow
          </button>
        </div>
      </motion.div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        {/* Ambient gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-canvas-workspace via-canvas-workspace to-primary/[0.02]" />
        <div className="absolute inset-0 canvas-grid" />

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
                    setShowCatalogue(false);
                  }
                }}
                className={`flow-node ${isSelected ? "selected" : ""} group`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
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
                <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-muted opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                {index < nodes.length - 1 && (
                  <div className="absolute left-1/2 -bottom-[42px] w-0.5 h-10 bg-gradient-to-b from-primary/30 to-border -translate-x-1/2" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Agent Catalogue Panel */}
        <AnimatePresence>
          {showCatalogue && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[400px] bg-card shadow-float border-l border-border overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-border shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-section-title">Agent Catalogue</h2>
                    <p className="text-xs text-muted-foreground mt-1">Drag agents to your workflow</p>
                  </div>
                  <button
                    onClick={() => setShowCatalogue(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-all hover:scale-105"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {agentGroups.map((group) => (
                  <div key={group.id} className="mb-4">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{group.name}</span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedGroups.includes(group.id) ? "rotate-180" : ""
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {expandedGroups.includes(group.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            {group.agents.map((agent) => {
                              const Icon = agent.icon;
                              return (
                                <motion.div
                                  key={agent.id}
                                  whileHover={{ scale: 1.02, y: -2 }}
                                  className="agent-card group cursor-pointer hover:ring-2 hover:ring-primary/50"
                                >
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-card rounded-lg flex items-center justify-center border border-border group-hover:bg-primary-subtle group-hover:border-primary/30 transition-colors">
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
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs bg-primary-subtle text-primary px-2 py-1 rounded-md font-medium">
                                        {agent.capability}
                                      </span>
                                      <div className="flex gap-1">
                                        {agent.modelIcons.map((model, i) => (
                                          <span key={i} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                            {model}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <button className="text-xs text-muted-foreground font-medium group-hover:text-primary-foreground group-hover:bg-primary px-3 py-1.5 rounded-lg transition-all hover:scale-105">
                                      Add to Flow
                                    </button>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Agent Panel */}
        <AnimatePresence>
          {showAgentPanel && selectedNode?.type === "agent" && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-foreground/10 backdrop-blur-[2px]"
                onClick={() => setShowAgentPanel(false)}
              />
              
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute right-0 top-0 bottom-0 w-[440px] bg-card shadow-float border-l border-border overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-border shrink-0 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-subtle rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-section-title">Edit Agent</h2>
                        <p className="text-xs text-muted-foreground">{selectedNode.label}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAgentPanel(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-all hover:scale-105"
                    >
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* SECTION 1: Model Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      Model Selection
                    </label>
                    <div className="space-y-2">
                      {models.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all hover:scale-[1.01] ${
                            selectedModel === model.id
                              ? "bg-primary-subtle border-2 border-primary shadow-sm"
                              : "bg-secondary border-2 border-transparent hover:border-border hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-foreground">{model.name}</div>
                              <div className="text-xs text-muted-foreground">{model.description}</div>
                            </div>
                            {selectedModel === model.id && (
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: Agent Instruction */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      What does this agent do?
                    </label>
                    <textarea
                      rows={5}
                      value={agentInstruction}
                      onChange={(e) => setAgentInstruction(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe the agent's role in underwriting terms. Be specific about what it should analyze and flag.
                    </p>
                  </div>

                  {/* SECTION 3: Data Sources */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Search className="w-4 h-4 text-primary" />
                      Connected Data Sources
                    </label>
                    <div className="space-y-2">
                      {dataSources.map((source) => (
                        <motion.button
                          key={source.id}
                          onClick={() => toggleSource(source.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                            connectedSources.includes(source.id)
                              ? "bg-primary-subtle border-2 border-primary/30"
                              : "bg-muted border-2 border-transparent hover:border-border"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            connectedSources.includes(source.id)
                              ? "bg-primary"
                              : "bg-border"
                          }`}>
                            {connectedSources.includes(source.id) && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                          <span className="text-sm text-foreground">{source.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="p-6 border-t border-border shrink-0 bg-gradient-to-r from-secondary/50 to-transparent">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-11 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-xl transition-all text-sm shadow-lg shadow-primary/25"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlowEditor;
