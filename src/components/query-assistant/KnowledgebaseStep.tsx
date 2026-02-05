 import { motion } from "framer-motion";
 import {
   Upload,
   FileText,
   Database,
   HardDrive,
   Cloud,
   Check,
   ChevronRight,
   Settings,
   RefreshCw,
 } from "lucide-react";
 
 interface KnowledgeSource {
   id: string;
   name: string;
   type: string;
   description: string;
   icon: React.ElementType;
   path: string;
   lastSynced: string;
   connected: boolean;
   selected: boolean;
 }
 
 interface KnowledgebaseStepProps {
   sources: KnowledgeSource[];
   onToggleSource: (id: string) => void;
   onContinue: () => void;
   onBack: () => void;
 }
 
 const KnowledgebaseStep = ({
   sources,
   onToggleSource,
   onContinue,
   onBack,
 }: KnowledgebaseStepProps) => {
   const selectedCount = sources.filter((s) => s.selected).length;
   const canProceed = selectedCount > 0;
 
   return (
     <div className="w-full max-w-[1100px]">
       <div className="card-float overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-3">
           {/* Left Column - Available Sources */}
           <div className="lg:col-span-2 p-8 border-r border-border">
             <div className="mb-6">
               <h2 className="text-section-title mb-2">Create your Knowledgebase</h2>
               <p className="text-muted-foreground text-sm">
                 Choose the information your assistant can reference. These sources are managed by your admin in Settings.
               </p>
             </div>
 
             <div className="space-y-3">
               {sources.map((source) => {
                 const Icon = source.icon;
                 return (
                   <motion.button
                     key={source.id}
                     onClick={() => onToggleSource(source.id)}
                     whileHover={{ scale: 1.01 }}
                     whileTap={{ scale: 0.99 }}
                     className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                       source.selected
                         ? "bg-primary-subtle border-primary shadow-md"
                         : "bg-secondary border-transparent hover:border-border hover:shadow-sm"
                     }`}
                   >
                     <div className="flex items-center gap-4">
                       <div
                         className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                           source.selected ? "bg-primary/10" : "bg-card"
                         }`}
                       >
                         <Icon
                           className={`w-6 h-6 ${
                             source.selected ? "text-primary" : "text-muted-foreground"
                           }`}
                         />
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                           <h3 className="text-sm font-medium text-foreground">
                             {source.name}
                           </h3>
                           <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                             {source.type}
                           </span>
                         </div>
                         <p className="text-xs text-muted-foreground mb-1">
                           {source.path}
                         </p>
                         <div className="flex items-center gap-3 text-xs text-muted-foreground">
                           <div className="flex items-center gap-1">
                             <RefreshCw className="w-3 h-3" />
                             Synced {source.lastSynced}
                           </div>
                           <div className="flex items-center gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-success" />
                             Connected
                           </div>
                         </div>
                       </div>
                       <div
                         className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                           source.selected ? "bg-primary text-primary-foreground" : "bg-border"
                         }`}
                       >
                         {source.selected && <Check className="w-4 h-4" />}
                       </div>
                     </div>
                   </motion.button>
                 );
               })}
             </div>
 
             <a
               href="/settings?tab=connections"
               className="inline-flex items-center gap-2 mt-6 text-sm text-primary hover:text-primary-hover transition-colors"
             >
               <Settings className="w-4 h-4" />
               Manage sources in Settings
             </a>
           </div>
 
           {/* Right Column - Knowledgebase Summary */}
           <div className="p-8 bg-gradient-to-br from-secondary/50 to-secondary sticky top-0">
             <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
               Knowledgebase Summary
             </h3>
 
             <div className="card-elevated p-5 mb-6">
               <div className="text-4xl font-bold text-foreground mb-1">
                 {selectedCount}
               </div>
               <div className="text-sm text-muted-foreground">
                 source{selectedCount !== 1 ? "s" : ""} selected
               </div>
             </div>
 
             {selectedCount > 0 && (
               <div className="mb-6">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-xs text-muted-foreground">Estimated Coverage</span>
                   <span className="text-xs font-medium text-primary">
                     {Math.min(selectedCount * 25, 95)}%
                   </span>
                 </div>
                 <div className="h-2 bg-muted rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${Math.min(selectedCount * 25, 95)}%` }}
                     className="h-full bg-primary rounded-full"
                   />
                 </div>
               </div>
             )}
 
             <div className="space-y-2 mb-8">
               {sources
                 .filter((s) => s.selected)
                 .map((source) => (
                   <div
                     key={source.id}
                     className="flex items-center gap-2 text-sm text-foreground"
                   >
                     <Check className="w-4 h-4 text-success" />
                     {source.name}
                   </div>
                 ))}
             </div>
 
             <div className="space-y-3">
               <motion.button
                 onClick={onContinue}
                 disabled={!canProceed}
                 whileHover={canProceed ? { scale: 1.02 } : {}}
                 whileTap={canProceed ? { scale: 0.98 } : {}}
                 className={`w-full h-11 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                   canProceed
                     ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25"
                     : "bg-muted text-muted-foreground cursor-not-allowed"
                 }`}
               >
                 Continue
                 <ChevronRight className="w-4 h-4" />
               </motion.button>
               <button
                 onClick={onBack}
                 className="w-full h-11 rounded-xl font-medium text-sm bg-card text-foreground hover:bg-muted transition-colors"
               >
                 Cancel
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default KnowledgebaseStep;