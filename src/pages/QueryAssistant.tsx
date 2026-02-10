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
import LiveAssistant from "@/components/query-assistant/LiveAssistant";
import IntegrationAPI from "@/components/query-assistant/IntegrationAPI";

type View = "home" | "create" | "live" | "integration";
type Step = 1 | 2 | 3;

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
  { id: 2, label: "Customize", description: "Configure behavior" },
  { id: 3, label: "Test & Publish", description: "Validate and activate" },
];

const initialSources: KnowledgeSource[] = [
  {
    id: "1",
    name: "Uploaded Documents",
    type: "Documents",
    description: "Manual file uploads",
    icon: Upload,
    path: "Policy Documents Collection",
    lastSynced: "2 hours ago",
    connected: true,
    selected: false,
  },
  {
    id: "2",
    name: "SharePoint - Policies",
    type: "SharePoint",
    description: "Microsoft 365",
    icon: Cloud,
    path: "/sites/policies/Shared Documents",
    lastSynced: "1 hour ago",
    connected: true,
    selected: true,
  },
  {
    id: "3",
    name: "AWS S3 - Reports",
    type: "S3",
    description: "AWS Storage",
    icon: HardDrive,
    path: "s3://company-reports/quarterly",
    lastSynced: "30 minutes ago",
    connected: true,
    selected: true,
  },
  {
    id: "4",
    name: "PostgreSQL - Analytics",
    type: "Database",
    description: "SQL Database",
    icon: Database,
    path: "analytics.company.internal",
    lastSynced: "5 minutes ago",
    connected: true,
    selected: false,
  },
  {
    id: "5",
    name: "Training Materials",
    type: "Documents",
    description: "Manual uploads",
    icon: FileText,
    path: "Training & Onboarding",
    lastSynced: "1 day ago",
    connected: true,
    selected: false,
  },
];

const QueryAssistant = () => {
  const [view, setView] = useState<View>("home");
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [sources, setSources] = useState<KnowledgeSource[]>(initialSources);

  // Customize step state
  const [tone, setTone] = useState<"formal" | "neutral" | "friendly">("neutral");
  const [responseLength, setResponseLength] = useState([50]);
  const [riskSensitivity, setRiskSensitivity] = useState([50]);
  const [themeColor, setThemeColor] = useState("#6D28D9");
  const [assistantName, setAssistantName] = useState("");

  // Publish state
  const [isPublished, setIsPublished] = useState(false);

  const handleCreateNew = () => {
    setView("create");
    setCurrentStep(1);
    setSources(initialSources.map((s) => ({ ...s, selected: false })));
    setAssistantName("");
    setIsPublished(false);
  };

  const handleSelectAssistant = (id: string, status: "draft" | "published") => {
    if (status === "draft") {
      setView("create");
      setCurrentStep(1);
    } else {
      // Published assistants go straight to Live view
      setAssistantName("Policy Inquiry Assistant");
      setView("live");
    }
  };

  const toggleSource = (id: string) => {
    setSources(
      sources.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => {
      setView("live");
      setIsPublished(false);
    }, 1500);
  };

  // Live Assistant view
  if (view === "live") {
    return (
      <LiveAssistant
        assistantName={assistantName || "Policy Inquiry Assistant"}
        themeColor={themeColor}
        tone={tone}
        responseLength={responseLength}
        riskSensitivity={riskSensitivity}
        onBack={() => setView("home")}
        onEditConfiguration={() => {
          setView("create");
          setCurrentStep(2);
        }}
        onOpenIntegration={() => setView("integration")}
      />
    );
  }

  // Integration & API view
  if (view === "integration") {
    return (
      <IntegrationAPI
        assistantName={assistantName || "Policy Inquiry Assistant"}
        themeColor={themeColor}
        onBack={() => setView("live")}
      />
    );
  }

  // Show Assistants Home
  if (view === "home") {
    return (
      <AssistantsHome
        onCreateNew={handleCreateNew}
        onSelectAssistant={handleSelectAssistant}
      />
    );
  }

  // Show Create/Edit Flow
  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl"
      >
        <h1 className="text-page-title mb-2">
          {assistantName || "New Assistant"}
        </h1>
        <p className="text-muted-foreground">
          Configure and deploy your AI-powered assistant
        </p>
      </motion.div>

      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-[960px] mb-8"
      >
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() =>
                  step.id <= currentStep && setCurrentStep(step.id as Step)
                }
                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : step.id < currentStep
                    ? "bg-primary-subtle text-primary hover:bg-accent cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-default"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === step.id
                      ? "bg-primary-foreground/20"
                      : step.id < currentStep
                      ? "bg-primary/20"
                      : "bg-muted-foreground/20"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{step.label}</div>
                  <div
                    className={`text-xs ${
                      currentStep === step.id
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.description}
                  </div>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                    step.id < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <KnowledgebaseStep
              sources={sources}
              onToggleSource={toggleSource}
              onContinue={() => setCurrentStep(2)}
              onBack={() => setView("home")}
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <CustomizeStep
              tone={tone}
              setTone={setTone}
              responseLength={responseLength}
              setResponseLength={setResponseLength}
              riskSensitivity={riskSensitivity}
              setRiskSensitivity={setRiskSensitivity}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
              assistantName={assistantName}
              setAssistantName={setAssistantName}
              onContinue={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <TestPublishStep
              themeColor={themeColor}
              assistantName={assistantName}
              onBack={() => setCurrentStep(2)}
              onPublish={handlePublish}
              isPublished={isPublished}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QueryAssistant;
