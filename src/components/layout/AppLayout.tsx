import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useSidebarCollapse } from "@/contexts/SidebarContext";

const AppLayout = () => {
  const { collapsed } = useSidebarCollapse();
  const sidebarWidth = collapsed ? "68px" : "260px";

  return (
    <div className="min-h-screen bg-canvas-secondary flex flex-col">
      <AppSidebar />
      <AppHeader />
      <main
        className="mt-14 flex-1 min-h-0 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
