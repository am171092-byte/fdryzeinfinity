import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Globe,
  Layout,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Shield,
  Clock,
  AlertCircle,
  Check,
  ExternalLink,
  Palette,
} from "lucide-react";

interface IntegrationAPIProps {
  assistantName: string;
  themeColor: string;
  onBack: () => void;
}

type Tab = "deploy" | "credentials";
type DeployOption = "api" | "widget" | "hosted";

const IntegrationAPI = ({ assistantName, themeColor, onBack }: IntegrationAPIProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("deploy");
  const [activeDeployOption, setActiveDeployOption] = useState<DeployOption>("api");
  const [showSecret, setShowSecret] = useState(false);
  const [environment, setEnvironment] = useState<"production" | "staging">("production");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [widgetTheme, setWidgetTheme] = useState<"light" | "dark">("light");
  const [widgetPosition, setWidgetPosition] = useState<"bottom-right" | "bottom-left">("bottom-right");
  const [showBranding, setShowBranding] = useState(true);
  const [autoOpen, setAutoOpen] = useState(false);
  const [greeting, setGreeting] = useState("Hi! How can I help you today?");

  const [customSubdomain, setCustomSubdomain] = useState("");
  const [accessRestriction, setAccessRestriction] = useState<"public" | "authenticated">("public");
  const [allowedDomains, setAllowedDomains] = useState("");

  const assistantId = "asst_7f3k9m2x";
  const publicKey = "pk_live_abc123def456";
  const secretKey = "sk_live_xyz789ghi012";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button onClick={() => handleCopy(text, field)} className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors shrink-0">
      {copiedField === field ? <Check className="w-3.5 h-3.5 text-[hsl(var(--success))]" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );

  const tabs = [
    { id: "deploy" as Tab, label: "Deployment", icon: Code2 },
    { id: "credentials" as Tab, label: "API Credentials", icon: Shield },
  ];

  const deployOptions = [
    { id: "api" as DeployOption, label: "Embed via API", description: "Connect to your existing chat interface", icon: Code2 },
    { id: "widget" as DeployOption, label: "Embedded Widget", description: "Floating assistant on your website", icon: Layout },
    { id: "hosted" as DeployOption, label: "Hosted Page", description: "Full-page hosted experience", icon: Globe },
  ];

  return (
    <div className="p-8 flex flex-col min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-page-title">Integrate Assistant</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Deploy <span className="font-medium text-foreground">{assistantName}</span> to your website or applications
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-8 w-fit">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "deploy" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deployOptions.map((opt) => (
              <button key={opt.id} onClick={() => setActiveDeployOption(opt.id)} className={`card-elevated p-5 text-left transition-all ${activeDeployOption === opt.id ? "ring-2 ring-primary" : ""}`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: activeDeployOption === opt.id ? `${themeColor}15` : undefined }}>
                  <opt.icon className="w-5 h-5" style={{ color: activeDeployOption === opt.id ? themeColor : undefined }} />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-1">{opt.label}</h3>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              </button>
            ))}
          </div>

          {activeDeployOption === "api" && (
            <div className="card-float p-6 space-y-6">
              <div>
                <h3 className="text-section-title mb-1">API Integration</h3>
                <p className="text-sm text-muted-foreground">Connect this assistant to your current chat interface via REST API.</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">API Endpoint</label>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl font-mono text-sm">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-bold">POST</span>
                  <span className="text-foreground flex-1 truncate">https://api.fdryze.ai/v1/assistants/{assistantId}/query</span>
                  <CopyButton text={`https://api.fdryze.ai/v1/assistants/${assistantId}/query`} field="endpoint" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Environment</label>
                <div className="flex gap-2">
                  {(["production", "staging"] as const).map((env) => (
                    <button key={env} onClick={() => setEnvironment(env)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${environment === env ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}>{env}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-secondary rounded-xl">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Rate limit: 1,000 requests/min (Production) • 100 requests/min (Staging)</span>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Request Example</label>
                <div className="bg-[hsl(240,10%,8%)] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono whitespace-pre">
{`curl -X POST https://api.fdryze.ai/v1/assistants/${assistantId}/query \\
  -H "Authorization: Bearer {API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "User question",
    "session_id": "optional-session-id",
    "context": {}
  }'`}
                  </pre>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Response Format</label>
                <div className="bg-[hsl(240,10%,8%)] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono whitespace-pre">
{`{
  "response": {
    "summary": "...",
    "explanation": "...",
    "confidence": "High",
    "sources": []
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeDeployOption === "widget" && (
            <div className="card-float p-6 space-y-6">
              <div>
                <h3 className="text-section-title mb-1">Embedded Widget</h3>
                <p className="text-sm text-muted-foreground">Add a floating assistant on your website with a simple snippet.</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Embed Code</label>
                <div className="relative bg-[hsl(240,10%,8%)] rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono whitespace-pre">
{`<script src="https://cdn.fdryze.ai/widget.js"></script>
<script>
  FDRYZEWidget.init({
    assistantId: "${assistantId}",
    apiKey: "${publicKey}",
    theme: "${widgetTheme}",
    position: "${widgetPosition}"
  });
</script>`}
                  </pre>
                  <button onClick={() => handleCopy(`<script src="https://cdn.fdryze.ai/widget.js"></script>`, "widget-code")} className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                    {copiedField === "widget-code" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/60" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Widget Theme</label>
                  <div className="flex gap-2">
                    {(["light", "dark"] as const).map((t) => (
                      <button key={t} onClick={() => setWidgetTheme(t)} className={`flex-1 h-10 rounded-lg text-sm font-medium capitalize transition-all ${widgetTheme === t ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Position</label>
                  <div className="flex gap-2">
                    {(["bottom-right", "bottom-left"] as const).map((p) => (
                      <button key={p} onClick={() => setWidgetPosition(p)} className={`flex-1 h-10 rounded-lg text-sm font-medium capitalize transition-all ${widgetPosition === p ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}>{p.replace("-", " ")}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block"><Palette className="w-4 h-4 inline mr-2" />Accent Color</label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border-2 border-border" style={{ backgroundColor: themeColor }} />
                    <span className="text-sm text-muted-foreground font-mono">{themeColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Default Greeting</label>
                  <input type="text" value={greeting} onChange={(e) => setGreeting(e.target.value)} className="w-full h-10 px-4 bg-background border border-input rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <button onClick={() => setShowBranding(!showBranding)} className={`w-10 h-6 rounded-full transition-colors ${showBranding ? "bg-primary" : "bg-border"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${showBranding ? "translate-x-4" : ""}`} />
                  </button>
                  <span className="text-sm text-foreground">Show branding</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <button onClick={() => setAutoOpen(!autoOpen)} className={`w-10 h-6 rounded-full transition-colors ${autoOpen ? "bg-primary" : "bg-border"}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform mx-1 ${autoOpen ? "translate-x-4" : ""}`} />
                  </button>
                  <span className="text-sm text-foreground">Auto-open</span>
                </label>
              </div>
            </div>
          )}

          {activeDeployOption === "hosted" && (
            <div className="card-float p-6 space-y-6">
              <div>
                <h3 className="text-section-title mb-1">Standalone Hosted Page</h3>
                <p className="text-sm text-muted-foreground">Use this assistant as a full-page experience hosted by FDRYZE.</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Hosted URL</label>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
                  <span className="text-sm text-foreground font-mono flex-1 truncate">https://app.fdryze.ai/assistant/{assistantId}</span>
                  <CopyButton text={`https://app.fdryze.ai/assistant/${assistantId}`} field="hosted-url" />
                  <a href="#" className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Custom Subdomain</label>
                  <div className="flex items-center gap-0">
                    <input type="text" value={customSubdomain} onChange={(e) => setCustomSubdomain(e.target.value)} placeholder="your-team" className="flex-1 h-10 px-4 bg-background border border-input rounded-l-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    <span className="h-10 px-3 bg-secondary border border-l-0 border-input rounded-r-xl text-xs text-muted-foreground flex items-center">.fdryze.ai</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Access Restriction</label>
                  <div className="flex gap-2">
                    {(["public", "authenticated"] as const).map((r) => (
                      <button key={r} onClick={() => setAccessRestriction(r)} className={`flex-1 h-10 rounded-lg text-sm font-medium capitalize transition-all ${accessRestriction === r ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Allowed Domains</label>
                <input type="text" value={allowedDomains} onChange={(e) => setAllowedDomains(e.target.value)} placeholder="example.com, app.example.com" className="w-full h-10 px-4 bg-background border border-input rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <p className="text-xs text-muted-foreground mt-1">Comma-separated list of allowed domains</p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === "credentials" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="card-float p-6 space-y-6">
            <div>
              <h3 className="text-section-title mb-1">API Credentials</h3>
              <p className="text-sm text-muted-foreground">Manage your API keys for {assistantName}.</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Environment</label>
              <div className="flex gap-2">
                {(["production", "staging"] as const).map((env) => (
                  <button key={env} onClick={() => setEnvironment(env)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${environment === env ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}>{env}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Public Key</label>
              <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
                <span className="text-sm text-foreground font-mono flex-1">{publicKey}</span>
                <CopyButton text={publicKey} field="public-key" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Secret Key</label>
              <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
                <span className="text-sm text-foreground font-mono flex-1">{showSecret ? secretKey : "sk_live_••••••••••••"}</span>
                <button onClick={() => setShowSecret(!showSecret)} className="w-8 h-8 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
                  {showSecret ? <EyeOff className="w-3.5 h-3.5 text-muted-foreground" /> : <Eye className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
                <CopyButton text={secretKey} field="secret-key" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                Last rotated: 14 days ago
              </div>
              <button className="h-9 px-4 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5" />
                Rotate Keys
              </button>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[hsl(32,95%,95%)] rounded-xl">
              <Shield className="w-5 h-5 text-[hsl(32,95%,44%)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[hsl(32,95%,30%)]">Security Notice</p>
                <p className="text-xs text-[hsl(32,95%,35%)] mt-1">Secret keys should never be exposed client-side except public widget keys. Store them securely on your server.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IntegrationAPI;
