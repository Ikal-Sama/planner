import LogoutButton from "@/components/Logout-button";
import { Button } from "@/components/ui/button";
import { authQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Github, Instagram, Twitter, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { data } = useQuery(authQueryOptions());

  // if (isFetched) {
  //   return (
  //     <div className='w-full h-screen flex justify-center items-center'>
  //       <Loader2 className='w-10 h-10 stroke-3 text-primary animate-spin' />
  //     </div>
  //   );
  // }

  return (
    <div className='p-5 h-screen bg-gradient-to-br from-black via-blue-900 to-black'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='flex gap-1 items-center group'>
          <Waypoints className='text-primary group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
          <h1 className='font-semibold text-blue-600 text-xl group-hover:text-blue-700 transition-colors duration-300 ease-in-out'>
            Planner
          </h1>
        </Link>
        {data ? (
          <div className='flex items-center gap-5 text-white'>
            <Link to='/dashboard'>
              <Button
                size='sm'
                variant='ghost'
                className='cursor-pointer rounded-full border'
              >
                Dashboard
              </Button>
            </Link>
            <p>{data.name}</p>
            <LogoutButton />
          </div>
        ) : (
          <Link to='/signin'>
            <Button
              variant='ghost'
              className='rounded-full cursor-pointer border text-primary'
            >
              Signin
            </Button>
          </Link>
        )}
      </div>
      <div className='flex flex-col justify-center items-center mt-20 gap-3'>
        <div className='flex flex-col items-center gap-3'>
          <div className='flex gap-1 items-center p-2 group '>
            <Waypoints className='w-14 h-14 text-primary group-hover:text-blue-700 transition-colors duration-300 ease-in-out' />
            <h1 className='font-semibold text-blue-600 text-5xl group-hover:text-blue-700 transition-colors duration-300 ease-in-out'>
              Planner
            </h1>
          </div>
          <p className='w-[50rem] text-center text-lg text-white mb-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            architecto, officia aspernatur repellendus delectus aliquam odio vel
            quibusdam, ad magnam similique, a cum autem! Dolore est accusamus
            nobis esse aperiam rerum quos, iste libero delectus, alias ut
            assumenda deserunt. Reprehenderit voluptatum hic labore in.
          </p>
        </div>
        <div className='flex flex-col gap-4 items-center'>
          <h2 className='text-xl text-gray-300'>Visit in our</h2>
          <div className='flex gap-2 items-center'>
            <Link to='/https://github.com/Ikal-Sama/planner'>
              <Button variant='destructive' className='cursor-pointer'>
                <Github />
              </Button>
            </Link>

            <Link to='/'>
              <Button className='cursor-pointer'>
                <Instagram />
              </Button>
            </Link>

            <Link to='/'>
              <Button className='cursor-pointer bg-black/70 hover:bg-black'>
                <Twitter />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
