import { motion } from "framer-motion";
import { Upload, Cloud, HardDrive, Database, ArrowLeft } from "lucide-react";
import { ConnectorTypeId, CONNECTOR_TYPES } from "./types";

const iconMap: Record<string, React.ElementType> = {
  Upload, Cloud, HardDrive, Database,
};

interface ConnectorTypeStepProps {
  onSelect: (type: ConnectorTypeId) => void;
  onBack: () => void;
}

const ConnectorTypeStep = ({ onSelect, onBack }: ConnectorTypeStepProps) => {
  return (
    <div className="w-full max-w-[700px]">
      <div className="mb-6">
        <h2 className="text-section-title mb-1">Choose Connector Type</h2>
        <p className="text-sm text-muted-foreground">Select the type of data source you want to connect.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {CONNECTOR_TYPES.map((ct, index) => {
          const Icon = iconMap[ct.icon];
          return (
            <motion.button
              key={ct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(ct.id)}
              className="card-elevated p-6 text-left group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {ct.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{ct.description}</p>
            </motion.button>
          );
        })}
      </div>

      <button onClick={onBack} className="h-10 px-5 bg-secondary hover:bg-muted text-foreground font-medium rounded-xl flex items-center gap-2 transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </div>
  );
};

export default ConnectorTypeStep;
