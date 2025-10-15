import { Header } from "@/widgets/header";
import { Outlet, useLocation } from "react-router-dom";

export const BaseLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/"; // лендинг на корне

  if (isLanding) {
    // Лендинг занимает весь экран, без контейнера
    return (
      <div className="min-h-screen w-full overflow-hidden bg-black">
        <Outlet />
      </div>
    );
  }

  // Обычная структура для остальных страниц
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};
