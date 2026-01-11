import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const defaultAuthValue: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => false,
};

interface WrapperProps {
  children: ReactNode;
  authValue?: Partial<AuthContextValue>;
}

const createWrapper = (authValue: Partial<AuthContextValue> = {}) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...defaultAuthValue, ...authValue }}>
        {children}
      </AuthContext.Provider>
    </BrowserRouter>
  );
  return Wrapper;
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  authValue?: Partial<AuthContextValue>;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { authValue, ...renderOptions } = options;
  return render(ui, {
    wrapper: createWrapper(authValue),
    ...renderOptions,
  });
};

export const mockUser: User = {
  id: 1,
  name: "テストユーザー",
  email: "test@example.com",
  role: "user",
};

export const mockAdminUser: User = {
  id: 2,
  name: "管理者",
  email: "admin@example.com",
  role: "admin",
};
