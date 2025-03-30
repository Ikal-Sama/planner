import { Button } from "@/components/ui/button";
import { authQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Waypoints } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data, isError, isPending } = useQuery(authQueryOptions());

  if (isPending) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Loader2 className='w-10 h-10 stroke-3 text-primary animate-spin' />
      </div>
    );
  }

  if (isError) {
    queryClient.removeQueries({ queryKey: ["auth"] });
  }

  if (data) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }
  return (
    <div className='p-5 h-screen bg-gradient-to-br from-black via-blue-900 to-black'>
      <div className='flex justify-end'>
        <Link to='/signin'>
          <Button
            variant='ghost'
            className='rounded-full cursor-pointer border text-primary'
          >
            Signin
          </Button>
        </Link>
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
        <Link to='/signin'>
          <Button className='cursor-pointer'>Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
