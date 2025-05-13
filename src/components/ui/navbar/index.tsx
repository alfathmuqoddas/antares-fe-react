// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "@/store/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLinkItem from "./navLinkItem";
import DropdownLinkItem from "./dropdownLinkItem";

const Navbar = () => {
  const location = useLocation();
  const {
    user,
    isLoggedIn: isAuthenticated,
    login,
    logout: logoutAction,
  } = useAuth();
  const {
    name: userName,
    email: userEmail,
    roles,
  } = user?.additionalInfo || {};
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const navMenus = [
    { name: "Movies", to: "/movies" },
    { name: "Cinema", to: "/cinema" },
  ];

  const adminMenus = [
    { name: "Dashboard", to: "/admin" },
    { name: "Manage Theaters", to: "/admin/theaters" },
    { name: "Manage Movies", to: "/admin/movies" },
  ];

  if (roles?.includes("admin")) {
    navMenus.push(...adminMenus);
  }

  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  };

  const handleLogout = () => {
    logoutAction();
    setIsDropdownOpen(false);
    navigate("/login"); // Or to home page: navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10">
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
                  {menu.name}
                </NavLinkItem>
              ))}
              {/* Add more links as needed */}
            </div>
          </div>

          {/* Right Section: Login/User Avatar */}
          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="relative ml-3" ref={avatarRef}>
                <Avatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${userName}${userEmail}`}
                    alt={`${userName}'s avatar`}
                  />
                  <AvatarFallback>{getInitials(userName || "")}</AvatarFallback>
                </Avatar>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <DropdownLinkItem
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </DropdownLinkItem>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (optional, basic example) - can be expanded */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navMenus.map((menu, index) => (
            <NavLinkItem key={index} to={menu.to} isMobile>
              {menu.name}
            </NavLinkItem>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
