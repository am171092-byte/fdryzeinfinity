 import { motion } from "framer-motion";
 import { ChevronRight, Upload, Palette, Check } from "lucide-react";
 import { Slider } from "@/components/ui/slider";
 
 interface CustomizeStepProps {
   tone: "formal" | "neutral" | "friendly";
   setTone: (tone: "formal" | "neutral" | "friendly") => void;
   responseLength: number[];
   setResponseLength: (value: number[]) => void;
   riskSensitivity: number[];
   setRiskSensitivity: (value: number[]) => void;
   themeColor: string;
   setThemeColor: (color: string) => void;
   assistantName: string;
   setAssistantName: (name: string) => void;
   onContinue: () => void;
   onBack: () => void;
 }
 
 const themeColors = [
   { id: "purple", value: "#6D28D9", label: "Purple" },
   { id: "blue", value: "#2563EB", label: "Blue" },
   { id: "green", value: "#16A34A", label: "Green" },
   { id: "orange", value: "#EA580C", label: "Orange" },
   { id: "pink", value: "#DB2777", label: "Pink" },
   { id: "teal", value: "#0D9488", label: "Teal" },
 ];
 
 const CustomizeStep = ({
   tone,
   setTone,
   responseLength,
   setResponseLength,
   riskSensitivity,
   setRiskSensitivity,
   themeColor,
   setThemeColor,
   assistantName,
   setAssistantName,
   onContinue,
   onBack,
 }: CustomizeStepProps) => {
   const getLengthLabel = (value: number) => {
     if (value < 33) return "Short";
     if (value < 66) return "Standard";
     return "Detailed";
   };
 
   const getSensitivityLabel = (value: number) => {
     if (value < 33) return "Conservative";
     if (value < 66) return "Balanced";
     return "Aggressive";
   };
 
   return (
     <div className="w-full max-w-[960px]">
       <div className="card-float overflow-hidden">
         <div className="grid grid-cols-1 lg:grid-cols-2">
           {/* Controls */}
           <div className="p-8 border-r border-border">
             <h2 className="text-section-title mb-6">Customize Assistant</h2>
 
             {/* Assistant Name */}
             <div className="mb-8">
               <label className="text-sm font-medium text-foreground mb-3 block">
                 Assistant Name
               </label>
               <input
                 type="text"
                 value={assistantName}
                 onChange={(e) => setAssistantName(e.target.value)}
                 placeholder="e.g., Policy Assistant"
                 className="w-full h-11 px-4 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
               />
             </div>
 
             {/* Theme Color */}
             <div className="mb-8">
               <label className="text-sm font-medium text-foreground mb-3 block">
                 <Palette className="w-4 h-4 inline mr-2" />
                 Theme Color
               </label>
               <div className="flex gap-3">
                 {themeColors.map((color) => (
                   <button
                     key={color.id}
                     onClick={() => setThemeColor(color.value)}
                     className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                       themeColor === color.value
                         ? "ring-2 ring-offset-2 ring-foreground scale-110"
                         : "hover:scale-105"
                     }`}
                     style={{ backgroundColor: color.value }}
                     title={color.label}
                   >
                     {themeColor === color.value && (
                       <Check className="w-4 h-4 text-white" />
                     )}
                   </button>
                 ))}
               </div>
             </div>
 
             {/* Logo Upload */}
             <div className="mb-8">
               <label className="text-sm font-medium text-foreground mb-3 block">
                 Assistant Logo
               </label>
               <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                 <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                 <p className="text-sm text-muted-foreground">
                   Click to upload or drag and drop
                 </p>
                 <p className="text-xs text-muted-foreground mt-1">
                   PNG, JPG up to 2MB
                 </p>
               </div>
             </div>
 
             {/* Tone Selection */}
             <div className="mb-8">
               <label className="text-sm font-medium text-foreground mb-3 block">
                 Response Tone
               </label>
               <div className="flex gap-2">
                 {(["formal", "neutral", "friendly"] as const).map((t) => (
                   <button
                     key={t}
                     onClick={() => setTone(t)}
                     className={`flex-1 h-10 rounded-lg text-sm font-medium capitalize transition-all ${
                       tone === t
                         ? "bg-primary text-primary-foreground shadow-md"
                         : "bg-secondary text-foreground hover:bg-muted"
                     }`}
                   >
                     {t}
                   </button>
                 ))}
               </div>
             </div>
 
             {/* Response Length */}
             <div className="mb-8">
               <div className="flex items-center justify-between mb-3">
                 <label className="text-sm font-medium text-foreground">
                   Response Length
                 </label>
                 <span className="text-xs text-primary font-medium">
                   {getLengthLabel(responseLength[0])}
                 </span>
               </div>
               <Slider
                 value={responseLength}
                 onValueChange={setResponseLength}
                 max={100}
                 step={1}
                 className="w-full"
               />
               <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                 <span>Short</span>
                 <span>Standard</span>
                 <span>Detailed</span>
               </div>
             </div>
 
             {/* Risk Sensitivity */}
             <div className="mb-8">
               <div className="flex items-center justify-between mb-3">
                 <label className="text-sm font-medium text-foreground">
                   Analysis Depth
                 </label>
                 <span className="text-xs text-primary font-medium">
                   {getSensitivityLabel(riskSensitivity[0])}
                 </span>
               </div>
               <Slider
                 value={riskSensitivity}
                 onValueChange={setRiskSensitivity}
                 max={100}
                 step={1}
                 className="w-full"
               />
               <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                 <span>Conservative</span>
                 <span>Balanced</span>
                 <span>Aggressive</span>
               </div>
             </div>
 
             <div className="flex gap-3 pt-4 border-t border-border">
               <button
                 onClick={onBack}
                 className="h-11 px-5 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-muted transition-colors"
               >
                 Back
               </button>
               <motion.button
                 onClick={onContinue}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="flex-1 h-11 px-6 rounded-xl font-medium text-sm bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all"
               >
                 Continue to Test
                 <ChevronRight className="w-4 h-4" />
               </motion.button>
             </div>
           </div>
 
           {/* Preview */}
           <div className="p-8 bg-gradient-to-br from-secondary/50 to-secondary">
             <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
               Live Preview
             </h3>
             <div className="card-elevated p-5">
               <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                 <div
                   className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                   style={{ backgroundColor: themeColor }}
                 >
                   {assistantName.charAt(0) || "A"}
                 </div>
                 <div>
                   <div className="text-sm font-medium text-foreground">
                     {assistantName || "Your Assistant"}
                   </div>
                   <div className="text-xs text-muted-foreground capitalize">
                     {tone} tone
                   </div>
                 </div>
               </div>
               <div className="text-xs text-muted-foreground mb-3">
                 Example Response
               </div>
               <p className="text-sm text-foreground leading-relaxed mb-4">
                 {tone === "formal" &&
                   "Based on the submitted documentation, the analysis indicates the requested information is within acceptable parameters. Please review the detailed breakdown below."}
                 {tone === "neutral" &&
                   "Looking at the data, here's what we found. The analysis takes into account the relevant context and historical patterns."}
                 {tone === "friendly" &&
                   "Great question! After reviewing everything, here's a clear summary. The key takeaways are highlighted for easy reference."}
               </p>
               <div className="flex items-center gap-4 pt-3 border-t border-border">
                 <div className="flex items-center gap-2">
                   <div
                     className="w-2 h-2 rounded-full"
                     style={{ backgroundColor: themeColor }}
                   />
                   <span className="text-xs text-muted-foreground">
                     {getLengthLabel(responseLength[0])} format
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default CustomizeStep;