import { Waypoints } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className='w-full flex h-full'>
      <div className='w-full md:w-1/2 lg:w-1/2  p-5 lg:p-10'>
        <Link to='/' className='flex gap-1 items-center group'>
          <Waypoints className='text-primary group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
          <h1 className='font-semibold text-blue-600 text-xl group-hover:text-blue-700 transition-colors duration-300 ease-in-out'>
            Planner
          </h1>
        </Link>
        <div className='my-[4.7rem]'>
          <Outlet />
        </div>
      </div>
      <div className='hidden md:block lg:block lg:w-full md:w-1/2  p-5 bg-gradient-to-br from-black via-blue-900 to-black'>
        <div className='flex flex-col justify-center items-center h-full gap-5'>
          <div className='flex gap-1 items-center group'>
            <Waypoints className='text-primary w-9 h-9 group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
            <h1 className='font-semibold text-white text-3xl  transition-colors duration-300 ease-in-out'>
              Planner
            </h1>
          </div>
          <p className='text-center w-full  lg:w-[40rem] text-gray-300'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            dolorem fugit. Ab doloremque rerum dolorem soluta veniam, ipsum odio
            et asperiores porro ullam laudantium sed quas laboriosam fugiat
            ipsam similique qui atque. Facere nam sed earum obcaecati eos odit
            amet recusandae deleniti officia, ullam voluptate expedita quidem
            dolorem fugiat omnis.
          </p>
        </div>
      </div>
    </div>
  );
}
