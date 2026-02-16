import { Plus, Shield } from "lucide-react";
import { SharePointSiteBlock, createEmptySiteBlock } from "./types";
import SharePointSiteBlockComponent from "./SharePointSiteBlock";

interface SharePointPropertiesProps {
  siteBlocks: SharePointSiteBlock[];
  onSiteBlocksChange: (blocks: SharePointSiteBlock[]) => void;
}

const SharePointProperties = ({ siteBlocks, onSiteBlocksChange }: SharePointPropertiesProps) => {
  const updateBlock = (index: number, block: SharePointSiteBlock) => {
    const next = [...siteBlocks];
    next[index] = block;
    onSiteBlocksChange(next);
  };

  const removeBlock = (index: number) => {
    onSiteBlocksChange(siteBlocks.filter((_, i) => i !== index));
  };

  const addBlock = () => {
    onSiteBlocksChange([...siteBlocks, createEmptySiteBlock()]);
  };

  return (
    <div className="space-y-4">
      {siteBlocks.map((block, i) => (
        <SharePointSiteBlockComponent
          key={block.id}
          block={block}
          onChange={(b) => updateBlock(i, b)}
          onRemove={() => removeBlock(i)}
          canRemove={siteBlocks.length > 1}
          index={i}
        />
      ))}

      <button
        type="button"
        onClick={addBlock}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
      >
        <Plus className="w-4 h-4" /> Add another Site URL
      </button>

      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
        <Shield className="w-4 h-4 shrink-0" />
        Credentials are pre-configured by your administrator. No secrets are shown.
      </div>
    </div>
  );
};

export default SharePointProperties;
