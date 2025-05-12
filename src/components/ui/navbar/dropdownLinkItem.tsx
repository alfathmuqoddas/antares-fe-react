import { Link } from "react-router";
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

export default DropdownLinkItem;
