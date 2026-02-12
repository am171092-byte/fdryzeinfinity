import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, Clock, CheckCircle, Zap, Users, Brain, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const executionsData = [
  { date: "Jan 1", executions: 245 }, { date: "Jan 2", executions: 312 }, { date: "Jan 3", executions: 289 },
  { date: "Jan 4", executions: 356 }, { date: "Jan 5", executions: 398 }, { date: "Jan 6", executions: 287 }, { date: "Jan 7", executions: 347 },
];

const flowPerformanceData = [
  { name: "Report Analysis", executions: 847, success: 98.2, time: 3.2 },
  { name: "Customer Onboarding", executions: 1234, success: 99.1, time: 1.8 },
  { name: "Compliance Audit", executions: 456, success: 96.5, time: 4.5 },
  { name: "Vendor Assessment", executions: 678, success: 97.8, time: 2.1 },
  { name: "Contract Review", executions: 234, success: 95.4, time: 5.3 },
];

const agentPerformanceData = [
  { name: "Document Review Agent", model: "GPT-4.1", latency: "1.2s", accuracy: "98.4%", calls: 2341 },
  { name: "Classification Agent", model: "Claude Opus", latency: "2.1s", accuracy: "97.8%", calls: 1876 },
  { name: "Calculation Agent", model: "GPT-4.1 Mini", latency: "0.8s", accuracy: "99.2%", calls: 1654 },
  { name: "Anomaly Detection Agent", model: "GPT-4.1", latency: "1.8s", accuracy: "96.5%", calls: 1432 },
];

const successFailureData = [
  { name: "Report Analysis", success: 98, failure: 2 }, { name: "Onboarding", success: 99, failure: 1 },
  { name: "Compliance", success: 96, failure: 4 }, { name: "Vendor Risk", success: 97, failure: 3 }, { name: "Contract Review", success: 95, failure: 5 },
];

const distributionData = [
  { name: "Finance", value: 35, color: "#6D28D9" }, { name: "Operations", value: 28, color: "#8B5CF6" },
  { name: "Risk & Compliance", value: 22, color: "#A78BFA" }, { name: "Support", value: 15, color: "#C4B5FD" },
];

const businessImpactMetrics = [
  { label: "Manual Effort Reduced", value: "68%", change: "+12%", trend: "up", icon: Users, description: "vs. previous quarter" },
  { label: "Avg Processing Time Saved", value: "4.2 hrs", change: "+18%", trend: "up", icon: Clock, description: "per workflow" },
  { label: "Decision Consistency", value: "94.7%", change: "+5.2%", trend: "up", icon: CheckCircle, description: "across all flows" },
  { label: "Cost per Decision", value: "$2.34", change: "-23%", trend: "down", icon: Zap, description: "fully loaded cost" },
];

const Metrics = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-background via-background to-primary/[0.02] min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-page-title mb-2">Performance & Metrics</h1>
        <p className="text-muted-foreground">Track and analyze your workflow performance</p>
      </motion.div>

      {/* Business Impact */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="flex items-center gap-2 mb-5"><TrendingUp className="w-5 h-5 text-primary" /><h2 className="text-section-title">Business Impact</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {businessImpactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} whileHover={{ scale: 1.02, y: -4 }} className="card-float p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${metric.trend === "up" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                    {metric.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{metric.change}
                  </div>
                </div>
                <div className="text-2xl font-semibold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground/70">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Flow Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
        <div className="flex items-center gap-2 mb-5"><Zap className="w-5 h-5 text-primary" /><h2 className="text-section-title">Flow Performance</h2></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.01 }} className="card-float p-6 lg:col-span-2">
            <h3 className="text-sm font-medium text-foreground mb-4">Executions Over Time</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={executionsData}>
                  <defs><linearGradient id="executionGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6D28D9" stopOpacity={0.2}/><stop offset="95%" stopColor="#6D28D9" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(240 6% 52%)" }} axisLine={{ stroke: "hsl(240 6% 90%)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(240 6% 52%)" }} axisLine={{ stroke: "hsl(240 6% 90%)" }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(240 6% 90%)", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }} />
                  <Area type="monotone" dataKey="executions" stroke="#6D28D9" strokeWidth={2} fill="url(#executionGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.01 }} className="card-float p-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Department Distribution</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={distributionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">{distributionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(240 6% 90%)", borderRadius: "12px" }} /><Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} /></PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.005 }} className="card-float p-6 mt-6">
          <h3 className="text-sm font-medium text-foreground mb-4">Flow Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full"><thead><tr className="border-b border-border"><th className="text-left text-table-header py-3 pr-4">Flow Name</th><th className="text-right text-table-header py-3 px-4">Executions</th><th className="text-right text-table-header py-3 px-4">Success Rate</th><th className="text-right text-table-header py-3 pl-4">Avg Time</th></tr></thead>
              <tbody>{flowPerformanceData.map((flow, index) => (<motion.tr key={flow.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.05 }} className="border-b border-border/50 hover:bg-muted/50 transition-colors"><td className="py-4 pr-4"><span className="text-sm font-medium text-foreground">{flow.name}</span></td><td className="text-right py-4 px-4"><span className="text-sm text-foreground">{flow.executions.toLocaleString()}</span></td><td className="text-right py-4 px-4"><span className={`text-sm font-medium ${flow.success >= 98 ? 'text-success' : flow.success >= 96 ? 'text-warning' : 'text-error'}`}>{flow.success}%</span></td><td className="text-right py-4 pl-4"><span className="text-sm text-muted-foreground">{flow.time} min</span></td></motion.tr>))}</tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Agent Performance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
        <div className="flex items-center gap-2 mb-5"><Brain className="w-5 h-5 text-primary" /><h2 className="text-section-title">Agent Performance</h2></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div whileHover={{ scale: 1.01 }} className="card-float p-6">
            <h3 className="text-sm font-medium text-foreground mb-4">Success vs Exception Rate</h3>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={successFailureData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(240 6% 52%)" }} axisLine={{ stroke: "hsl(240 6% 90%)" }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(240 6% 52%)" }} axisLine={{ stroke: "hsl(240 6% 90%)" }} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(240 6% 90%)", borderRadius: "12px" }} />
                  <Bar dataKey="success" stackId="a" fill="#16A34A" radius={[0, 0, 0, 0]} name="Success" />
                  <Bar dataKey="failure" stackId="a" fill="#DC2626" radius={[0, 4, 4, 0]} name="Exception" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          <div className="space-y-3">
            {agentPerformanceData.map((agent, index) => (
              <motion.div key={agent.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + index * 0.05 }} whileHover={{ scale: 1.02, x: 4 }} className="card-elevated p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/15 to-primary/5 rounded-xl flex items-center justify-center"><Brain className="w-5 h-5 text-primary" /></div>
                  <div><div className="text-sm font-medium text-foreground">{agent.name}</div><div className="text-xs text-muted-foreground">{agent.model}</div></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right"><div className="text-xs text-muted-foreground">Latency</div><div className="text-sm font-medium text-foreground">{agent.latency}</div></div>
                  <div className="text-right"><div className="text-xs text-muted-foreground">Accuracy</div><div className="text-sm font-medium text-success">{agent.accuracy}</div></div>
                  <div className="text-right"><div className="text-xs text-muted-foreground">Calls</div><div className="text-sm font-medium text-foreground">{agent.calls.toLocaleString()}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Metrics;
