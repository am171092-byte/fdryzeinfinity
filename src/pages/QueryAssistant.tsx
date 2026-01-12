import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FileText,
  Database,
  History,
  MapPin,
  ChevronRight,
  Check,
  Upload,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

type Step = 1 | 2 | 3;

interface DataSource {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  connected: boolean;
}

interface QueryResponse {
  id: string;
  query: string;
  summary: string;
  explanation: string;
  confidence: number;
}

const steps = [
  { id: 1, label: "Connect", description: "Define knowledge sources" },
  { id: 2, label: "Customize", description: "Configure behavior" },
  { id: 3, label: "Test & Publish", description: "Validate and activate" },
];

const models = [
  { id: "gpt-4.1", name: "GPT-4.1", description: "Best for complex underwriting decisions" },
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", description: "Fast responses for high volume" },
  { id: "claude-opus", name: "Claude Opus", description: "Policy-heavy analysis" },
  { id: "gemini-pro", name: "Gemini Pro", description: "Large data reasoning" },
];

const suggestedQueries = [
  "What is the average premium for commercial property in CA?",
  "Show risk distribution by policy type",
  "What's the claims-to-premium ratio this quarter?",
  "Identify high-risk applications from last month",
];

const QueryAssistant = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: "1", name: "Upload Documents", description: "Upload policy documents, claims files, or risk reports", icon: Upload, connected: false },
    { id: "2", name: "Policy Documents", description: "Internal policy database with historical records", icon: FileText, connected: true },
    { id: "3", name: "Claims History", description: "Historical claims data and resolution patterns", icon: History, connected: true },
    { id: "4", name: "Risk & Property Datasets", description: "External risk scores and property valuations", icon: MapPin, connected: false },
  ]);

  // Customize step state
  const [tone, setTone] = useState<"formal" | "neutral" | "friendly">("neutral");
  const [selectedModel, setSelectedModel] = useState("gpt-4.1");
  const [responseLength, setResponseLength] = useState([50]);
  const [riskSensitivity, setRiskSensitivity] = useState([50]);

  // Test step state
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<QueryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const toggleDataSource = (id: string) => {
    setDataSources(dataSources.map(ds => 
      ds.id === id ? { ...ds, connected: !ds.connected } : ds
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const newResponse: QueryResponse = {
        id: Date.now().toString(),
        query: query,
        summary: "Based on your underwriting data, the average claim-to-premium ratio for this segment is 62%, which is within acceptable risk parameters for your portfolio.",
        explanation: "This analysis draws from 1,234 active policies and 156 claims processed in the last quarter. Key factors include: geographic distribution (45% coastal), average policy age (3.2 years), and loss history trending 8% below industry benchmarks.",
        confidence: 87,
      };
      setResponses([newResponse, ...responses]);
      setQuery("");
      setIsLoading(false);
    }, 1500);
  };

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  const connectedCount = dataSources.filter(ds => ds.connected).length;
  const canProceedToCustomize = connectedCount > 0;

  const getLengthLabel = (value: number) => {
    if (value < 33) return "Short";
    if (value < 66) return "Standard";
    return "Detailed";
  };

  const getSensitivityLabel = (value: number) => {
    if (value < 33) return "Conservative";
    if (value < 66) return "Balanced";
    return "Aggressive";
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl"
      >
        <h1 className="text-page-title mb-2">Query Assistant</h1>
        <p className="text-muted-foreground">
          Configure and deploy your AI-powered underwriting assistant
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
                onClick={() => step.id <= currentStep && setCurrentStep(step.id as Step)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : step.id < currentStep
                    ? "bg-primary-subtle text-primary hover:bg-accent cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-default"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === step.id
                    ? "bg-primary-foreground/20"
                    : step.id < currentStep
                    ? "bg-primary/20"
                    : "bg-muted-foreground/20"
                }`}>
                  {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{step.label}</div>
                  <div className={`text-xs ${currentStep === step.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {step.description}
                  </div>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                  step.id < currentStep ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* STEP 1: CONNECT */}
        {currentStep === 1 && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-[960px]"
          >
            <div className="card-float p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-section-title mb-2">Connect Your Knowledge</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Select the information your assistant should use to answer questions.
                  Connect at least one source to continue.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {dataSources.map((source) => {
                  const Icon = source.icon;
                  return (
                    <motion.button
                      key={source.id}
                      onClick={() => toggleDataSource(source.id)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-5 rounded-xl text-left transition-all duration-300 border-2 ${
                        source.connected
                          ? "bg-primary-subtle border-primary shadow-md"
                          : "bg-secondary border-transparent hover:border-border hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          source.connected ? "bg-primary/10" : "bg-card"
                        }`}>
                          <Icon className={`w-6 h-6 ${source.connected ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground mb-1">{source.name}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{source.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          source.connected
                            ? "bg-primary text-primary-foreground"
                            : "bg-border"
                        }`}>
                          {source.connected && <Check className="w-4 h-4" />}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {connectedCount} source{connectedCount !== 1 ? "s" : ""} connected
                </span>
                <motion.button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedToCustomize}
                  whileHover={canProceedToCustomize ? { scale: 1.02 } : {}}
                  whileTap={canProceedToCustomize ? { scale: 0.98 } : {}}
                  className={`h-11 px-6 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                    canProceedToCustomize
                      ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Continue to Customize
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: CUSTOMIZE */}
        {currentStep === 2 && (
          <motion.div
            key="customize"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-[960px]"
          >
            <div className="card-float overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Controls */}
                <div className="p-8 border-r border-border">
                  <h2 className="text-section-title mb-6">Customize Behavior</h2>
                  
                  {/* Tone Selection */}
                  <div className="mb-8">
                    <label className="text-sm font-medium text-foreground mb-3 block">Response Tone</label>
                    <div className="flex gap-2">
                      {(["formal", "neutral", "friendly"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={`flex-1 h-10 rounded-lg text-sm font-medium capitalize transition-all ${
                            tone === t
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-secondary text-foreground hover:bg-muted"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model Selection */}
                  <div className="mb-8">
                    <label className="text-sm font-medium text-foreground mb-3 block">AI Model</label>
                    <div className="space-y-2">
                      {models.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedModel === model.id
                              ? "bg-primary-subtle border-2 border-primary"
                              : "bg-secondary border-2 border-transparent hover:border-border"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-foreground">{model.name}</div>
                              <div className="text-xs text-muted-foreground">{model.description}</div>
                            </div>
                            {selectedModel === model.id && (
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Response Length */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-foreground">Response Length</label>
                      <span className="text-xs text-primary font-medium">{getLengthLabel(responseLength[0])}</span>
                    </div>
                    <Slider
                      value={responseLength}
                      onValueChange={setResponseLength}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Short</span>
                      <span>Standard</span>
                      <span>Detailed</span>
                    </div>
                  </div>

                  {/* Risk Sensitivity */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-foreground">Risk Sensitivity</label>
                      <span className="text-xs text-primary font-medium">{getSensitivityLabel(riskSensitivity[0])}</span>
                    </div>
                    <Slider
                      value={riskSensitivity}
                      onValueChange={setRiskSensitivity}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Conservative</span>
                      <span>Balanced</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="h-11 px-5 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-muted transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      onClick={() => setCurrentStep(3)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 h-11 px-6 rounded-xl font-medium text-sm bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all"
                    >
                      Continue to Test
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-8 bg-gradient-to-br from-secondary/50 to-secondary">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Live Preview</h3>
                  <div className="card-elevated p-5">
                    <div className="text-xs text-muted-foreground mb-3">Example Response</div>
                    <p className="text-sm text-foreground leading-relaxed mb-4">
                      {tone === "formal" && "Based on the submitted documentation, the risk assessment indicates a moderate exposure level. The recommended premium adjustment is within acceptable parameters."}
                      {tone === "neutral" && "Looking at the application, the risk level appears moderate. The premium calculation takes into account the property location and claims history."}
                      {tone === "friendly" && "Great news! After reviewing everything, this application looks solid. The risk is reasonable and the premium comes out to a fair rate for the coverage."}
                    </p>
                    <div className="flex items-center gap-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">{models.find(m => m.id === selectedModel)?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-xs text-muted-foreground">{getLengthLabel(responseLength[0])} format</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: TEST & PUBLISH */}
        {currentStep === 3 && (
          <motion.div
            key="test"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-[960px]"
          >
            <div className="card-float p-8 mb-6">
              <h2 className="text-section-title mb-2">Test Your Assistant</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Ask a question to validate your configuration before publishing.
              </p>

              {/* Suggested Queries */}
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestedQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="px-4 py-2 bg-secondary hover:bg-primary-subtle text-sm text-foreground rounded-full transition-all hover:scale-105"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Query Input */}
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask an underwriting question in plain language"
                    className="w-full h-14 pl-5 pr-14 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!query.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-primary-hover disabled:bg-muted text-primary-foreground disabled:text-muted-foreground rounded-lg flex items-center justify-center transition-all hover:scale-105 disabled:hover:scale-100"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Loading State */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card-elevated p-6 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-subtle rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Analyzing your underwriting data...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Responses */}
            <div className="space-y-6 mb-8">
              {responses.map((response, index) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-elevated p-6"
                >
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-muted-foreground">SM</span>
                    </div>
                    <p className="text-sm text-foreground pt-1">{response.query}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        Summary
                      </h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {response.summary}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                        Explanation
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {response.explanation}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      {response.confidence >= 80 ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        Confidence: {response.confidence}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation & Publish */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="h-11 px-5 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-muted transition-colors"
              >
                Back to Customize
              </button>
              <motion.button
                onClick={handlePublish}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`h-12 px-8 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                  isPublished
                    ? "bg-success text-success-foreground"
                    : "bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25"
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
                    Publish Query Assistant
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QueryAssistant;
