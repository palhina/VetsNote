import { memo, useState } from "react";
import { useAuth } from "../auth";
import { Button, Input, ErrorMessage, FormField } from "../../components/ui";

export const LoginUser = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <FormField label="メールアドレス">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
          />
        </FormField>

        <FormField label="パスワード">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
        </FormField>

        {error && <ErrorMessage message={error} />}

        <Button type="submit" variant="primary" isLoading={isLoading}>
          ログイン
        </Button>
      </form>
    </div>
  );
});
