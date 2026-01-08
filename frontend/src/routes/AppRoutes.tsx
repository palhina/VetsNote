import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "../components/Home";
import { LoginUser } from "../components/LoginUser";
import { CreateUser } from "../components/CreateUser";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/users/login" element={<LoginUser />} />
      <Route path="/users/create" element={<CreateUser />} />
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
};
