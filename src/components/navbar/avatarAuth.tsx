import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/store/useAuth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const AvatarAuth = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();
  const { name } = user?.additionalInfo || {};

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
    logout();
    navigate("/login"); // Or to home page: navigate('/');
  };
  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`}
                alt="@shadcn"
              />
              <AvatarFallback>{getInitials(name || "")}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <User size={16} />
                Profile
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <div className="flex items-center gap-2 text-red-500">
                <LogOut size={16} color="red" />
                Logout
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" onClick={() => navigate("/login")}>
          Login
        </Button>
      )}
    </>
  );
};

export default AvatarAuth;
