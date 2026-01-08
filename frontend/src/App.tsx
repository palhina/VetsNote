import "./App.css";
import { Link } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./providers/AuthProvider";
import { useAuth } from "./hooks/useAuth";

const Navigation = () => {
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

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
