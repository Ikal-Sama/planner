import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authQueryOptions } from "@/queryOptions/authQueryOptions";
import { UserCircle } from "lucide-react";
import LogoutButton from "../Logout-button";

export default function Header() {
  const { data: user } = useQuery(authQueryOptions());

  return (
    <div className='px-2 py-5 w-full'>
      <div className='flex justify-between items-center w-full'>
        <SidebarTrigger className='cursor-pointer' />
        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger className='group'>
              <div className='cursor-pointer text-muted-foreground p-2 rounded-full hover:bg-accent transition-colors duration-300 ease-in-out'>
                <UserCircle className='group-hover:text-slate-700 w-5 h-5 stroke-1.5' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
