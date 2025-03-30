import { Outlet } from "react-router-dom";
import Header from "./Header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className='flex w-full'>
        <AppSidebar />
        <div className='flex flex-col px-5 w-full'>
          <Header />
          <main className='h-full px-2 py-10'>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
