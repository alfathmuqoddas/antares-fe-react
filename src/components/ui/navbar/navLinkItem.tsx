import { Link } from "react-router";

// Helper component for Nav Links for cleaner code and active state (optional)
const NavLinkItem = ({
  to,
  children,
  isMobile = false,
  isActive = false,
}: {
  to: string;
  children: any;
  isMobile?: boolean;
  isActive?: boolean;
}) => {
  // You can add active link styling here using useLocation and comparing paths
  // For simplicity, basic styling is applied.
  const baseClasses = `text-gray-700 hover:bg-blue-500 ${
    isActive && "bg-blue-500 text-white"
  } hover:text-white rounded-full transition-colors`;
  const desktopClasses = "px-2 py-1 text-sm font-medium";
  const mobileClasses = "block px-3 py-2 text-base font-medium";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
};

export default NavLinkItem;
