import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import AccessRestricted from "@/components/layout/AccessRestricted";
import ConnectorsGallery from "@/components/connectors/ConnectorsGallery";
import ConnectorTypeStep from "@/components/connectors/ConnectorTypeStep";
import ConnectorPropertiesStep from "@/components/connectors/ConnectorPropertiesStep";
import ConnectorReviewStep from "@/components/connectors/ConnectorReviewStep";
import ConnectorDetails from "@/components/connectors/ConnectorDetails";
import { ConnectorData, ConnectorTypeId, ContentType, FilterMode } from "@/components/connectors/types";

type View = "gallery" | "create" | "details";
type WizardStep = 1 | 2 | 3;

const wizardSteps = [
  { id: 1, label: "Choose Type", description: "Select connector" },
  { id: 2, label: "Configure", description: "Set properties" },
  { id: 3, label: "Review", description: "Create connector" },
];

const initialConnectors: ConnectorData[] = [
  {
    id: "c1", name: "SharePoint – Policies", type: "sharepoint",
    sourceUrl: "https://contoso.sharepoint.com/sites/Policies",
    status: "active", lastSync: "2 hours ago", sourcesSummary: "Doc Libraries: 2",
    usedByAssistants: 2, contentType: "document-library", filterMode: "include",
    selectedItems: ["Policies", "Contracts"], fileTypeFilterMode: null, selectedFileTypes: [],
  },
  {
    id: "c2", name: "S3 – Reports Bucket", type: "s3",
    sourceUrl: "s3://company-reports/quarterly/",
    status: "syncing", lastSync: "30 min ago", sourcesSummary: "Prefix: quarterly/",
    usedByAssistants: 1, region: "us-east-1", fileTypeFilterMode: "include",
    selectedFileTypes: ["pdf", "docx"],
  },
  {
    id: "c3", name: "Google Drive – Training", type: "google-drive",
    sourceUrl: "https://drive.google.com/drive/folders/abc123",
    status: "active", lastSync: "1 day ago", sourcesSummary: "Folder",
    usedByAssistants: 0, driveContentType: "folder", fileTypeFilterMode: null, selectedFileTypes: [],
  },
];

