import { Outlet } from "react-router";
import Navbar from "@/components/ui/navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
