import { logout } from "@/actions/auth";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    queryClient.removeQueries({ queryKey: ["auth"] });

    await logout();

    toast.success("Logout successfully!");
    await queryClient.invalidateQueries({ queryKey: ["auth"] });

    setTimeout(() => navigate("/signin"), 100);
    navigate("/signin");
  };
  return (
    <div className='group' onClick={handleLogout}>
      <div className='group-hover:bg-accent p-2 rounded-full cursor-pointer text-muted-foreground  transition-colors duration-300 ease-in-out'>
        <LogOutIcon className='w-5 h-5  group-hover:text-slate-700  stroke-1.5' />
      </div>
    </div>
  );
}
