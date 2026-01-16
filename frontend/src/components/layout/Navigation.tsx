import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth";

const LogoutButton = () => {
  const { logout, isLoading } = useAuth();

  return (
    <button onClick={logout} disabled={isLoading}>
      {isLoading ? "ログアウト中..." : "ログアウト"}
    </button>
  );
};

// 管理者用ナビゲーション
const AdminNavigation = () => {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return null;
  }
  return (
    <nav>
      <Link to="/admin">Admin Dashboard</Link> |{" "}
      <Link to="/admin/users/create">Admin新規作成</Link> | <LogoutButton />
    </nav>
  );
};

// ユーザー用ナビゲーション
const UserNavigation = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <nav>
        <Link to="/">ホーム</Link> |
        <LogoutButton />
      </nav>
    );
  }

  return (
    <nav>
      <Link to="/users/login">ログイン</Link> |{""}
      <Link to="/users/create">新規ユーザー登録</Link>
    </nav>
  );
};

// ログイン状態に応じて管理者/ユーザー用ナビゲーション切替
export const Navigation = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const isAdminPath = location.pathname.startsWith("/admin");

  // adminパスでログイン前（/admin/login等）はナビゲーション非表示
  if (isAdminPath && !isAdmin) {
    return null;
  }

  if (isAdminPath && isAdmin) {
    return <AdminNavigation />;
  }

  return <UserNavigation />;
};
