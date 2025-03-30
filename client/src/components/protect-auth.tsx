import { authQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedAuth() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data, isError } = useQuery(authQueryOptions());
  if (isError) {
    queryClient.removeQueries({ queryKey: ["auth"] });
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  if (data) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }

  return <Outlet />;
}
