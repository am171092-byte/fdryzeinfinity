import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

interface QueryResponse {
  id: string;
  query: string;
  summary: string;
  explanation: string;
  confidence: number;
}

const sampleResponses: QueryResponse[] = [
  {
    id: "1",
    query: "What is the average premium for commercial property policies in California?",
    summary: "The average annual premium for commercial property insurance in California is $4,850, with variations based on property value, location risk zone, and coverage limits.",
    explanation: "This figure is calculated from 2,847 policies processed through your Commercial Property Assessment workflow in the last 12 months. Properties in high-risk zones (earthquake, wildfire) average 23% higher premiums. The median policy covers $2.5M in property value with $1M liability limits.",
    confidence: 94,
  },
];

const QueryAssistant = () => {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<QueryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate API response
    setTimeout(() => {
      const newResponse: QueryResponse = {
        id: Date.now().toString(),
        query: query,
        summary: "Based on your underwriting data, the average claim-to-premium ratio for this segment is 62%, which is within acceptable risk parameters for your portfolio.",
        explanation: "This analysis draws from 1,234 active policies and 156 claims processed in the last quarter. Key factors include: geographic distribution (45% coastal), average policy age (3.2 years), and loss history trending 8% below industry benchmarks. Recommend maintaining current underwriting guidelines with quarterly review.",
        confidence: 87,
      };
      setResponses([newResponse, ...responses]);
      setQuery("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-2xl"
      >
        <h1 className="text-page-title mb-2">Query Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about your underwriting data and get AI-powered insights
        </p>
      </motion.div>

      {/* Query Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-[960px] card-float p-8 mb-8"
      >
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
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-primary-hover disabled:bg-muted text-primary-foreground disabled:text-muted-foreground rounded-lg flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Example Queries */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {[
            "What's the success rate for auto policy renewals?",
            "Show risk distribution by region",
            "Average processing time this month",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setQuery(example)}
              className="text-xs text-primary hover:text-primary-hover transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-[960px] card-elevated p-6 mb-6"
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
      <div className="w-full max-w-[960px] space-y-6">
        {[...responses, ...sampleResponses].map((response, index) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6"
          >
            {/* Query */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-muted-foreground">SM</span>
              </div>
              <p className="text-sm text-foreground pt-1">{response.query}</p>
            </div>

            {/* Response */}
            <div className="space-y-4">
              {/* Summary */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Summary
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {response.summary}
                </p>
              </div>

              {/* Explanation */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Explanation
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {response.explanation}
                </p>
              </div>

              {/* Confidence */}
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
    </div>
  );
};

export default QueryAssistant;