const Connectors = () => {
  const { role } = useRole();
  const [view, setView] = useState<View>("gallery");
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [connectors, setConnectors] = useState<ConnectorData[]>(initialConnectors);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Wizard form state
  const [connectorType, setConnectorType] = useState<ConnectorTypeId | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [connectorName, setConnectorName] = useState("");
  // SharePoint
  const [contentType, setContentType] = useState<ContentType>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("include");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // Shared file type filter
  const [fileTypeFilterMode, setFileTypeFilterMode] = useState<FilterMode | null>(null);
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  // Upload
  const [collectionName, setCollectionName] = useState("");
  // Google Drive
  const [driveContentType, setDriveContentType] = useState<"folder" | "shared-drive" | null>(null);
  // S3
  const [region, setRegion] = useState("");
  const [prefix, setPrefix] = useState("");

  if (role !== "org-admin") {
    return <AccessRestricted requiredRole="Organization Admin" />;
  }

  const resetWizard = () => {
    setWizardStep(1);
    setConnectorType(null);
    setSourceUrl("");
    setConnectorName("");
    setContentType(null);
    setFilterMode("include");
    setSelectedItems([]);
    setFileTypeFilterMode(null);
    setSelectedFileTypes([]);
    setCollectionName("");
    setDriveContentType(null);
    setRegion("");
    setPrefix("");
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    resetWizard();
    setView("create");
  };

  const handleSelectConnector = (id: string) => {
    setSelectedConnectorId(id);
    setView("details");
  };

  const handleTypeSelect = (type: ConnectorTypeId) => {
    setConnectorType(type);
    setWizardStep(2);
  };

  const handleCreate = () => {
    setIsCreating(true);
    const typeLabels: Record<ConnectorTypeId, string> = {
      upload: "Upload", sharepoint: "SharePoint", "google-drive": "Google Drive", s3: "Amazon S3",
    };
    const newConnector: ConnectorData = {
      id: `c${Date.now()}`,
      name: connectorName || `${typeLabels[connectorType!]} Connector`,
      type: connectorType!,
      sourceUrl,
      status: "draft",
      lastSync: "Just now",
      sourcesSummary: contentType
        ? `${contentType === "document-library" ? "Doc Libraries" : contentType === "list" ? "Lists" : "Pages"}: ${selectedItems.length || "All"}`
        : collectionName || (region ? `Region: ${region}` : "Configured"),
      usedByAssistants: 0,
      contentType, filterMode, selectedItems,
      fileTypeFilterMode, selectedFileTypes,
      collectionName, driveContentType, region, prefix,
    };

    setTimeout(() => {
      setConnectors((prev) => [newConnector, ...prev]);
      setSelectedConnectorId(newConnector.id);
      setView("details");
      setIsCreating(false);
    }, 1200);
  };

  const selectedConnector = connectors.find((c) => c.id === selectedConnectorId);

  // Details view
  if (view === "details" && selectedConnector) {
    return (
      <ConnectorDetails
        connector={selectedConnector}
        onBack={() => setView("gallery")}
        onEdit={() => {
          // Pre-fill wizard with connector data for editing
          setConnectorType(selectedConnector.type);
          setSourceUrl(selectedConnector.sourceUrl);
          setConnectorName(selectedConnector.name);
          setContentType(selectedConnector.contentType || null);
          setFilterMode(selectedConnector.filterMode || "include");
          setSelectedItems(selectedConnector.selectedItems || []);
          setFileTypeFilterMode(selectedConnector.fileTypeFilterMode || null);
          setSelectedFileTypes(selectedConnector.selectedFileTypes || []);
          setCollectionName(selectedConnector.collectionName || "");
          setDriveContentType(selectedConnector.driveContentType || null);
          setRegion(selectedConnector.region || "");
          setPrefix(selectedConnector.prefix || "");
          setWizardStep(2);
          setView("create");
        }}
      />
    );
  }

  // Gallery view
  if (view === "gallery") {
    return (
      <ConnectorsGallery
        connectors={connectors}
        onCreateNew={handleCreateNew}
        onSelectConnector={handleSelectConnector}
      />
    );
  }

  // Create wizard
  return (
    <div className="p-8 flex flex-col items-center min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 max-w-2xl">
        <h1 className="text-page-title mb-2">New Connector</h1>
        <p className="text-muted-foreground">Set up a new data source for your AI assistants</p>
      </motion.div>

      {/* Step Indicator */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full max-w-[700px] mb-8">
        <div className="flex items-center justify-center gap-0">
          {wizardSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => step.id <= wizardStep && setWizardStep(step.id as WizardStep)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  wizardStep === step.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : step.id < wizardStep
                    ? "bg-primary-subtle text-primary hover:bg-accent cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-default"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  wizardStep === step.id ? "bg-primary-foreground/20" : step.id < wizardStep ? "bg-primary/20" : "bg-muted-foreground/20"
                }`}>
                  {step.id < wizardStep ? <Check className="w-3.5 h-3.5" /> : step.id}
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium">{step.label}</div>
                </div>
              </button>
              {index < wizardSteps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${step.id < wizardStep ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {wizardStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <ConnectorTypeStep onSelect={handleTypeSelect} onBack={() => setView("gallery")} />
          </motion.div>
        )}
        {wizardStep === 2 && connectorType && (
          <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <ConnectorPropertiesStep
              connectorType={connectorType}
              sourceUrl={sourceUrl} onSourceUrlChange={setSourceUrl}
              contentType={contentType} onContentTypeChange={setContentType}
              filterMode={filterMode} onFilterModeChange={setFilterMode}
              selectedItems={selectedItems} onSelectedItemsChange={setSelectedItems}
              fileTypeFilterMode={fileTypeFilterMode} onFileTypeFilterModeChange={setFileTypeFilterMode}
              selectedFileTypes={selectedFileTypes} onSelectedFileTypesChange={setSelectedFileTypes}
              collectionName={collectionName} onCollectionNameChange={setCollectionName}
              driveContentType={driveContentType} onDriveContentTypeChange={setDriveContentType}
              region={region} onRegionChange={setRegion}
              prefix={prefix} onPrefixChange={setPrefix}
              onContinue={() => setWizardStep(3)}
              onBack={() => setWizardStep(1)}
            />
          </motion.div>
        )}
        {wizardStep === 3 && connectorType && (
          <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
            <ConnectorReviewStep
              connectorName={connectorName}
              connectorType={connectorType}
              sourceUrl={sourceUrl}
              contentType={contentType}
              filterMode={filterMode}
              selectedItems={selectedItems}
              fileTypeFilterMode={fileTypeFilterMode}
              selectedFileTypes={selectedFileTypes}
              collectionName={collectionName}
              driveContentType={driveContentType}
              region={region}
              prefix={prefix}
              onBack={() => setWizardStep(2)}
              onCreate={handleCreate}
              isCreating={isCreating}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Connectors;
