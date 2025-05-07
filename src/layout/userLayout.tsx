import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div>
      <h1>User</h1>
      <Outlet />
    </div>
  );
};

export default UserLayout;
