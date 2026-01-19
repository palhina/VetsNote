import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useAuth } from "../auth";
import { PageLayout } from "../../components/layout";
import { Stack } from "../../components/layout/Container";
import { Card } from "../../components/layout/Card";
import { Button, Input, FormField, ErrorMessage } from "../../components/ui";
import type { User } from "../../types";

interface AdminLoginResponse {
  message: string;
  user: User;
}

export const AdminLogin = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { execute, isLoading, error } = useApiRequest<AdminLoginResponse>();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await execute("/api/admin/login", {
        method: "POST",
        body: { email, password },
      });

      setUser(response.user);
      navigate("/admin");
    } catch {
      // error is handled by useApiRequest
    }
  };

  return (
    <PageLayout title="管理者用ログイン" narrow>
      <Card>
        <form onSubmit={handleLogin}>
          <Stack $gap={4}>
            <FormField>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="管理者メールアドレス"
                required
              />
            </FormField>

            <FormField>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </FormField>

            {error && <ErrorMessage message={error} />}

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              loadingText="ログイン中…"
            >
              ログイン
            </Button>
          </Stack>
        </form>
      </Card>
    </PageLayout>
  );
});
