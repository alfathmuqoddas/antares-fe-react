import { Outlet } from "react-router";
import Navbar from "@/components/ui/navbar";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className=" min-h-[calc(100vh-124px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
