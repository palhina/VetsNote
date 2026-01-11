import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import type { User } from "../types";

interface AdminUserResponse {
  user: User;
}

export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { execute } = useApiRequest<AdminUserResponse>();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await execute("/api/admin/user", { method: "GET" });
        if (response.user && response.user.role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/admin/login");
        }
      } catch {
        navigate("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, [execute, navigate]);

  if (checking) {
    return <div style={{ padding: "20px" }}>Verifying admin access...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
};
