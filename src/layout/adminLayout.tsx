import { Outlet } from "react-router";
import Navbar from "@/components/ui/navbar";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <h1>Admin</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
