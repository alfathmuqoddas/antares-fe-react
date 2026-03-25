import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <>
      <section className="container mx-auto px-8 py-8">
        <Outlet />
      </section>
    </>
  );
};

export default PublicLayout;
