import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-canvas-secondary">
      <AppSidebar />
      <main className="ml-[260px] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
