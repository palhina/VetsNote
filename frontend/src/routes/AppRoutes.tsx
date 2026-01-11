import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import { Home } from "../components/Home";
import { LoginUser } from "../components/LoginUser";
import { CreateUser } from "../components/CreateUser";
import { CreatePage } from "../components/CreatePage";
import { PatientCaseEditPage } from "../components/PatientCaseEditPage";
import { SeminarNoteEditPage } from "../components/SeminarNoteEditPage";
import { AdminLogin } from "../components/admin/AdminLogin";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { UserManagement } from "../components/admin/UserManagement";
import { DataViewer } from "../components/admin/DataViewer";
import { AdminCreate } from "../components/admin/AdminCreate";

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

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-cases/:id/edit"
        element={
          <ProtectedRoute>
            <PatientCaseEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seminar-notes/:id/edit"
        element={
          <ProtectedRoute>
            <SeminarNoteEditPage />
          </ProtectedRoute>
        }
      />
      <Route path="/users/login" element={<LoginUser />} />
      <Route path="/users/create" element={<CreateUser />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <UserManagement />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/data"
        element={
          <AdminProtectedRoute>
            <DataViewer />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <AdminProtectedRoute>
            <AdminCreate />
          </AdminProtectedRoute>
        }
      />

      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
};
