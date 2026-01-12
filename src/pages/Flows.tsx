import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Plus, Clock, CheckCircle, ArrowRight } from "lucide-react";

const flowsData = [
  {
    id: "1",
    name: "Commercial Property Assessment",
    description: "Evaluates commercial property insurance applications with risk scoring",
    status: "active",
    avgTime: "3.2 min",
    successRate: "99.1%",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "Auto Policy Renewal Processing",
    description: "Automates renewal decisions for personal auto insurance policies",
    status: "active",
    avgTime: "1.8 min",
    successRate: "98.7%",
    lastUpdated: "5 hours ago",
  },
  {
    id: "3",
    name: "Life Insurance Intake Workflow",
    description: "Handles initial application intake and document verification",
    status: "pending",
    avgTime: "4.5 min",
    successRate: "97.2%",
    lastUpdated: "1 day ago",
  },
  {
    id: "4",
    name: "Workers Compensation Analysis",
    description: "Assesses workers comp claims for classification and premium calculation",
    status: "active",
    avgTime: "2.1 min",
    successRate: "98.9%",
    lastUpdated: "3 hours ago",
  },
  {
    id: "5",
    name: "Marine Cargo Risk Evaluation",
    description: "Evaluates marine cargo insurance with specialized risk models",
    status: "active",
    avgTime: "5.3 min",
    successRate: "96.8%",
    lastUpdated: "6 hours ago",
  },
  {
    id: "6",
    name: "Professional Liability Assessment",
    description: "Underwriting workflow for E&O and professional liability coverage",
    status: "active",
    avgTime: "3.8 min",
    successRate: "97.5%",
    lastUpdated: "12 hours ago",
  },
];

const Flows = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFlows = flowsData.filter(
    (flow) =>
      flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-page-title mb-2">My Business Flows</h1>
        <p className="text-muted-foreground">
          Manage and monitor your underwriting automation workflows
        </p>
      </motion.div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-float p-6"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search flows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <button
            onClick={() => navigate("/flows/new")}
            className="h-10 px-4 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Flow
          </button>
        </div>

        {/* Flow List */}
        <div className="space-y-3">
          {filteredFlows.map((flow, index) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/flows/${flow.id}`)}
              className="group flex items-center gap-6 p-5 bg-background rounded-card border border-transparent hover:border-border hover:bg-muted/50 cursor-pointer transition-all"
            >
              {/* Flow Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {flow.name}
                  </h3>
                  <span
                    className={`status-pill ${
                      flow.status === "active" ? "status-active" : "status-pending"
                    }`}
                  >
                    {flow.status === "active" ? "Active" : "Pending"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {flow.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{flow.avgTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4" />
                  <span>{flow.successRate}</span>
                </div>
                <div className="w-24 text-right text-muted-foreground">
                  {flow.lastUpdated}
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Flows;
