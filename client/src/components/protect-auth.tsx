import { authQueryOptions } from "@/queryOptions/authQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedAuth() {
  const location = useLocation();
  const { data } = useQuery(authQueryOptions());

  if (data) {
    return <Navigate to='/dashboard' state={{ from: location }} replace />;
  }

  return <Outlet />;
}
