import { authQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data, isError } = useQuery(authQueryOptions());

  // if (isPending) {
  //   return (
  //     <div className='w-full h-screen flex justify-center items-center'>
  //       <Loader2 className='w-10 h-10 stroke-3 text-primary animate-spin' />
  //     </div>
  //   );
  // }

  if (isError || !data) {
    queryClient.removeQueries({ queryKey: ["auth"] });
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return <Outlet />;
}
