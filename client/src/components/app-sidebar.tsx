import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Folders, Home, Shapes, Waypoints } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "General",
    items: [
      {
        id: 1,
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
      },
      {
        id: 2,
        title: "Calendar",
        url: "/calendar",
        icon: Calendar,
      },
    ],
  },
  {
    id: 2,
    title: "Manage",
    items: [
      {
        id: 1,
        title: "Projects",
        url: "/projects",
        icon: Folders,
      },
      {
        id: 2,
        title: "Activities",
        url: "/activities",
        icon: Shapes,
      },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Link to='/' className='flex gap-1 items-center p-2 group '>
            <Waypoints className='text-primary group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
            <h1 className='font-semibold text-blue-600 text-xl group-hover:text-blue-700 transition-colors duration-300 ease-in-out'>
              Planner
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarGroup className='flex flex-col gap-2'>
          {data.map((items) => (
            <div key={items.id}>
              <SidebarGroupLabel>{items.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.items.map((item) => {
                    const isActive = currentPath.startsWith(item.url);
                    return (
                      <SidebarMenuItem key={item.id}>
                        <div className=''>
                          <Link
                            to={item.url}
                            className={` flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-300 ease-in-out ${
                              isActive
                                ? "bg-blue-50 text-blue-700"
                                : "hover:bg-blue-50 text-gray-700"
                            }`}
                          >
                            <item.icon
                              className={`w-4 h-4   ${
                                isActive ? "text-blue-600" : "text-gray-600 "
                              }`}
                            />
                            <span className=''>{item.title}</span>
                          </Link>
                        </div>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
