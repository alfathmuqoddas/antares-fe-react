import { Outlet } from "react-router";
import SkeuoNavbar from "@/components/ui/navbar";

const AdminLayout = () => {
  return (
    <div>
      <SkeuoNavbar />
      <h1>Admin</h1>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
