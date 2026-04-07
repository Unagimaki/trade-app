import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
