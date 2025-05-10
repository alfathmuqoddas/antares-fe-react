import { Outlet } from "react-router";
import Navbar from "@/components/ui/navbar";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
