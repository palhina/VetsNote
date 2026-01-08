import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import type { User, LoginResponse } from "../types";
import { AuthContext } from "../contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { execute, isLoading } = useApiRequest<LoginResponse>();
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const clearAuth = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const data = await execute("/api/user", { method: "GET" });
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return true;
    } catch {
      clearAuth();
      return false;
    }
  }, [execute, clearAuth]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const data = await execute("/api/login", { body: { email, password } });
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      navigate("/");
    },
    [execute, navigate]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await execute("/api/logout", { body: {} });
    } catch {
      // サーバーエラーでも続行
    } finally {
      clearAuth();
      navigate("/users/login");
    }
  }, [execute, clearAuth, navigate]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
