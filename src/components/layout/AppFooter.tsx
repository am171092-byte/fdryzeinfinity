import { useSidebarCollapse } from "@/contexts/SidebarContext";

const AppFooter = () => {
  const { collapsed } = useSidebarCollapse();

  return (
    <footer
      className="h-10 bg-card border-t border-border flex items-center justify-between px-6 text-xs text-muted-foreground transition-all duration-300"
      style={{ marginLeft: collapsed ? "68px" : "260px" }}
    >
      <span>© 2025 FDRYZE INFINITY. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <button className="hover:text-foreground transition-colors">Privacy Policy</button>
        <button className="hover:text-foreground transition-colors">Terms of Service</button>
      </div>
    </footer>
  );
};

export default AppFooter;
