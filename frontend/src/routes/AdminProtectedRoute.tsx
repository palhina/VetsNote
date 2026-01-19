import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../features/auth";

const LoadingContainer = styled.div`
  padding: 20px;
`;

export const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();

  useEffect(() => {
    // ユーザーが存在しない、または管理者でない場合はログインページへ
    if (!user || !isAdmin) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, navigate]);

  // ユーザー情報がない場合はローディング表示
  if (!user) {
    return <LoadingContainer>Verifying admin access...</LoadingContainer>;
  }

  // 管理者でない場合は何も表示しない（useEffectでリダイレクト中）
  if (!isAdmin) {
    return null;
  }

  return <Outlet />;
};
