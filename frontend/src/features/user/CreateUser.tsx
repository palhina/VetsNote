import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { Button, Input, ErrorMessage, FormField } from "../../components/ui";

export const CreateUser = memo(() => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { execute, isLoading, error } = useApiRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await execute("/api/users", { body: { name, email, password } });
      alert("ユーザーを作成しました");
      navigate("/users/login");
    } catch {
      // エラーはフックで処理
    }
  };

  return (
    <div>
      <h1>User Create</h1>

      <form onSubmit={handleSubmit}>
        <FormField label="名前" required>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前"
            required
          />
        </FormField>

        <FormField label="メールアドレス" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
          />
        </FormField>

        <FormField label="パスワード" required>
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
          送信
        </Button>
      </form>
    </div>
  );
});
