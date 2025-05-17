// src/components/Navbar.jsx
import { Link, useLocation } from "react-router";
import useAuth from "@/store/useAuth";
import NavLinkItem from "./navLinkItem";
import {
  Clapperboard,
  Popcorn,
  SquareActivity,
  FileVideo,
  FileVideo2,
} from "lucide-react";
import AvatarAuth from "./avatarAuth";
import MobileMenu from "./mobileMenu";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { roles } = user?.additionalInfo || {};

  const navMenus = [
    { name: "Movies", to: "/movies", icon: <Clapperboard size={16} /> },
    { name: "Theaters", to: "/cinema", icon: <Popcorn size={16} /> },
  ];

  const adminMenus = [
    { name: "Dashboard", to: "/admin", icon: <SquareActivity size={16} /> },
    {
      name: "Manage Theaters",
      to: "/admin/theaters",
      icon: <FileVideo2 size={16} />,
    },
    {
      name: "Manage Movies",
      to: "/admin/movies",
      icon: <FileVideo size={16} />,
    },
  ];

  if (roles?.includes("admin")) {
    navMenus.push(...adminMenus);
  }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10">
          <div className="md:hidden">
            <MobileMenu navMenus={navMenus} />
          </div>

          {/* Left Section: Logo and Menu Items */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-primary-dark hover:text-primary-main transition-colors"
            >
              Antares
            </Link>
            <div className="hidden md:ml-6 md:flex md:gap-4">
              {navMenus.map((menu, index) => (
                <NavLinkItem
                  key={index}
                  to={menu.to}
                  isActive={location.pathname === menu.to}
                >
                  <div className="flex items-center gap-1">
                    <div>{menu.icon}</div>
                    <p>{menu.name}</p>
                  </div>
                </NavLinkItem>
              ))}
            </div>
          </div>
          <div>
            <AvatarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
