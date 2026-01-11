import "./App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuth } from "./hooks/useAuth";

const AdminNavigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <nav>
      <Link to="/admin">Admin Dashboard</Link> |
      <Link to="/admin/users/create">Admin新規作成</Link> |
      <button onClick={handleLogout}>ログアウト</button>
    </nav>
  );
};

const UserNavigation = () => {
  const { isAuthenticated, logout, isLoading } = useAuth();

  if (isAuthenticated) {
    return (
      <nav>
        <Link to="/">ホーム</Link> |
        <button onClick={logout} disabled={isLoading}>
          {isLoading ? "ログアウト中..." : "ログアウト"}
        </button>
      </nav>
    );
  }

  return (
    <nav>
      <Link to="/users/login">ログイン</Link> |
      <Link to="/users/create">新規ユーザー登録</Link>
    </nav>
  );
};

const Navigation = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return <AdminNavigation />;
  }

  return <UserNavigation />;
};

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
