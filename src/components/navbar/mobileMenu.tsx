import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Link } from "react-router";

const MobileMenu = ({
  navMenus,
}: {
  navMenus: { name: string; to: string; icon: ReactNode }[];
}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {navMenus.map((navMenu) => (
            <DropdownMenuItem key={navMenu.name}>
              <Link to={navMenu.to}>
                <div className="flex items-center gap-2">
                  {navMenu.icon}
                  {navMenu.name}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MobileMenu;
