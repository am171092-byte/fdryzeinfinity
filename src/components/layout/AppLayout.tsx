import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-canvas-secondary flex flex-col">
      <AppSidebar />
      <AppHeader />
      <main className="ml-[260px] mt-14 flex-1 min-h-0">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;
