import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../features/auth";
import logoImage from "../../assets/images/VetsPocket.png";

/**
 * ナビゲーションヘッダー
 *
 * デザイン意図:
 * - 白背景 + 下線で清潔感のあるヘッダー
 * - 固定高さで安定したレイアウト
 * - z-indexでコンテンツより前面に
 */
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[4]}`};
`;

/**
 * ロゴ/ブランド
 *
 * デザイン意図:
 * - ロゴ画像とテキストを組み合わせたブランド表示
 * - プライマリカラーでブランドを強調
 * - 適度なフォントサイズで視認性確保
 */
const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[700]};
  }
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

/**
 * ナビゲーションリンク
 *
 * デザイン意図:
 * - 控えめなスタイルで邪魔にならない
 * - ホバー時に軽い背景色で操作可能を示す
 * - アクティブ状態はプライマリカラーで強調
 */
const NavLink = styled(Link)<{ $isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary[600] : theme.colors.neutral[600]};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borders.radius.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary[50] : "transparent"};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary[100] : theme.colors.neutral[100]};
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary[700] : theme.colors.neutral[800]};
  }
`;

/**
 * ログアウトボタン
 *
 * デザイン意図:
 * - ghostスタイルで控えめに
 * - ナビリンクと同じ高さで統一感
 */
const LogoutBtn = styled.button`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.neutral[600]};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borders.radius.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.neutral[100]};
    border-color: ${({ theme }) => theme.colors.neutral[400]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

// ログアウトボタンコンポーネント
const LogoutButton = memo(() => {
  const { logout, isLoading } = useAuth();

  return (
    <LogoutBtn onClick={logout} disabled={isLoading}>
      {isLoading ? "ログアウト中..." : "ログアウト"}
    </LogoutBtn>
  );
});

// 管理者用ナビゲーション
const AdminNavigation = memo(() => {
  const location = useLocation();

  return (
    <Header>
      <HeaderInner>
        <Brand to="/admin">
          <Logo src={logoImage} alt="VetPocket" />
        </Brand>
        <Nav>
          <NavLink to="/admin" $isActive={location.pathname === "/admin"}>
            ダッシュボード
          </NavLink>
          <NavLink
            to="/admin/users/create"
            $isActive={location.pathname === "/admin/users/create"}
          >
            Admin新規作成
          </NavLink>
          <Divider />
          <LogoutButton />
        </Nav>
      </HeaderInner>
    </Header>
  );
});

// ユーザー用ナビゲーション（認証済み）
const AuthenticatedNavigation = memo(() => {
  const location = useLocation();

  return (
    <Header>
      <HeaderInner>
        <Brand to="/">
          <Logo src={logoImage} alt="VetPocket" />
        </Brand>
        <Nav>
          <NavLink to="/" $isActive={location.pathname === "/"}>
            ホーム
          </NavLink>
          <Divider />
          <LogoutButton />
        </Nav>
      </HeaderInner>
    </Header>
  );
});

// ユーザー用ナビゲーション（未認証）
const GuestNavigation = memo(() => {
  const location = useLocation();

  return (
    <Header>
      <HeaderInner>
        <Brand to="/">
          <Logo src={logoImage} alt="VetPocket" />
        </Brand>
        <Nav>
          <NavLink
            to="/users/login"
            $isActive={location.pathname === "/users/login"}
          >
            ログイン
          </NavLink>
          <NavLink
            to="/users/create"
            $isActive={location.pathname === "/users/create"}
          >
            新規登録
          </NavLink>
        </Nav>
      </HeaderInner>
    </Header>
  );
});

/**
 * メインナビゲーション
 *
 * ログイン状態とパスに応じて適切なナビゲーションを表示
 */
export const Navigation = memo(() => {
  const location = useLocation();
  const { isAdmin, isAuthenticated } = useAuth();

  const isAdminPath = location.pathname.startsWith("/admin");

  // adminパスでログイン前はナビゲーション非表示
  if (isAdminPath && !isAdmin) {
    return null;
  }

  // 管理者用ナビゲーション
  if (isAdminPath && isAdmin) {
    return <AdminNavigation />;
  }

  // ユーザー用ナビゲーション
  if (isAuthenticated) {
    return <AuthenticatedNavigation />;
  }

  return <GuestNavigation />;
});
