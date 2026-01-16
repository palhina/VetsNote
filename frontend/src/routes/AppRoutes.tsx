import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import { Home } from "../features/home";
import { MyPage, LoginUser, CreateUser } from "../features/user";
import { CreatePage } from "../features/create";
import { PatientCaseEditPage } from "../features/patientCase";
import { SeminarNoteEditPage } from "../features/seminarNote";
import {
  AdminLogin,
  AdminDashboard,
  UserManagement,
  DataViewer,
  AdminCreate,
} from "../features/admin";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/users/login" element={<LoginUser />} />
      <Route path="/users/create" element={<CreateUser />} />

      {/* Protected User Routes */}
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
      <Route
        path="/mypage"
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Login (public) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Routes - ネストで完全防御 */}
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/create" element={<AdminCreate />} />
        <Route path="data" element={<DataViewer />} />
      </Route>

      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
};
