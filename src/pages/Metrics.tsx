import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const executionsData = [
  { date: "Jan 1", executions: 245 },
  { date: "Jan 2", executions: 312 },
  { date: "Jan 3", executions: 289 },
  { date: "Jan 4", executions: 356 },
  { date: "Jan 5", executions: 398 },
  { date: "Jan 6", executions: 287 },
  { date: "Jan 7", executions: 347 },
];

const successFailureData = [
  { name: "Commercial Property", success: 98, failure: 2 },
  { name: "Auto Policy", success: 99, failure: 1 },
  { name: "Life Insurance", success: 96, failure: 4 },
  { name: "Workers Comp", success: 97, failure: 3 },
  { name: "Marine Cargo", success: 95, failure: 5 },
];

const processingTimeData = [
  { name: "Commercial Property", time: 3.2 },
  { name: "Auto Policy", time: 1.8 },
  { name: "Life Insurance", time: 4.5 },
  { name: "Workers Comp", time: 2.1 },
  { name: "Marine Cargo", time: 5.3 },
  { name: "Professional Liability", time: 3.8 },
];

const distributionData = [
  { name: "Commercial", value: 35, color: "#6D28D9" },
  { name: "Personal", value: 28, color: "#8B5CF6" },
  { name: "Specialty", value: 22, color: "#A78BFA" },
  { name: "Healthcare", value: 15, color: "#C4B5FD" },
];

const Metrics = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-page-title mb-2">Performance & Metrics</h1>
        <p className="text-muted-foreground">
          Track and analyze your underwriting workflow performance
        </p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Executions Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-6"
        >
          <h3 className="text-section-title mb-6">Executions Over Time</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={executionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(240 6% 52%)" }}
                  axisLine={{ stroke: "hsl(240 6% 90%)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(240 6% 52%)" }}
                  axisLine={{ stroke: "hsl(240 6% 90%)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(240 6% 90%)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="executions"
                  stroke="#6D28D9"
                  strokeWidth={2}
                  dot={{ fill: "#6D28D9", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#6D28D9" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Success vs Failure Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-elevated p-6"
        >
          <h3 className="text-section-title mb-6">Success vs Failure Rate</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successFailureData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "hsl(240 6% 52%)" }}
                  axisLine={{ stroke: "hsl(240 6% 90%)" }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "hsl(240 6% 52%)" }}
                  axisLine={{ stroke: "hsl(240 6% 90%)" }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(240 6% 90%)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                />
                <Bar dataKey="success" stackId="a" fill="#16A34A" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failure" stackId="a" fill="#DC2626" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Avg Processing Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated p-6"
        >
          <h3 className="text-section-title mb-6">Avg Processing Time (minutes)</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 6% 90%)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(240 6% 52%)" }}
                  axisLine={{ stroke: "hsl(240 6% 90%)" }}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(240 6% 52%)" }}
                  axisLine={{ stroke: "hsl(240 6% 90%)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(240 6% 90%)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                />
                <Bar dataKey="time" fill="#6D28D9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Policy Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated p-6"
        >
          <h3 className="text-section-title mb-6">Policy Type Distribution</h3>
          <div className="h-[280px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(240 6% 90%)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  }}
                />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Metrics;
