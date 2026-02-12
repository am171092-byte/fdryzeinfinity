import { motion } from "framer-motion";
import { TrendingUp, Zap, Clock, CheckCircle, ArrowUpRight } from "lucide-react";

const metrics = [
  { label: "Active Flows", value: "12", change: "+2 this week", icon: Zap, trend: "up" },
  { label: "Executions Today", value: "347", change: "+18% vs yesterday", icon: TrendingUp, trend: "up" },
  { label: "Avg Processing Time", value: "2.4 min", change: "-0.3 min improved", icon: Clock, trend: "up" },
  { label: "Success Rate", value: "98.6%", change: "+0.4% this month", icon: CheckCircle, trend: "up" },
];

const recentActivity = [
  { flow: "Quarterly Report Analysis", action: "Completed document review", time: "2 min ago", status: "success" },
  { flow: "Customer Onboarding", action: "Verification finished", time: "5 min ago", status: "success" },
  { flow: "Compliance Audit Prep", action: "Document collection pending", time: "12 min ago", status: "pending" },
  { flow: "Vendor Risk Assessment", action: "Risk classification complete", time: "18 min ago", status: "success" },
  { flow: "Contract Review Process", action: "Approval routing complete", time: "25 min ago", status: "success" },
];

const Dashboard = () => {
  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-page-title mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of automation performance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card-elevated p-6 h-[120px] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="w-9 h-9 bg-primary-subtle rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {metric.change}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-section-title">Recent Activity</h2>
          <button className="text-sm text-primary hover:text-primary-hover transition-colors">View all</button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-success" : "bg-warning"}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.flow}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
