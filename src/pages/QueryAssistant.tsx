import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Upload,
  FileText,
  Database,
  Cloud,
  HardDrive,
} from "lucide-react";
import AssistantsHome from "@/components/query-assistant/AssistantsHome";
import KnowledgebaseStep from "@/components/query-assistant/KnowledgebaseStep";
import CustomizeStep from "@/components/query-assistant/CustomizeStep";
import TestPublishStep from "@/components/query-assistant/TestPublishStep";
import AssignUsersStep from "@/components/query-assistant/AssignUsersStep";
import PublishStep from "@/components/query-assistant/PublishStep";
import LiveAssistant from "@/components/query-assistant/LiveAssistant";
import IntegrationAPI from "@/components/query-assistant/IntegrationAPI";
import AssistantDashboard from "@/components/query-assistant/AssistantDashboard";

type View = "home" | "create" | "live" | "integration" | "dashboard";
type Step = 1 | 2 | 3 | 4 | 5;

interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: React.ElementType;
  path: string;
  lastSynced: string;
  connected: boolean;
  selected: boolean;
}

const steps = [
  { id: 1, label: "Knowledgebase", description: "Select sources" },
  { id: 2, label: "Configure", description: "Customize behavior" },
  { id: 3, label: "Assign", description: "Users & groups" },
  { id: 4, label: "Preview", description: "Visual preview" },
  { id: 5, label: "Publish", description: "Go live" },
];

const initialSources: KnowledgeSource[] = [
  { id: "1", name: "Uploaded Documents", type: "Documents", description: "Manual file uploads", icon: Upload, path: "Corporate Documents Collection", lastSynced: "2 hours ago", connected: true, selected: false },
  { id: "2", name: "SharePoint - Policies", type: "SharePoint", description: "Microsoft 365", icon: Cloud, path: "/sites/policies/Shared Documents", lastSynced: "1 hour ago", connected: true, selected: true },
  { id: "3", name: "AWS S3 - Reports", type: "S3", description: "AWS Storage", icon: HardDrive, path: "s3://company-reports/quarterly", lastSynced: "30 minutes ago", connected: true, selected: true },
  { id: "4", name: "PostgreSQL - Analytics", type: "Database", description: "SQL Database", icon: Database, path: "analytics.company.internal", lastSynced: "5 minutes ago", connected: true, selected: false },
  { id: "5", name: "Training Materials", type: "Documents", description: "Manual uploads", icon: FileText, path: "Training & Onboarding", lastSynced: "1 day ago", connected: true, selected: false },
];

const QueryAssistant = () => {
  const [view, setView] = useState<View>("home");
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [sources, setSources] = useState<KnowledgeSource[]>(initialSources);

  const [tone, setTone] = useState<"formal" | "neutral" | "friendly">("neutral");
  const [responseLength, setResponseLength] = useState([50]);
  const [riskSensitivity, setRiskSensitivity] = useState([50]);
  const [themeColor, setThemeColor] = useState("#6D28D9");
  const [assistantName, setAssistantName] = useState("");
  const [assignedCount, setAssignedCount] = useState(0);
  const [isPublished, setIsPublished] = useState(false);

  const handleCreateNew = () => {
    setView("create");
    setCurrentStep(1);
    setSources(initialSources.map((s) => ({ ...s, selected: false })));
    setAssistantName("");
    setAssignedCount(0);
    setIsPublished(false);
  };

  const handleSelectAssistant = (id: string, status: "draft" | "published") => {
    if (status === "draft") {
      setView("create");
      setCurrentStep(1);
    } else {
      setAssistantName("Policy Inquiry Assistant");
      setView("live");
    }
  };

  const toggleSource = (id: string) => {
    setSources(sources.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s)));
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => {
      setView("live");
      setIsPublished(false);
    }, 1500);
  };

  const selectedSourceCount = sources.filter((s) => s.selected).length;

  if (view === "dashboard") {
    return (
      <AssistantDashboard
        assistantName={assistantName || "Policy Inquiry Assistant"}
        themeColor={themeColor}
        onBack={() => setView("live")}
      />
    );
  }

  if (view === "live") {
    return (
      <LiveAssistant
        assistantName={assistantName || "Policy Inquiry Assistant"}
        themeColor={themeColor}
        tone={tone}
        responseLength={responseLength}
        riskSensitivity={riskSensitivity}
        onBack={() => setView("home")}
        onEditConfiguration={() => { setView("create"); setCurrentStep(2); }}
        onOpenIntegration={() => setView("integration")}
        onOpenDashboard={() => setView("dashboard")}
      />
    );
  }

  if (view === "integration") {
    return (
      <IntegrationAPI
        assistantName={assistantName || "Policy Inquiry Assistant"}
        themeColor={themeColor}
        onBack={() => setView("live")}
      />
    );
  }

  if (view === "home") {
    return (
      <AssistantsHome
        onCreateNew={handleCreateNew}
        onSelectAssistant={handleSelectAssistant}
      />
    );
  }

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 max-w-2xl">
        <h1 className="text-page-title mb-2">{assistantName || "New Assistant"}</h1>
        <p className="text-muted-foreground">Configure and deploy your AI-powered assistant</p>
      </motion.div>

      {/* Step Indicator */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full max-w-[1100px] mb-8">
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => step.id <= currentStep && setCurrentStep(step.id as Step)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : step.id < currentStep
                    ? "bg-primary-subtle text-primary hover:bg-accent cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-default"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep === step.id ? "bg-primary-foreground/20" : step.id < currentStep ? "bg-primary/20" : "bg-muted-foreground/20"
                }`}>
                  {step.id < currentStep ? <Check className="w-3.5 h-3.5" /> : step.id}
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium">{step.label}</div>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${step.id < currentStep ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <KnowledgebaseStep sources={sources} onToggleSource={toggleSource} onContinue={() => setCurrentStep(2)} onBack={() => setView("home")} />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <CustomizeStep tone={tone} setTone={setTone} responseLength={responseLength} setResponseLength={setResponseLength} riskSensitivity={riskSensitivity} setRiskSensitivity={setRiskSensitivity} themeColor={themeColor} setThemeColor={setThemeColor} assistantName={assistantName} setAssistantName={setAssistantName} onContinue={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <AssignUsersStep onContinue={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} assignedCount={assignedCount} onAssignedCountChange={setAssignedCount} />
          </motion.div>
        )}
        {currentStep === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <TestPublishStep themeColor={themeColor} assistantName={assistantName} onBack={() => setCurrentStep(3)} onPublish={() => setCurrentStep(5)} isPublished={false} isPreviewOnly />
          </motion.div>
        )}
        {currentStep === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <PublishStep assistantName={assistantName} themeColor={themeColor} tone={tone} selectedSourceCount={selectedSourceCount} assignedCount={assignedCount} onBack={() => setCurrentStep(4)} onPublish={handlePublish} isPublished={isPublished} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QueryAssistant;
