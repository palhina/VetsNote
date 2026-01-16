import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth();
      if (!isValid) {
        navigate("/users/login");
      }
      setChecking(false);
    };

    verifyAuth();
  }, [checkAuth, navigate]);

  if (checking) {
    return <div>認証確認中...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
