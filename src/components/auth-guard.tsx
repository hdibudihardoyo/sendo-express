import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredAuth: boolean;
}

export const AuthGuard = ({
  children,
  requiredAuth = true,
}: AuthGuardProps) => {
  const { isAuthenticated, isLoadingUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) {
      navigate("/auth/login");
    } else if (!requiredAuth && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoadingUser, requiredAuth, navigate]);

  if (requiredAuth && !isAuthenticated) {
    return null;
  }

  if (!requiredAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
