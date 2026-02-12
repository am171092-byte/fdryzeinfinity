import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Clock,
  BarChart3,
  MessageSquare,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface AssistantDashboardProps {
  assistantName: string;
  themeColor: string;
  onBack: () => void;
}

const queriesOverTime = [
  { date: "Mon", queries: 145 },
  { date: "Tue", queries: 198 },
  { date: "Wed", queries: 234 },
  { date: "Thu", queries: 189 },
  { date: "Fri", queries: 267 },
  { date: "Sat", queries: 87 },
  { date: "Sun", queries: 56 },
];

const confidenceDistribution = [
  { name: "High (>80%)", value: 68, color: "#16A34A" },
  { name: "Medium (60-80%)", value: 24, color: "#EAB308" },
  { name: "Low (<60%)", value: 8, color: "#DC2626" },
];

const topTopics = [
  { topic: "Document Summaries", count: 342, pct: 29 },
  { topic: "Compliance Queries", count: 267, pct: 23 },
  { topic: "Risk Analysis", count: 198, pct: 17 },
  { topic: "Policy Lookup", count: 178, pct: 15 },
  { topic: "General Questions", count: 191, pct: 16 },
];

const AssistantDashboard = ({ assistantName, themeColor, onBack }: AssistantDashboardProps) => {
  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-secondary hover:bg-muted flex items-center justify-center transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-page-title">Assistant Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{assistantName}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Queries Today", value: "1,176", change: "+14.2%", icon: MessageSquare },
          { label: "Avg Response Time", value: "340ms", change: "-12ms", icon: Clock },
          { label: "Avg Confidence", value: "87.3%", change: "+2.1%", icon: TrendingUp },
          { label: "Escalation Rate", value: "4.2%", change: "-0.8%", icon: AlertTriangle },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card-elevated p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <div className="w-9 h-9 bg-primary-subtle rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Queries Over Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-float p-6 lg:col-span-2">
          <h3 className="text-sm font-medium text-foreground mb-4">Queries Over Time</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={queriesOverTime}>
                <defs>
                  <linearGradient id="queryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColor} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(240 6% 52%)" }} axisLine={{ stroke: "hsl(240 6% 90%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(240 6% 52%)" }} axisLine={{ stroke: "hsl(240 6% 90%)" }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(240 6% 90%)", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }} />
                <Area type="monotone" dataKey="queries" stroke={themeColor} strokeWidth={2} fill="url(#queryGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Confidence Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-float p-6">
          <h3 className="text-sm font-medium text-foreground mb-4">Confidence Distribution</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={confidenceDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {confidenceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(240 6% 90%)", borderRadius: "12px" }} />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Topics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-float p-6">
        <h3 className="text-sm font-medium text-foreground mb-4">Top Query Topics</h3>
        <div className="space-y-3">
          {topTopics.map((topic) => (
            <div key={topic.topic} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-44">{topic.topic}</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${topic.pct}%`, backgroundColor: themeColor }} />
              </div>
              <span className="text-xs text-muted-foreground w-24 text-right">{topic.count} ({topic.pct}%)</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AssistantDashboard;
