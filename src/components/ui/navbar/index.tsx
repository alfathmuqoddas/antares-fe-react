// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "@/store/useAuth";

// Simple User Icon for Avatar Placeholder
const UserCircleIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// Chevron Down Icon for dropdown
const ChevronDownIcon = ({ className = "w-4 h-4 ml-1" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const Navbar = () => {
  const {
    user,
    isLoggedIn: isAuthenticated,
    login,
    logout: logoutAction,
  } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

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
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Menu Items */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-primary-dark hover:text-primary-main transition-colors"
            >
              MyApp
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <NavLinkItem to="/movies">Movies</NavLinkItem>
              <NavLinkItem to="/cinema">Cinema</NavLinkItem>
              {/* Add more links as needed */}
            </div>
          </div>

          {/* Right Section: Login/User Avatar */}
          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="relative ml-3" ref={avatarRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  {/* You can use an actual image here if user.avatarUrl exists */}
                  <div className="w-9 h-9 bg-primary-main text-white rounded-full flex items-center justify-center text-md font-semibold">
                    {getInitials(user.additionalInfo.name)}
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 ml-1 text-gray-600 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

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
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-main hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (optional, basic example) - can be expanded */}
      {/* <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLinkItem to="/movies" isMobile>Movies</NavLinkItem>
          <NavLinkItem to="/cinema" isMobile>Cinema</NavLinkItem>
        </div>
      </div> */}
    </nav>
  );
};

// Helper component for Nav Links for cleaner code and active state (optional)
const NavLinkItem = ({
  to,
  children,
  isMobile = false,
}: {
  to: string;
  children: any;
  isMobile?: boolean;
}) => {
  // You can add active link styling here using useLocation and comparing paths
  // For simplicity, basic styling is applied.
  const baseClasses =
    "text-gray-700 hover:bg-gray-50 hover:text-primary-dark transition-colors";
  const desktopClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const mobileClasses = "block px-3 py-2 rounded-md text-base font-medium";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
};

// Helper component for Dropdown Links
const DropdownLinkItem = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: any;
  onClick: any;
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      role="menuitem"
    >
      {children}
    </Link>
  );
};

export default Navbar;
