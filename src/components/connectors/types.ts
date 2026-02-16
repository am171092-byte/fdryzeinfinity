export type ConnectorTypeId = "upload" | "sharepoint" | "google-drive" | "s3";
export type ConnectorStatus = "draft" | "active" | "syncing" | "error";
export type ContentType = "document-library" | "list" | "pages" | null;
export type FilterMode = "include" | "exclude";

export interface SharePointSiteBlock {
  id: string;
  url: string;
  urlValidation: "idle" | "valid" | "invalid";
  recursive: boolean;
  contentType: ContentType;
  selectedFileTypes: string[];
}

export interface ConnectorData {
  id: string;
  name: string;
  type: ConnectorTypeId;
  sourceUrl: string;
  status: ConnectorStatus;
  lastSync: string;
  sourcesSummary: string;
  usedByAssistants: number;
  siteBlocks?: SharePointSiteBlock[];
  contentType?: ContentType;
  filterMode?: FilterMode;
  selectedItems?: string[];
  fileTypeFilterMode?: FilterMode | null;
  selectedFileTypes?: string[];
  collectionName?: string;
  driveContentType?: "folder" | "shared-drive" | null;
  region?: string;
  prefix?: string;
}

export const FILE_TYPES = [
  { id: "pdf", label: "PDF", icon: "📄" },
  { id: "docx", label: "DOC / DOCX", icon: "📝" },
  { id: "pptx", label: "PPT / PPTX", icon: "📊" },
  { id: "xlsx", label: "XLS / XLSX", icon: "📈" },
  { id: "csv", label: "CSV", icon: "📋" },
  { id: "txt", label: "TXT", icon: "📃" },
  { id: "html", label: "HTML", icon: "🌐" },
];

export const CONNECTOR_TYPES = [
  {
    id: "upload" as ConnectorTypeId,
    name: "Upload",
    description: "Upload documents directly from your local machine or shared drives.",
    icon: "Upload",
  },
  {
    id: "sharepoint" as ConnectorTypeId,
    name: "SharePoint",
    description: "Connect to Microsoft SharePoint sites, document libraries, and pages.",
    icon: "Cloud",
  },
  {
    id: "google-drive" as ConnectorTypeId,
    name: "Google Drive",
    description: "Ingest files and folders from Google Drive or Shared Drives.",
    icon: "HardDrive",
  },
  {
    id: "s3" as ConnectorTypeId,
    name: "Amazon S3",
    description: "Connect to AWS S3 buckets and ingest objects by prefix.",
    icon: "Database",
  },
];

export const createEmptySiteBlock = (): SharePointSiteBlock => ({
  id: `site-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  url: "",
  urlValidation: "idle",
  recursive: false,
  contentType: null,
  selectedFileTypes: [],
});
