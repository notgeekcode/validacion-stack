import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/lib/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, userProfile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/ingresar");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredRole && userProfile) {
      const hasRole = userProfile.roles.includes(requiredRole);
      if (!hasRole) {
        navigate("/");
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, userProfile, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && userProfile && !userProfile.roles.includes(requiredRole)) {
    return null;
  }

  return <>{children}</>;
};
