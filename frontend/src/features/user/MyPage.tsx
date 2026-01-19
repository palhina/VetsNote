import { memo, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../auth";
import { useApiRequest } from "../../hooks/useApiRequest";
import { PageLayout } from "../../components/layout";
import { Stack } from "../../components/layout/Container";
import { Card } from "../../components/layout/Card";
import {
  Button,
  Input,
  Label,
  FormField,
  LinkButton,
  Alert,
} from "../../components/ui";

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing[4]} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.neutral[800]};
`;

const InfoRow = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};

  strong {
    color: ${({ theme }) => theme.colors.neutral[800]};
  }
`;

const HelperText = styled.small`
  display: block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const MyPage = memo(() => {
  const { user } = useAuth();
  const { execute, isLoading, error, clearError } = useApiRequest<{
    message: string;
  }>();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage("");

    try {
      const response = await execute("/api/password", {
        method: "PUT",
        body: {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: newPasswordConfirmation,
        },
      });
      setSuccessMessage(response.message);
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch {
      // エラーはuseApiRequestで処理される
    }
  };

  return (
    <PageLayout
      title="マイページ"
      narrow
      actions={
        <LinkButton to="/" variant="secondary">
          ホームに戻る
        </LinkButton>
      }
    >
      <Stack $gap={6}>
        <Card>
          <SectionTitle>ユーザー情報</SectionTitle>
          <InfoRow>
            <strong>名前:</strong> {user?.name}
          </InfoRow>
          <InfoRow>
            <strong>メールアドレス:</strong> {user?.email}
          </InfoRow>
        </Card>

        <Card>
          <SectionTitle>パスワード変更</SectionTitle>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {error && <Alert variant="error">{error}</Alert>}

          <form onSubmit={handleChangePassword}>
            <Stack $gap={4}>
              <FormField>
                <Label htmlFor="currentPassword">現在のパスワード</Label>
                <Input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </FormField>

              <FormField>
                <Label htmlFor="newPassword">新しいパスワード</Label>
                <Input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <HelperText>8文字以上</HelperText>
              </FormField>

              <FormField>
                <Label htmlFor="newPasswordConfirmation">
                  新しいパスワード（確認）
                </Label>
                <Input
                  type="password"
                  id="newPasswordConfirmation"
                  value={newPasswordConfirmation}
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  required
                  minLength={8}
                />
              </FormField>

              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="変更中..."
              >
                パスワードを変更
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </PageLayout>
  );
});
