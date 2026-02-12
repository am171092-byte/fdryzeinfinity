import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud, HardDrive, Database, Upload, FileText, Check, AlertCircle, ChevronRight, Eye, EyeOff, RefreshCw, Plus, Trash2, Shield, FileCheck,
} from "lucide-react";

type ConnectorType = "sharepoint" | "s3" | "documents" | "databases" | "policy";
type DatabaseType = "postgresql" | "mysql" | "sqlserver" | "snowflake";

const connectors = [
  { id: "sharepoint", name: "SharePoint", icon: Cloud, description: "Microsoft 365 / Entra ID" },
  { id: "s3", name: "Amazon S3", icon: HardDrive, description: "AWS Storage" },
  { id: "documents", name: "Document Uploads", icon: FileText, description: "Manual uploads" },
  { id: "databases", name: "Databases", icon: Database, description: "SQL connections" },
  { id: "policy", name: "Access Policy", icon: FileCheck, description: "Governance artifacts" },
];

const databaseTypes = [
  { id: "postgresql", name: "PostgreSQL" },
  { id: "mysql", name: "MySQL" },
  { id: "sqlserver", name: "SQL Server" },
  { id: "snowflake", name: "Snowflake" },
];

const DataConnectionsTab = () => {
  const [activeConnector, setActiveConnector] = useState<ConnectorType>("sharepoint");
  const [s3AuthTab, setS3AuthTab] = useState<"keys" | "role">("keys");
  const [selectedDbType, setSelectedDbType] = useState<DatabaseType>("postgresql");
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [testStatus, setTestStatus] = useState<Record<string, "idle" | "testing" | "success" | "error">>({});

  const toggleSecret = (field: string) => setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleTestConnection = (connectorId: string) => {
    setTestStatus((prev) => ({ ...prev, [connectorId]: "testing" }));
    setTimeout(() => setTestStatus((prev) => ({ ...prev, [connectorId]: "success" })), 2000);
  };

  const renderPasswordInput = (field: string, placeholder: string) => (
    <div className="relative">
      <input type={showSecrets[field] ? "text" : "password"} placeholder={placeholder} className="w-full h-10 px-3 pr-10 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" />
      <button type="button" onClick={() => toggleSecret(field)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
        {showSecrets[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );

  const renderTestButton = (connectorId: string) => {
    const status = testStatus[connectorId] || "idle";
    return (
      <button onClick={() => handleTestConnection(connectorId)} disabled={status === "testing"} className={`h-10 px-4 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${status === "success" ? "bg-success/10 text-success" : status === "error" ? "bg-destructive/10 text-destructive" : "bg-secondary text-foreground hover:bg-muted"}`}>
        {status === "testing" ? (<><RefreshCw className="w-4 h-4 animate-spin" />Testing...</>) : status === "success" ? (<><Check className="w-4 h-4" />Connected</>) : (<><RefreshCw className="w-4 h-4" />Test Connection</>)}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-section-title mb-2">Data Connections</h2>
        <p className="text-sm text-muted-foreground">
          Connect enterprise data sources for FDRYZE Nexus assistants. Admin-only configuration.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Connector List */}
        <div className="w-64 shrink-0 space-y-2">
          {connectors.map((connector) => {
            const Icon = connector.icon;
            const isActive = activeConnector === connector.id;
            return (
              <button key={connector.id} onClick={() => setActiveConnector(connector.id as ConnectorType)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${isActive ? "bg-primary-subtle text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <Icon className="w-5 h-5" />
                <div className="flex-1 min-w-0"><div className="text-sm font-medium">{connector.name}</div><div className="text-xs opacity-70 truncate">{connector.description}</div></div>
                {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Configuration Panel */}
        <div className="flex-1 card-elevated p-6">
          {/* SharePoint */}
          {activeConnector === "sharepoint" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center"><Cloud className="w-5 h-5 text-primary" /></div>
                <div><h3 className="text-base font-semibold text-foreground">SharePoint</h3><p className="text-xs text-muted-foreground">Microsoft 365 / Entra ID</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-sm font-medium text-foreground">Tenant ID (Directory ID)</label><input type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-foreground">Client ID (Application ID)</label><input type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                <div className="space-y-2 col-span-2"><label className="text-sm font-medium text-foreground">Client Secret</label>{renderPasswordInput("sp_secret", "Enter client secret")}</div>
                <div className="space-y-2"><label className="text-sm font-medium text-foreground">Authority URL</label><input type="text" defaultValue="https://login.microsoftonline.com/{tenantId}" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-foreground">Token URL</label><input type="text" defaultValue="https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-foreground">Scope</label><input type="text" defaultValue="https://graph.microsoft.com/.default" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                <div className="space-y-2"><label className="text-sm font-medium text-foreground">Site URL</label><input type="text" placeholder="https://company.sharepoint.com/sites/..." className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                <div className="space-y-2 col-span-2"><label className="text-sm font-medium text-foreground">Library/Folder Path</label><input type="text" placeholder="/Shared Documents/Policies" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground"><strong>Permissions:</strong> Read-only access to specified libraries. Secrets are stored securely.</div>
              <div className="flex gap-3 pt-4 border-t border-border">{renderTestButton("sharepoint")}<button className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">Save Connection</button></div>
            </motion.div>
          )}

          {/* S3 */}
          {activeConnector === "s3" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center"><HardDrive className="w-5 h-5 text-primary" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Amazon S3</h3><p className="text-xs text-muted-foreground">AWS Storage</p></div>
              </div>
              <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
                <button onClick={() => setS3AuthTab("keys")} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${s3AuthTab === "keys" ? "bg-card text-foreground shadow" : "text-muted-foreground"}`}>IAM Keys</button>
                <button onClick={() => setS3AuthTab("role")} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${s3AuthTab === "role" ? "bg-card text-foreground shadow" : "text-muted-foreground"}`}>Assume Role</button>
              </div>
              {s3AuthTab === "keys" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Region</label><select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"><option>us-east-1</option><option>us-west-2</option><option>eu-west-1</option><option>ap-southeast-1</option></select></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Bucket</label><input type="text" placeholder="my-bucket-name" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Prefix (optional)</label><input type="text" placeholder="documents/" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Access Key ID</label><input type="text" placeholder="AKIA..." className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Secret Access Key</label>{renderPasswordInput("s3_secret", "Enter secret access key")}</div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Session Token (optional)</label>{renderPasswordInput("s3_token", "Enter session token")}</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Region</label><select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"><option>us-east-1</option><option>us-west-2</option><option>eu-west-1</option><option>ap-southeast-1</option></select></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Bucket</label><input type="text" placeholder="my-bucket-name" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2 col-span-2"><label className="text-sm font-medium text-foreground">Role ARN</label><input type="text" placeholder="arn:aws:iam::123456789012:role/MyRole" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2 col-span-2"><label className="text-sm font-medium text-foreground">External ID (optional)</label><input type="text" placeholder="External ID for cross-account access" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                </div>
              )}
              <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground"><Shield className="w-3.5 h-3.5 inline mr-1" />Secrets are stored securely and never exposed client-side.</div>
              <div className="flex gap-3 pt-4 border-t border-border">{renderTestButton("s3")}<button className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">Save Connection</button></div>
            </motion.div>
          )}

          {/* Documents */}
          {activeConnector === "documents" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Document Uploads</h3><p className="text-xs text-muted-foreground">Manual file uploads</p></div>
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-foreground font-medium mb-1">Drop files here or click to upload</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT, CSV up to 50MB each</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3"><h4 className="text-sm font-medium text-foreground">Collections</h4><button className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"><Plus className="w-4 h-4" />New Collection</button></div>
                <div className="space-y-2">
                  {[{ name: "Corporate Documents", files: 24, status: "indexed" }, { name: "Training Materials", files: 12, status: "indexed" }, { name: "Compliance Reports", files: 8, status: "indexing" }].map((collection) => (
                    <div key={collection.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-muted-foreground" /><div><div className="text-sm font-medium text-foreground">{collection.name}</div><div className="text-xs text-muted-foreground">{collection.files} files</div></div></div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${collection.status === "indexed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{collection.status === "indexed" ? "Indexed" : "Indexing..."}</span>
                        <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Databases */}
          {activeConnector === "databases" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center"><Database className="w-5 h-5 text-primary" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Databases</h3><p className="text-xs text-muted-foreground">SQL database connections</p></div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {databaseTypes.map((db) => (<button key={db.id} onClick={() => setSelectedDbType(db.id as DatabaseType)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedDbType === db.id ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"}`}>{db.name}</button>))}
              </div>

              {selectedDbType === "postgresql" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Host</label><input type="text" placeholder="localhost or db.example.com" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Port</label><input type="text" defaultValue="5432" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Database Name</label><input type="text" placeholder="mydb" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Username</label><input type="text" placeholder="postgres" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Password</label>{renderPasswordInput("pg_password", "Enter password")}</div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">SSL Mode</label><select className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"><option>disable</option><option>require</option><option>verify-ca</option><option>verify-full</option></select></div>
                  <div className="space-y-2 col-span-2"><label className="text-sm font-medium text-foreground">CA Certificate (optional)</label><div className="border border-input rounded-lg p-3 text-center hover:border-primary/50 transition-colors cursor-pointer"><Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" /><p className="text-xs text-muted-foreground">Click to upload CA cert</p></div></div>
                </div>
              )}
              {selectedDbType === "mysql" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Host</label><input type="text" placeholder="localhost" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Port</label><input type="text" defaultValue="3306" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Database Name</label><input type="text" placeholder="mydb" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Username</label><input type="text" placeholder="root" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2 col-span-2"><label className="text-sm font-medium text-foreground">Password</label>{renderPasswordInput("mysql_password", "Enter password")}</div>
                </div>
              )}
              {selectedDbType === "sqlserver" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Server</label><input type="text" placeholder="server.database.windows.net" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Port</label><input type="text" defaultValue="1433" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Database</label><input type="text" placeholder="mydb" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Username</label><input type="text" placeholder="sa" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Password</label>{renderPasswordInput("mssql_password", "Enter password")}</div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Encrypt</label><div className="flex items-center gap-3 h-10"><button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Yes</button><button className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm">No</button></div></div>
                </div>
              )}
              {selectedDbType === "snowflake" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Account</label><input type="text" placeholder="xy12345.us-east-1" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Warehouse</label><input type="text" placeholder="COMPUTE_WH" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Database</label><input type="text" placeholder="MY_DATABASE" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Schema</label><input type="text" placeholder="PUBLIC" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Username</label><input type="text" placeholder="user@company.com" className="w-full h-10 px-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium text-foreground">Password</label>{renderPasswordInput("sf_password", "Enter password")}</div>
                </div>
              )}
              <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground"><Shield className="w-3.5 h-3.5 inline mr-1" />Secrets are stored securely and never exposed client-side.</div>
              <div className="flex gap-3 pt-4 border-t border-border">{renderTestButton("databases")}<button className="h-10 px-6 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors text-sm">Save Connection</button></div>
            </motion.div>
          )}

          {/* Access Policy & Governance */}
          {activeConnector === "policy" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-primary-subtle rounded-xl flex items-center justify-center"><FileCheck className="w-5 h-5 text-primary" /></div>
                <div><h3 className="text-base font-semibold text-foreground">Access Policy & Governance</h3><p className="text-xs text-muted-foreground">Upload governance artifacts for enterprise compliance</p></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your organization's data access policy or information handling policy. This document will appear as a read-only "Usage Policy" link inside published assistants.
              </p>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-foreground font-medium mb-1">Upload Policy Document</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX up to 25MB</p>
              </div>
              <div className="space-y-2">
                {[{ name: "Data Access Policy.pdf", uploaded: "Jan 15, 2025", status: "linked" }, { name: "Information Handling Policy.docx", uploaded: "Feb 1, 2025", status: "linked" }].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-muted-foreground" /><div><div className="text-sm font-medium text-foreground">{doc.name}</div><div className="text-xs text-muted-foreground">Uploaded {doc.uploaded}</div></div></div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-subtle text-primary font-medium">Policy Linked</span>
                      <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground">
                <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                Policy documents are shown as read-only governance artifacts to end users within assistants. They are not used as knowledge sources for AI responses.
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataConnectionsTab;
